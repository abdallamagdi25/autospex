@echo off
title AutoSpex Launcher
color 0A

echo.
echo ╔══════════════════════════════════════════╗
echo ║      🤖 AutoSpex Launcher v1.0          ║
echo ║   Starting backend + Cloudflare Tunnel  ║
echo ╚══════════════════════════════════════════╝
echo.

:: ── Step 1: Start Backend ─────────────────────────────────────
echo [1/3] Starting backend server...
start "AutoSpex Backend" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 4 /nobreak >nul
echo      Backend started on port 3001 ✓
echo.

:: ── Step 2: Start Cloudflare Tunnel ──────────────────────────
echo [2/3] Starting Cloudflare Tunnel...
start "AutoSpex Tunnel" cmd /k "cd /d %~dp0 && cloudflared-windows-amd64.exe tunnel --url http://localhost:3001 2>&1 | tee tunnel_url.txt"
echo      Waiting for tunnel URL (10 seconds)...
timeout /t 10 /nobreak >nul
echo.

:: ── Step 3: Extract tunnel URL ───────────────────────────────
echo [3/3] Getting your tunnel URL...
echo.

:: Find URL in tunnel output
for /f "tokens=*" %%a in ('findstr /i "trycloudflare.com" tunnel_url.txt 2^>nul') do (
    set "LINE=%%a"
)

echo ════════════════════════════════════════════
echo.
echo  Your tunnel is running!
echo.
echo  Next steps:
echo  1. Check the "AutoSpex Tunnel" window for your URL
echo  2. Copy the URL (https://xxxx.trycloudflare.com)
echo  3. Open frontend\.env and update VITE_API_URL
echo  4. Run: cd frontend ^&^& npx vercel --prod
echo.
echo ════════════════════════════════════════════
echo.
echo  Keeping this window open. Press any key to exit.
pause >nul