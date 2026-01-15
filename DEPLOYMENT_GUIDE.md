# 🚀 CamCurrency Production Deployment Guide

This guide details how to deploy your CamCurrency Full Stack application to a public server (VPS) with a custom domain.

## ✅ 1. Codebase Preparation (Completed)

We have already updated your code to be "Production Ready":

- **Frontend**: `App.jsx` now uses `VITE_API_BASE_URL` to dynamically set API endpoints.
- **Frontend Docker**: Updated to accept `VITE_API_BASE_URL` at build time.
- **Backend**: CORS settings are configurable via environment variables.

---

## 🛠️ 2. Server Setup (VPS)

1.  **Get a VPS**: Buy a server (DigitalOcean, AWS, Linode) with at least **2GB RAM** (4GB recommended for ML models).
2.  **Install Docker**:
    ```bash
    # Ubuntu example
    sudo apt update
    sudo apt install docker.io docker-compose -y
    sudo usermod -aG docker $USER
    # Log out and log back in
    ```
3.  **Clone Your Repo**:
    ```bash
    git clone https://github.com/THYCHANTHA/Cam-Currency-ITC-AMS.git
    cd CamCurrency-ITC-AMS
    ```

---

## ⚙️ 3. Environment Configuration

Create a `.env` file in the root directory of your server. **Change the values below to match your actual domain.**

```bash
# .env file

# --- Domain Config ---
# Option 1: If you have a domain
# DOMAIN_NAME=your-domain.com

# Option 2: If you are testing with IP only (Buy domain later)
DOMAIN_NAME=139.59.xxx.xxx  # <--- Replace with your VPS Public IP


# --- Backend Settings ---
# Allow your frontend domain to talk to the backend
BACKEND_CORS_ORIGINS=["https://your-domain.com", "https://www.your-domain.com"]
ENV_STATE=prod

# --- Database Settings ---
POSTGRES_USER=admin_user
POSTGRES_PASSWORD=secure_password_here
POSTGRES_DB=camcurrency_prod
# Internal container connection string
DATABASE_URL=postgresql+psycopg2://admin_user:secure_password_here@db:5432/camcurrency_prod
```

---

## 🐳 4. Production Docker Compose

Create a new file named `docker-compose.prod.yml` on your server:

```yaml
version: "3.8"

services:
  # ---------------------------------------------------------------------------
  # 🧠 BACKEND API
  # ---------------------------------------------------------------------------
  backend:
    build:
      context: ./backend
    container_name: camcurrency_prod_backend
    restart: always
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - BACKEND_CORS_ORIGINS=${BACKEND_CORS_ORIGINS}
    networks:
      - currency_prod_net

  # ---------------------------------------------------------------------------
  # 🎨 FRONTEND (Nginx)
  # ---------------------------------------------------------------------------
  frontend:
    build:
      context: ./frontend
      args:
        # IMPORTANT: This bakes your domain into the React Build
        - VITE_API_BASE_URL=https://${DOMAIN_NAME}/api/v1
    container_name: camcurrency_prod_frontend
    restart: always
    networks:
      - currency_prod_net

  # ---------------------------------------------------------------------------
  # 💾 DATABASE
  # ---------------------------------------------------------------------------
  db:
    image: postgres:15-alpine
    container_name: camcurrency_prod_db
    restart: always
    volumes:
      - prod_db_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    networks:
      - currency_prod_net

  # ---------------------------------------------------------------------------
  # 🌐 REVERSE PROXY (Nginx / Traefik recommended)
  # ---------------------------------------------------------------------------
  # This simple Nginx proxy routes traffic from port 80 to frontend/backend
  nginx_proxy:
    image: nginx:alpine
    container_name: camcurrency_gateway
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx_prod.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - frontend
      - backend
    networks:
      - currency_prod_net

networks:
  currency_prod_net:
    driver: bridge

volumes:
  prod_db_data:
```

---

## 🌐 5. Nginx Gateway Configuration

Create a file named `nginx_prod.conf` to handle routing:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend (React App)
    location / {
        proxy_pass http://frontend:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API (FastAPI)
    location /api/v1/ {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend Static Results (Images)
    location /results/ {
        proxy_pass http://backend:8000/results/;
    }

    # API Documentation
    location /docs {
        proxy_pass http://backend:8000/docs;
    }

    location /openapi.json {
        proxy_pass http://backend:8000/openapi.json;
    }
}
```

---

## 🚀 6. Launch

Run the command:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

Your app will be live at `http://your-domain.com`!

- Frontend at root `/`
- Backend API at `/api/v1`

_(Note: For HTTPS/SSL, we recommend setting up Certbot or using "Nginx Proxy Manager" as your gateway.)_
