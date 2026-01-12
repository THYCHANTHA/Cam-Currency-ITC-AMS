# 📂 CamCurrency Project Structure Explained

This document provides a detailed breakdown of the entire project codebase, explaining the purpose and functionality of each file and directory.

---

## 🏗️ Root Directory

`CurrencyFullStack/`
This is the main root of the application, containing all microservices and configuration files.

- **`docker-compose.yml`**: The orchestration file defines all services (backend, frontend, database). It controls how containers are built, which ports are exposed (8000, 5173, 5432), and how they communicate via the internal network `currency_net`.
- **`.env`**: (Gitignored) Contains sensitive environment variables like database credentials (`POSTGRES_USER`, `POSTGRES_PASSWORD`).
- **`README.md`**: The main project documentation.
- **`PROJECT_STRUCTURE.md`**: The file you are reading now.

---

## 🧠 Backend Service (FastAPI)

`CurrencyFullStack/backend/`
The logic center of the application, handling API requests, running AI inference, and talking to the database.

### 📁 `app/` (Application Source Code)

- **`models/`**:
  - **`best.pt`**: The trained YOLOv8 model weights file. This is the "brain" that detects currency.
  - **`yolo.py`**: (Optional) Helper classes for loading or managing model instances.
- **`api/`**:
  - **`v1/`**: Versioning folder for API routes.
    - **`endpoints/`**:
      - **`detect.py`**: Handles `POST /detect`. Receives image upload -> Runs YOLO -> Returns Bounding Boxes & Total Value.
      - **`history.py`**: Handles `GET /history`. Fetches past detection records from the database.
      - **`database.py`**: Health check endpoint to verify Postgres connection.
    - **`router.py`**: Aggregates all endpoints into a single API router.
- **`core/`**:
  - **`config.py`**: Loads environment variables (DB URL, Model Path) into Python objects using Pydantic `BaseSettings`.
  - **`logging.py`**: Configures how logs are formatted and output to the console.
- **`db/`**:
  - **`session.py`**: configured `SQLAlchemy` engine and session maker for connecting to the database.
- **`detection.py`**: **Critical File**. Contains the function `run_inference(image)`. It loads the YOLO model, processes the image, and formats the raw prediction results (bounding boxes, class names) into a clean JSON response.
- **`main.py`**: The entry point. Initializes the `FastAPI` app, setting up CORS (so frontend can talk to backend) and including the routers.
- **`schemas.py`**: Pydantic models defining the shape of Requests and Responses (e.g., `DetectionResponse`, `HistoryItem`) to ensure type safety.
- **`crud.py`**: (Create, Read, Update, Delete) Functions that execute actual SQL queries (e.g., `create_detection_record`, `get_all_history`) using SQLAlchemy.
- **`database.py`**: Base configuration for SQLAlchemy models (Base class).
- **`models_db.py`**: Defines the SQL Table structure (Schema) for storing history (e.g., table `interactions` with columns `id`, `image_name`, `total_money`).

### ⚙️ Config Files

- **`Dockerfile`**: Instructions for Docker to build the Python environment. Installs dependencies (`python:3.10-slim`, `libgl1` for OpenCV) and runs `uvicorn`.
- **`requirements.txt`**: List of python packages: `fastapi`, `uvicorn`, `ultralytics`, `sqlalchemy`, `psycopg2`, `python-multipart`.

---

## 🎨 Frontend Service (React)

`CurrencyFullStack/frontend/`
The user interface allowing users to interact with the system.

### 📁 `src/` (Source Code)

- **`components/`**:
  - **`CurrencyDetector.jsx`**: Main component handling Image Upload, displaying the Preview, and rendering Bounding Boxes over the image.
  - **`WebcamCapture.jsx`**: logic for accessing the device camera and capturing frames to send to the backend.
  - **`HistoryTable.jsx`**: Renders the table of past scans fetched from the API.
  - **`Navbar.jsx`**: Top navigation bar with links and Dark Mode toggle.
  - **`ThemeToggle.jsx`**: Button logic to switch between light/dark CSS themes.
- **`pages/`**:
  - **`Home.jsx`**: The landing page combining the Detector and Webcam components.
  - **`History.jsx`**: The page dedicated to viewing historical data.
  - **`SystemCheck.jsx`**: Dashboard page showing backend/database status.
- **`services/`**:
  - **`api.js`**: `Axios` instance configuration (Base URL pointing to Backend). Central place for all API calls (`detectCurrency()`, `fetchHistory()`).
- **`App.jsx`**: The main container that sets up Routing (`react-router-dom`) to different pages.
- **`main.jsx`**: Boots up React and mounts it to `index.html`.
- **`index.css`**: Global styles and Tailwind imports.

### ⚙️ Config Files

- **`Dockerfile`**: Builds the Node.js environment using a multi-stage build (Build -> Nginx Serve) for production-grade static file serving.
- **`vite.config.js`**: Configuration for Vite (Build tool), setting up proxies or build output folders.
- **`tailwind.config.js`**: Configures the TailwindCSS design system (colors, fonts, dark mode strategy).
- **`package.json`**: Dependencies list (`react`, `axios`, `framer-motion`, `lucide-react` for icons).

---

## 💾 Database (PostgreSQL)

`CurrencyFullStack/database/`
Configuration for the persistent storage.

- **`init.sql`**: This script runs automatically when the database container starts for the first time. It creates the necessary tables (`interactions`, `users`) so everything is ready to go without manual intervention.

---

## 📓 Notebooks & Data (Analysis)

`CurrencyFullStack/notebooks/`
Scripts used for researching, cleaning data, and validating the model before deployment.

- **`dataset_export/`**:
  - **`data.yaml`**: The dataset configuration file used by YOLO during training (defines classes and paths).
  - **`train/`, `valid/`, `test/`**: (Gitignored usually) The actual images and labels.
- **`models_backup/`**: Storage for different versions of trained models (e.g., `epoch90.pt`, `best_riel_master.pt`).
- **`01_data_verification.ipynb`**: Visualizes the training data. Draws boxes on images to ensure labels are correct.
- **`02_renamed_verification.ipynb`**: Script checks for file naming consistency and removes corrupt images.
- **`03_model_verification.py`**: A standalone script to run the local model against test images and verify accuracy before putting it into the backend.

---
