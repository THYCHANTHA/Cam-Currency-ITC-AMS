# CamCurrency - Khmer Riel Automated Scanner & Calculator 🇰🇭💰

[![GitHub Repository](https://img.shields.io/badge/GitHub-Cam--Currency--ITC--AMS-blue?logo=github)](https://github.com/THYCHANTHA/Cam-Currency-ITC-AMS)
[![Tech Stack](https://img.shields.io/badge/Stack-YOLOv8%20|%20FastAPI%20|%20React%20|%20PostgreSQL%20|%20Docker-green)]()

**CamCurrency** is an AI-powered Full Stack web application capable of detecting, classifying, and summing up Cambodian Riel banknotes in real-time. It features a complete pipeline from raw data collection to a production-ready containerized deployment.

---

## 👥 Project Team (Group 5)

| Member                 | Role             | Responsibilities                                                                     |
| :--------------------- | :--------------- | :----------------------------------------------------------------------------------- |
| **THY CHANTHA**        | **Team Leader**  | System Architecture, Model Training (YOLOv8), Backend (FastAPI), DevOps (Docker/VPS) |
| **Roeun Sovandeth**    | Frontend Dev     | React UI, Webcam Integration, Tailwind CSS Design                                    |
| **San Kimheang**       | Database Eng.    | PostgreSQL Schema, Data Persistence, Analytics                                       |
| **Taing Thaitheang**   | Designer & Logic | Logic Design, Calculator Algorithm                                                   |
| **Sem Yuthearylyhour** | API Dev          | API Endpoints, Integration Testing                                                   |
| **Siv Lyheng**         | QA & DevOps      | Quality Assurance, Documentation, Deployments                                        |

---

## 🛠️ Technology Stack

This project is built using a modern **Microservices Architecture**:

- **🧠 AI Core**: `Ultralytics YOLOv8` (Custom trained on 1,000+ images, 94% mAP).
- **⚙️ Backend**: `FastAPI` (Python 3.10) - High-performance async API.
- **🎨 Frontend**: `React` + `Vite` + `TailwindCSS` - Responsive, modern UI with **Dark/Light Mode**.
- **💾 Database**: `PostgreSQL` - Robust data storage for detection history.
- **🐳 Infrastructure**: `Docker` & `Docker Compose` - Orchestration and constant deployment.
- **☁️ Deployment**: `DigitalOcean Droplet` + `Nginx` (Reverse Proxy).

---

## ✨ Key Features

1.  **Object Detection**: Identifies 7 different classes of Khmer Riel notes (100 - 50,000 Riel) with high confidence.
2.  **Real-Time Calculator**: Automatically sums up the total value of detected currency.
3.  **Live Webcam**: Seamless integration with device camera for instant processing.
4.  **Persistent History**: Saves all scan results to a **PostgreSQL** database.
5.  **System Health Check**: Built-in dashboard to verify database connection and status.
6.  **Annotated Images**: Returns, displays, and saves images with bounding boxes drawn around detected notes.
7.  **Theme Support**: Fully functioning **Dark/Light** mode toggle.

---

## 🚀 Quick Start (Local Deployment)

### Prerequisites

- Docker & Docker Compose installed.

### Steps

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/THYCHANTHA/Cam-Currency-ITC-AMS.git
    cd Cam-Currency-ITC-AMS
    ```

2.  **Launch the Application**
    Run the following command to build and start all services (Backend, Frontend, Database):

    ```bash
    docker-compose up --build
    ```

3.  **Access the App**
    - 📱 **Frontend (Web App):** [http://localhost:5173](http://localhost:5173)
    - ⚙️ **Backend (API Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)
    - 🗄️ **Database System Check:** [http://localhost:5173](http://localhost:5173) -> Click "System"

---

## 📝 API Documentation

### Detect Currency

**POST** `/api/v1/detect/`

- **Description**: Uploads an image/frame to run inference.
- **Body**: `multipart/form-data` with `file`.

### Get History

**GET** `/api/v1/history/`

- **Description**: Retrieves persistent scan records from PostgreSQL.

### Check Database Status

**GET** `/api/v1/database/`

- **Description**: Verifies DB connection status.

---

## ⚖️ License

This project is part of the academic curriculum at **Institute of Technology of Cambodia (ITC)**.
