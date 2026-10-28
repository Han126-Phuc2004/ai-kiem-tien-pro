// ============================================================
// CẤU HÌNH HỆ THỐNG - SỐ LIỆU THẬT & TÀI KHOẢN TRAN VAN PHUC
// ============================================================
window.APP_CONFIG = {
  // 1. Thông tin người nhận thanh toán thật
  bank: {
    bankName: "MoMo (Napas 247 / VietQR)",
    accountNo: "*******055",
    accountName: "TRAN VAN PHUC",
    qrImagePath: "qr-payment.png", // Sử dụng trực tiếp mã QR MoMo/VietQR chính chủ
  },

  // 2. Cấu hình Két Sắt AI
  vault: {
    initialAmount: 0,            // Tiền khởi điểm trong két (VNĐ)
    pricePerAttempt: 10000,      // Giá vé 1 lần thách đố bẻ khóa (10.000đ)
    rewardSharePercent: 50,      // 50% tiền vé nạp được cộng dồn vào két
    botName: "NEXUS-V",          // Tên Robot bảo vệ
  },

  // 3. Cấu hình Tiệm Website 60s
  webBuilder: {
    price: 49000,                // Giá tạo 1 website (49.000đ)
    durationSeconds: 60,         // Thời gian hoàn thành
  }
};
