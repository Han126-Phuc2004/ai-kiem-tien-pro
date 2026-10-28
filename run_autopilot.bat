@echo off
chcp 65001 >nul
title Hệ Thống Tự Động Đăng Video TikTok/Shopee Lên Fanpage Adorable Daughter
echo ==============================================================================
echo      HỆ THỐNG TỰ ĐỘNG TẢI VIDEO ➡️ ĐĂNG REELS FANPAGE ➡️ GHIM LINK AFFILIATE
echo      Fanpage đích: Adorable Daughter (ID: 107743041749810)
echo ==============================================================================
echo.
set /p VIDEO_URL="1. Dán link video (TikTok / Shopee / Shorts): "
if "%VIDEO_URL%"=="" (
    echo [Lỗi] Bạn chưa nhập link video!
    pause
    exit /b
)

set /p AFF_URL="2. Dán link Affiliate của bạn (ấn Enter để dùng link mặc định): "
if "%AFF_URL%"=="" set AFF_URL=https://han126-phuc2004.github.io/ai-kiem-tien-pro/

set /p PROD_NAME="3. Tên sản phẩm (ấn Enter để AI tự đặt tên): "
if "%PROD_NAME%"=="" set PROD_NAME=Món Đồ Tiện Ích Đang Hot

echo.
echo [BẮT ĐẦU XỬ LÝ...]
py autopilot\auto_crawler_and_poster.py "%VIDEO_URL%" "%AFF_URL%" "%PROD_NAME%"
echo.
pause
