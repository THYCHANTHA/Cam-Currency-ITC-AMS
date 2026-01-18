# Project Team & Responsibilities - Group 5

**Project Name:** Khmer Riel Automated Scanner & Calculator  
**Course:** ML Model Deployment  
**Stack:** YOLOv8, FastAPI, React + Vite, PostgreSQL, Docker, DigitalOcean

---

## 👨‍💻 Team Composition & Task Allocation

### 1. THY CHANTHA (Team Leader)

**Role:** System Architect, Lead DevOps & Full Stack Engineer  
**Code & Infrastructure Ownership (Major Core):**

- **System Architecture & DevOps**:
  - `docker-compose.yml`: Architected the entire Microservices ecosystem.
  - `backend/Dockerfile`: Optimized Multi-stage Python build.
  - `frontend/Dockerfile`: Production Nginx build for React.
  - `frontend/nginx.conf`: Reverse Proxy configuration.
- **AI Model Engineering**:
  - `backend/models/best.pt`: Trained custom YOLOv8 model (94% mAP).
  - `notebooks/data_verification/`: Managed Kaggle Training pipeline.
- **Backend Core**:
  - `backend/app/main.py`: API Lifecycle & Application Factory.
  - `backend/app/core/config.py`: Environment Configuration.

### 2. Frontend Team

**Members:** **Roeun Sovandeth** & **Taing Thaitheang**  
**Role:** UI/UX Design & Client-Side Logic

**Shared Code Ownership:**

- **Roeun Sovandeth (Frontend Lead)**:
  - `frontend/src/App.jsx`: Main Component (Webcam logic, API calls, State management).
  - `frontend/src/main.jsx`: React Root rendering.
- **Taing Thaitheang (Logic & Design)**:
  - `frontend/src/index.css`: Global styles, Dark/Light Themes, Animations.
  - `frontend/tailwind.config.js`: Theme customization.
  - **Calculator Logic**: Implemented the algorithm to sum currency values from detections.

### 3. Backend & API Team

**Members:** **Sem Yuthearylyhour** & **Siv Lyheng**  
**Role:** API Development & Quality Assurance

**Shared Code Ownership:**

- **Sem Yuthearylyhour (API Implementation)**:
  - `backend/app/api/v1/endpoints/detect.py`: Endpoint logic for Image/Video inference.
  - `backend/app/api/v1/endpoints/history.py`: History retrieval endpoint.
  - `backend/app/api/v1/router.py`: API Route aggregator.
- **Siv Lyheng (DevOps & QA)**:
  - `backend/app/core/logging.py`: Custom Error Logging system.
  - `CamCurrency_Postman_Collection.json`: API Test Suite & Validation.
  - `backend/tests/`: Unit testing suite.
  - `README.md`: System Documentation.

### 4. San Kimheang

**Role:** Database & Security Engineer  
**Code Ownership:**

- **Database & Architecture**:
  - `backend/app/models_db.py`: SQLAlchemy Database Models.
  - `backend/app/api/v1/endpoints/database.py`: System Health Check APIs.
  - `database/init.sql`: SQL Schema execution.
- **Security**:
  - `.env`: Management of Database credentials and Secrets.

---

## 📅 Development Timeline

| Phase       | Task                            | Assignee                        | Status       |
| :---------- | :------------------------------ | :------------------------------ | :----------- |
| **Phase 1** | Dataset Collection & Labeling   | All Members                     | ✅ Completed |
| **Phase 2** | Model Training (YOLOv8)         | **Chantha**                     | ✅ Completed |
| **Phase 3** | Backend Core & DevOps           | **Chantha**                     | ✅ Completed |
| **Phase 4** | React Frontend Development      | **Sovandeth** + **Thaitheang**  | ✅ Completed |
| **Phase 5** | Database & Security             | **Kimheang**                    | ✅ Completed |
| **Phase 6** | API Logic & Testing             | **Yuthearylyhour** + **Lyheng** | ✅ Completed |
| **Phase 7** | Cloud Deployment (DigitalOcean) | **Chantha**                     | ✅ Completed |
| **Phase 8** | Final Presentation              | All Members                     | ⏳ Pending   |

