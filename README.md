# 🚀 HỆ THỐNG AI TỰ KIẾM TIỀN 2.0 (NEXUS-V)

Dự án tích hợp 2 mô hình kinh doanh tự động:
1. **Két Sắt Thách Đố AI (AI Vault):** Trò chơi thu hút người xem nạp 10.000đ/lượt để thử bẻ khóa/thuyết phục AI chuyển tiền két sắt thưởng.
2. **Tiệm Làm Website 60 Giây (Instant Web Builder):** Dịch vụ làm trang web giới thiệu siêu tốc cho chủ shop/quán với giá 49.000đ, bàn giao mã nguồn HTML hoàn chỉnh ngay lập tức.

---

## 📂 Danh sách các file trong thư mục:
* `index.html`: Giao diện chính của hệ thống.
* `style.css`: Giao diện phong cách Dark/Cyberpunk hiện đại, responsive trên cả điện thoại và máy tính.
* `app.js`: Động cơ xử lý tự động (sinh mã VietQR, chạy live feed chống bẻ khóa, countdown 60s và tự sinh mã website HTML).
* `config.js`: **File cấu hình tài khoản ngân hàng và giá dịch vụ của bạn.**

---

## 🛠️ Hướng dẫn sử dụng & Tùy chỉnh:

### Bước 1: Xem thử ngay trên máy tính
Bạn chỉ cần mở trực tiếp file `index.html` bằng trình duyệt (Chrome, Cốc Cốc, Edge) là toàn bộ hệ thống hoạt động 100%!

### Bước 2: Thay số tài khoản ngân hàng của bạn
Mở file `config.js` và chỉnh sửa:
```javascript
window.APP_CONFIG = {
  bank: {
    bankId: "VCB",               // Mã ngân hàng của bạn (VCB, MB, ICB, TCB, ACB, VPB...)
    accountNo: "0123456789",      // Số tài khoản của bạn
    accountName: "NGUYEN VAN B",  // Tên chủ tài khoản viết hoa không dấu
  },
  vault: {
    initialAmount: 1500000,      // Số tiền trong két khởi điểm
    pricePerAttempt: 10000,      // Giá vé thách đố (10k)
  },
  webBuilder: {
    price: 49000,                // Giá làm web (49k)
  }
};
```
Mã VietQR trên web sẽ tự động đổi sang số tài khoản của bạn và tạo mã thanh toán theo thời gian thực!

---

## 🌐 Hướng dẫn đưa lên mạng miễn phí (Cloudflare Pages):
1. Truy cập [pages.cloudflare.com](https://pages.cloudflare.com/) (miễn phí 100%).
2. Chọn **"Upload assets"** (hoặc kết nối với GitHub).
3. Kéo toàn bộ thư mục `ai-kiem-tien-pro` này thả lên.
4. Bạn sẽ có ngay một đường link dạng `https://ten-du-an.pages.dev` hoạt động 24/7!
