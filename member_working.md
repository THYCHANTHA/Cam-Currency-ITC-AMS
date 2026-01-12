# 👥 Project Team & Responsibilities - Group 5

**Project Name:** Khmer Riel Automated Scanner & Calculator  
**Repository:** [GitHub Link](https://github.com/THYCHANTHA/Cam-Currency-ITC-AMS.git)

This document serves as the **Master Assignment List**, detailing code ownership and team groupings.

---

## 👨‍💻 Detailed Code Ownership

### **1. THY CHANTHA (Team Leader)**

**Role:** System Architect, AI Core, & DevOps.
**📂 Files responsible for:**

- **DevOps:** `docker-compose.yml`, `backend/Dockerfile`, `frontend/Dockerfile`
- **AI Model:** `backend/app/models/best.pt`, `backend/app/detection.py`
- **Pipeline:** `notebooks/` (All data & training verification scripts)
- **Backend Config:** `backend/app/main.py`, `backend/app/core/config.py`

### **2. Frontend Team** (Sovandeth + Thaitheang)

**A. Roeun Sovandeth (Lead)**
**Role:** Main React Logic & Webcam.
**📂 Files responsible for:**

- `frontend/src/App.jsx`
- `frontend/src/main.jsx`
- `frontend/src/components/CurrencyDetector.jsx`
- `frontend/src/components/WebcamCapture.jsx`
- `frontend/src/pages/Home.jsx`

**B. Taing Thaitheang (Design & Logic)**
**Role:** Styling, Theme, & Calculator Algorithms.
**📂 Files responsible for:**

- `frontend/src/index.css`
- `frontend/tailwind.config.js`
- `frontend/src/components/ThemeToggle.jsx`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/utils/calculator.js`

### **3. Backend & QA Team** (Yuthearylyhour + Lyheng)

**A. Sem Yuthearylyhour (API Dev)**
**Role:** Endpoints & Routing.
**📂 Files responsible for:**

- `backend/app/api/v1/router.py`
- `backend/app/api/v1/endpoints/detect.py` (Inference Endpoint)
- `backend/app/api/v1/endpoints/history.py` (History Endpoint)
- `backend/requirements.txt`

**B. Siv Lyheng (QA & Docs)**
**Role:** Quality Assurance, Logging, & Documentation.
**📂 Files responsible for:**

- `backend/app/core/logging.py`
- `backend/tests/` (QA Test Suite)
- `README.md`
- `PROJECT_STRUCTURE.md`
- `member_working.md`

### **4. San Kimheang (Database)**

**Role:** Database Schema & Persistence.
**📂 Files responsible for:**

- `backend/app/models_db.py`
- `backend/app/crud.py`
- `backend/app/db/session.py`
- `backend/app/api/v1/endpoints/database.py`
- `database/init.sql`

---

## 📅 Status Tracker

| Phase       | Task             | Assignee                    | Status       |
| :---------- | :--------------- | :-------------------------- | :----------- |
| **Phase 1** | Data Collection  | **All Members**             | ✅ Completed |
| **Phase 2** | Model Training   | **Chantha**                 | ✅ Completed |
| **Phase 3** | Backend Core     | **Chantha**                 | ✅ Completed |
| **Phase 4** | Frontend Dev     | **Sovandeth + Thaitheang**  | ✅ Completed |
| **Phase 5** | Database Dev     | **Kimheang**                | ✅ Completed |
| **Phase 6** | Backend API & QA | **Yuthearylyhour + Lyheng** | ✅ Completed |
| **Phase 7** | Deployment       | **All Members**             | ⏳ Pending   |
