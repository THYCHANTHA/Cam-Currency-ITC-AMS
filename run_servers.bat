@echo off
echo ========================================
echo Starting CamCurrency Full Stack App
echo ========================================

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && uvicorn app.main:app --reload"

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo ========================================
echo Servers launched in new windows!
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:5173
echo ========================================
pause
