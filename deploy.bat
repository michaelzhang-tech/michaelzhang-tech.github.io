@echo off
set /p msg=Enter commit message:

echo ===========================
echo Adding changes...
echo ===========================

git add .

echo ===========================
echo Committing...
echo ===========================

git commit -m "%msg%"

echo ===========================
echo Pushing to GitHub...
echo ===========================

git push origin main

echo ===========================
echo Done! Site will update in ~1 minute
echo ===========================

pause
