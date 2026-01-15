# 🇰🇭 CamCurrency - Khmer Riel Automated Scanner & Calculator 💰

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/THYCHANTHA/Cam-Currency-ITC-AMS.git)
[![Kaggle Dataset](https://img.shields.io/badge/Kaggle-Dataset-20BEFF?logo=kaggle)](https://www.kaggle.com/datasets/thychantha/khmer-currency-itc-ams-gen2-c)
[![Tech Stack](https://img.shields.io/badge/Tech-FastAPI%20%7C%20React%20%7C%20YOLOv8%20%7C%20Docker-green)](#-technology-stack)

**CamCurrency** is an AI-powered Full Stack web application capable of detecting, classifying, and summing up Cambodian Riel banknotes in real-time. It features a complete pipeline from raw data collection to a production-ready containerized deployment.

The system is designed to identify 10 distinct classes of Khmer currency (ranging from 50 to 100,000 Riel) using a custom-trained YOLOv8 model, providing instantaneous feedback and calculation via a user-friendly React interface.

---

## 👥 Project Team (Group 5)

| Member                 | Role            | Responsibilities                                                                     |
| :--------------------- | :-------------- | :----------------------------------------------------------------------------------- |
| **THY CHANTHA**        | **Team Leader** | System Architecture, Model Training (YOLOv8), Backend (FastAPI), DevOps (Docker/VPS) |
| **Roeun Sovandeth**    | Frontend Dev    | React UI, Webcam Integration, Tailwind CSS Design                                    |
| **San Kimheang**       | Database Eng.   | PostgreSQL Schema, Data Persistence, Analytics queries                               |
| **Taing Thaitheang**   | Logic Designer  | Calculator Algorithm, Business Logic flow                                            |
| **Sem Yuthearylyhour** | API Dev         | API Endpoints implementation, Integration Testing                                    |
| **Siv Lyheng**         | QA & DevOps     | Quality Assurance, Documentation, Deployments                                        |

---

## 🛠️ Technology Stack

This project is built using a modern **Microservices Architecture**:

- 🧠 **AI Core:** [Ultralytics YOLOv8](https://github.com/ultralytics/ultralytics) (Nano model). Custom trained on **10 Classes** of Riel notes with 94%+ mAP.
- ⚙️ **Backend:** **FastAPI** (Python 3.10) - High-performance, async-ready API framework.
- 🎨 **Frontend:** **React** + **Vite** + **TailwindCSS** - Responsive, modern UI with integrated Dark/Light Mode.
- 💾 **Database:** **PostgreSQL** - Robust relational database for storing detection history and user sessions.
- 🐳 **Infrastructure:** **Docker** & **Docker Compose** - Complete orchestration for consistent dev/prod environments.
- ☁️ **Deployment:** DigitalOcean Droplet + Nginx (Reverse Proxy).

---

## ✨ Key Features

1.  **Object Detection:** Identifies **10 different classes** of Khmer Riel notes (50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000) with high confidence.
2.  **Real-Time Calculator:** Automatically sums up the total value of all detected currency in the frame.
3.  **Live Webcam:** Seamless integration with device camera for instant processing without file upload.
4.  **Persistent History:** Automatically saves all scan results (value, timestamp, image count) to PostgreSQL.
5.  **System Health Check:** Built-in dashboard to verify database connection status and API latency.
6.  **Annotated Images:** Returns images with color-coded bounding boxes drawn around detected notes.
7.  **Theme Support:** Modern UI with fully functioning Dark/Light mode toggle.

---

## 📂 Project Structure

```
CurrencyFullStack/
├── backend/                        # FastAPI Application
│   ├── app/
│   │   ├── api/                    # API v1 Endpoints (detect, history)
│   │   ├── core/                   # Config & Logging
│   │   ├── db/                     # Database Sessions
│   │   ├── models/                 # Model Weights (best.pt)
│   │   ├── detection.py            # YOLOv8 Inference Logic
│   │   ├── main.py                 # App Entrypoint
│   │   └── schemas.py              # Pydantic Models
│   ├── Dockerfile                  # Backend Container Config
│   └── requirements.txt            # Python Dependencies
├── database/                       # Database Configurations
│   └── init.sql                    # SQL Initialization Scripts
├── frontend/                       # React Application
│   ├── public/                     # Static Assets
│   ├── src/
│   │   ├── components/             # Reusable UI Components
│   │   ├── pages/                  # Main Views (Home, History)
│   │   ├── services/               # API Calls (axios)
│   │   ├── App.jsx                 # Main App Component
│   │   └── main.jsx                # React Entrypoint
│   ├── Dockerfile                  # Frontend Container Config
│   ├── index.html                  # HTML Entrypoint
│   ├── package.json                # Node Dependencies
│   ├── postcss.config.js           # CSS Config
│   ├── tailwind.config.js          # Tailwind Config
│   └── vite.config.js              # Vite Build Config
├── notebooks/                      # Data Analysis & Experiments
│   ├── dataset_export/             # Processed Datasets (Train/Valid/Test)
│   ├── models_backup/              # Trained Model Checkpoints (.pt)
│   ├── 01_data_verification.ipynb  # Label Verification Notebook
│   ├── 02_renamed_verification.ipynb # Data Cleaning Notebook
│   └── 03_model_verification.py    # Local Inference Test Script
├── docker-compose.yml              # Service Orchestration (App + DB)
├── README.md                       # Project Documentation
└── .env                            # Environment Variables (DB Creds)
```

---

## 🚀 Quick Start (Local Deployment)

### Prerequisites

- Docker & Docker Compose installed on your machine.

### Steps

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/THYCHANTHA/Cam-Currency-ITC-AMS.git
    cd Cam-Currency-ITC-AMS/CurrencyFullStack
    ```

2.  **Launch the Application**
    Run the following command to build images and start all services (Backend, Frontend, Database) in detached mode:

    ```bash
    docker-compose up --build -d
    ```

3.  **Access the App**

    - 📱 **Frontend (Web App):** [http://localhost:5173](http://localhost:5173)
    - ⚙️ **Backend (API Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)
    - 🗄️ **Database System Check:** [http://localhost:5173](http://localhost:5173) -> Click "System"

4.  **Stopping the App**
    ```bash
    docker-compose down
    ```

---

## 📊 Dataset & Model Training

### 1. Data Collection

We collected thousands of images covering 10 denominations: `50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000, 100000`. Images represent various conditions (lighting, angles, backgrounds) to ensure robustness.
👉 **[View Dataset on Kaggle](https://www.kaggle.com/datasets/thychantha/khmer-currency-itc-ams-gen2-c)**

### 2. Training Workflow

Training was performed on **Kaggle** using NVIDIA Tesla T4 GPUs to accelerate the process.

- **Epochs:** 200 (Early stopping equipped)
- **Batch Size:** 16
- **Image Size:** 640x640 px
- **Model:** YOLOv8n (Nano) for fast inference speed appropriate for web deployment.
- **Outcome:** The model achieved high precision/recall balance across all 10 classes. The best weights are saved as `best.pt`.

---

## 📝 API Documentation

### Detect Currency

`POST /api/v1/detect/`

- **Description:** Uploads an image file to run inference and return bounding boxes + total value.
- **Body:** `multipart/form-data` with `file`.
- **Response:** JSON containing detected classes, confidence scores, and `total_value`.

### Get History

`GET /api/v1/history/`

- **Description:** Retrieves persistent scan records from PostgreSQL.
- **Response:** JSON list of past scans.

### Check Database Status

`GET /api/v1/database/`

- **Description:** Verifies active connection to the PostgreSQL container.

---

## ⚖️ License

This project is part of the academic curriculum at **Institute of Technology of Cambodia (ITC)**.
