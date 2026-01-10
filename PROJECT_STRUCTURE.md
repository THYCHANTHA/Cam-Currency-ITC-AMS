# Project File Structure

This document reflects the current actual file structure of the `CurrencyFullStack` directory as of deployment.

```text
CurrencyFullStack/
├── backend/                      # Production FastAPI Backend
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── database.py # DB System Check Endpoint
│   │   │       │   ├── detect.py   # Inference Endpoint
│   │   │       │   └── history.py  # Scan History Endpoint
│   │   │       └── router.py     # API Router
│   │   ├── core/
│   │   │   ├── config.py         # Settings & Env Vars
│   │   │   └── logging.py        # Professional Logger
│   │   ├── db/
│   │   │   └── session.py        # Database Session Manager
│   │   ├── models/
│   │   │   └── yolo.py           # YOLO Wrapper Class
│   │   ├── database.py           # SQL Alchemy Base
│   │   ├── main.py               # App Entrypoint
│   │   ├── models_db.py          # SQL Alchemy Models (Detection)
│   │   └── schemas.py            # Pydantic Schemas
│   ├── log/                      # Application Logs
│   ├── models/
│   │   └── best.pt               # Trained YOLOv8 Model (94% mAP)
│   ├── results/                  # Annotated Inference Results
│   ├── tests/                    # Unit & Security Tests
│   ├── uploads/                  # Temporary Upload Storage
│   ├── check_db.py               # Standalone Database Check Script
│   ├── Dockerfile                # Backend Container Config
│   ├── pyproject.toml            # Python Project Config
│   └── requirements.txt          # PIP Dependencies
├── database/
│   └── init.sql                  # Database Initialization
├── frontend/                     # React + Vite Frontend
│   ├── src/
│   │   ├── assets/               # Frontend Assets
│   │   ├── components/           # React Components
│   │   ├── App.jsx               # Main Application Logic (Webcam, API, Theme, DB)
│   │   ├── index.css             # Global Styles (Tailwind)
│   │   └── main.jsx              # React Entrypoint
│   ├── Dockerfile                # Nginx Serving React
│   ├── index.html                # HTML Template
│   ├── package.json              # NPM Dependencies
│   ├── postcss.config.js         # PostCSS Config
│   ├── tailwind.config.js        # Tailwind CSS Config
│   └── vite.config.js            # Vite Config
├── notebooks/                    # Data Science & Verification
│   ├── dataset_export/           # Kaggle Dataset Files
│   ├── models_backup/            # Checkpoints (epoch90.pt)
│   ├── 01_data_verification.ipynb
│   ├── 02_renamed_verification.ipynb
│   └── 03_model_verification.py
├── .env                          # Environment Secrets (Excluded from Git)
├── CamCurrency_Postman_Collection.json # API Tests
├── docker-compose.yml            # Docker Orchestration
├── member_working.md             # Team Roles & Responsibilities
├── PROJECT_STRUCTURE.md          # This File
└── README.md                     # Main Project Documentation
```
