@echo off
echo ========================================================
echo   🇰🇭 CamCurrency - PRESENTATION MODE 🚀
echo   Running from Docker Hub Images (thychantha/...)
echo ========================================================

echo 1. Stopping any old containers...
docker-compose down
docker-compose -f docker-compose.test.yml down

echo 2. Pulling latest images from Cloud (Ensures stability)...
docker-compose -f docker-compose.test.yml pull

echo 3. Starting System...
docker-compose -f docker-compose.test.yml up -d

echo 4. Waiting for servers to initialize (10s)...
timeout /t 10 /nobreak

echo 5. Opening App...
start http://localhost:5173
start http://localhost:8000/docs

echo ========================================================
echo   ✅ READY FOR PRESENTATION!
echo   Frontend: http://localhost:5173
echo   Swagger:  http://localhost:8000/docs
echo ========================================================
pause
