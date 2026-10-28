# 🤖 HỆ THỐNG TỰ ĐỘNG HÓA FANPAGE: ADORABLE DAUGHTER

Hệ thống tích hợp hoàn chỉnh 4 chức năng:
1. **Tự động sản xuất Video Reels AI:** Kịch bản ➡️ Giọng đọc AI tiếng Việt (Hoài My / Nam Minh) ➡️ Render video dọc 1080x1920 (FFmpeg).
2. **Tự động đăng bài & video lên Fanpage:** Gọi Meta Graph API đăng trực tiếp vào Page `Adorable Daughter`.
3. **Tự động gắn Link Tiếp thị liên kết (Affiliate):** Tự động comment link Shopee / Web của bạn ngay dưới bài viết / video.
4. **Tự động trả lời bình luận (Auto-reply bot):** Nhận diện khách hỏi "xin link", "giá", "mua ở đâu" và tự động gửi link mua hàng.

---

## 📂 Danh sách file trong thư mục:
* `config.py`: File cấu hình ID Page, Token và Link Affiliate của bạn.
* `fb_api.py`: Bộ thư viện tương tác với Meta Graph API (đăng bài, đăng video, đọc comment, rep comment).
* `video_engine.py`: Động cơ sản xuất video tự động bằng Edge-TTS và FFmpeg.
* `auto_reply.py`: Bot tự động quét và trả lời bình luận của khách hàng.
* `main.py`: Bảng điều khiển trung tâm (Dashboard dạng dòng lệnh cực dễ dùng).

---

## 🚀 Cách chạy trên máy tính:
Mở PowerShell hoặc Command Prompt tại thư mục này và gõ:
```bash
py main.py
```

Bạn sẽ có một menu điều khiển trực quan:
* Chọn `1` để kiểm tra kết nối với Page Adorable Daughter.
* Chọn `2` để đăng thử 1 bài viết mẫu kèm link Affiliate ghim đầu.
* Chọn `3` để AI tự sản xuất 1 video Reels và đăng lên Page.
* Chọn `4` để quét và trả lời bình luận của khách.
* Chọn `5` để treo bot chạy tự động 24/7.
