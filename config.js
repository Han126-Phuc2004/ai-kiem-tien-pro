// ============================================================
// CẤU HÌNH HỆ THỐNG - BẠN CHỈ CẦN SỬA THÔNG TIN Ở ĐÂY
// ============================================================
window.APP_CONFIG = {
  // Thông tin ngân hàng nhận tiền thật của bạn (dùng để sinh mã VietQR tự động)
  bank: {
    bankId: "ICB",               // Mã ngân hàng (ICB: Vietinbank, VCB: Vietcombank, MB: MBBank, TCB: Techcombank, ACB: ACB...)
    accountNo: "109876543210",    // Số tài khoản ngân hàng của bạn
    accountName: "NGUYEN VAN A",  // Tên chủ tài khoản (viết hoa không dấu)
  },

  // Cấu hình Két Sắt AI
  vault: {
    initialAmount: 1500000,      // Tiền khởi điểm trong két (VNĐ)
    pricePerAttempt: 10000,      // Giá 1 lần gửi câu hỏi thách đố (VNĐ)
    rewardSharePercent: 50,      // 50% tiền vé nạp sẽ cộng dồn vào két sắt
    botName: "NEXUS-V",          // Tên Robot bảo vệ két
  },

  // Cấu hình Dịch vụ Tạo Website 60s
  webBuilder: {
    price: 49000,                // Giá tạo 1 website (VNĐ)
    durationSeconds: 60,         // Thời gian đếm ngược hoàn thành (giây)
  }
};
