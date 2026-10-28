// ============================================================
// CẤU HÌNH HỆ THỐNG - SỐ LIỆU THẬT 100%
// ============================================================
window.APP_CONFIG = {
  // 1. Thông tin ngân hàng nhận tiền thật của bạn
  bank: {
    bankId: "VCB",               // Mã ngân hàng (VCB, MB, ICB, TCB, ACB...)
    accountNo: "0123456789",      // Số tài khoản của bạn
    accountName: "NGUYEN VAN A",  // Tên chủ tài khoản (viết hoa không dấu)
  },

  // 2. Cấu hình Két Sắt AI - SỐ LIỆU THẬT
  vault: {
    initialAmount: 0,            // Vốn ban đầu bạn bỏ vào két (để 0đ nếu bắt đầu từ số 0)
    pricePerAttempt: 10000,      // Giá vé 1 lần thách đố bẻ khóa (10.000đ)
    rewardSharePercent: 50,      // 50% tiền vé nạp được cộng dồn vào két
    botName: "NEXUS-V",          // Tên Robot bảo vệ
  },

  // 3. Cấu hình Tiệm Website 60s
  webBuilder: {
    price: 49000,                // Giá tạo 1 website (49.000đ)
    durationSeconds: 60,         // Thời gian hoàn thành
  },

  // 4. API Backend Đồng Bộ Số Liệu Thật (Cloudflare Worker / Serverless)
  // Nếu chưa có server, hệ thống sẽ lưu trữ phiên thật trên thiết bị
  apiEndpoint: "" 
};
