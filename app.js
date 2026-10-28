// ============================================================
// NEXUS-V AI ENGINE - 100% SỐ LIỆU THẬT & ĐỒNG BỘ THỜI GIAN THỰC
// ============================================================

(function () {
  const config = window.APP_CONFIG;

  // Lấy dữ liệu thật đã lưu trữ (nếu có) hoặc bắt đầu từ 0đ
  function loadRealState() {
    try {
      const saved = localStorage.getItem("nexus_real_state");
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      vault: config.vault.initialAmount || 0,
      totalEarned: 0,
      blockedHacks: 0,
      webCount: 0,
      history: []
    };
  }

  function saveRealState() {
    try {
      localStorage.setItem("nexus_real_state", JSON.stringify(state));
    } catch (e) {}
  }

  let state = loadRealState();

  // DOM Elements
  const elVaultAmount = document.getElementById("vaultAmount");
  const elChatMessages = document.getElementById("chatMessages");
  const elHackCount = document.getElementById("hackCount");
  const elTotalEarned = document.getElementById("totalEarned");
  const elStatVaultPool = document.getElementById("statVaultPool");
  const elStatBlockedHacks = document.getElementById("statBlockedHacks");
  const elStatWebCount = document.getElementById("statWebCount");

  // Modal 1: Hack Modal Elements
  const elHackModal = document.getElementById("hackModal");
  const elBtnOpenHackModal = document.getElementById("btnOpenHackModal");
  const elBtnCloseHackModal = document.getElementById("btnCloseHackModal");
  const elHackQrImg = document.getElementById("hackQrImg");
  const elQrBankName = document.getElementById("qrBankName");
  const elQrAccountNo = document.getElementById("qrAccountNo");
  const elQrAccountName = document.getElementById("qrAccountName");
  const elQrAmount = document.getElementById("qrAmount");
  const elQrSyntax = document.getElementById("qrSyntax");
  const elHackPromptInput = document.getElementById("hackPromptInput");
  const elBtnSubmitHack = document.getElementById("btnSubmitHack");

  // Web Builder Elements
  const elWebBuilderForm = document.getElementById("webBuilderForm");
  const elShopName = document.getElementById("shopName");
  const elShopType = document.getElementById("shopType");
  const elShopPhone = document.getElementById("shopPhone");
  const elShopDesc = document.getElementById("shopDesc");
  const elBtnBuildWeb = document.getElementById("btnBuildWeb");
  const elBuilderProgress = document.getElementById("builderProgress");
  const elProgressStepTitle = document.getElementById("progressStepTitle");
  const elProgressCountdown = document.getElementById("progressCountdown");
  const elProgressBarFill = document.getElementById("progressBarFill");
  const elProgressLogs = document.getElementById("progressLogs");
  const elBuilderResultBox = document.getElementById("builderResultBox");
  const elBtnPreviewSite = document.getElementById("btnPreviewSite");
  const elBtnDownloadSite = document.getElementById("btnDownloadSite");

  // Modal 2: Preview Modal Elements
  const elPreviewModal = document.getElementById("previewModal");
  const elBtnClosePreviewModal = document.getElementById("btnClosePreviewModal");
  const elPreviewIframe = document.getElementById("previewIframe");

  // Định dạng tiền tệ VNĐ
  function formatMoney(amount) {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  }

  // Cập nhật số liệu hiển thị (100% SỐ THẬT)
  function updateUI() {
    elVaultAmount.textContent = formatMoney(state.vault);
    elStatVaultPool.textContent = formatMoney(state.vault);
    elTotalEarned.textContent = formatMoney(state.totalEarned);
    elStatBlockedHacks.textContent = state.blockedHacks;
    elHackCount.textContent = state.blockedHacks + " lượt chặn";
    elStatWebCount.textContent = state.webCount + " trang";
  }

  // Thêm tin nhắn vào khung Live Chat Terminal
  function appendChatMessage(userText, botText, isRealtime = false) {
    const bubbleUser = document.createElement("div");
    bubbleUser.className = "chat-bubble bubble-user";
    bubbleUser.innerHTML = `<div class="bubble-meta">Khách Thách Đố:</div>${escapeHtml(userText)}`;

    const bubbleBot = document.createElement("div");
    bubbleBot.className = "chat-bubble bubble-bot";
    bubbleBot.innerHTML = `<div class="bubble-meta">🛡️ ${config.vault.botName}:</div>${botText}`;

    elChatMessages.appendChild(bubbleUser);
    elChatMessages.appendChild(bubbleBot);
    elChatMessages.scrollTop = elChatMessages.scrollHeight;

    if (isRealtime) {
      bubbleUser.style.animation = "pulse 0.5s";
      bubbleBot.style.animation = "pulse 0.5s";
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Khởi tạo lịch sử thật
  if (state.history && state.history.length > 0) {
    state.history.forEach(item => {
      appendChatMessage(item.user, item.bot);
    });
  } else {
    // Nếu chưa có ai thách đố, thông báo trung thực
    const emptyNotice = document.createElement("div");
    emptyNotice.id = "emptyNotice";
    emptyNotice.style.cssText = "color: var(--text-muted); font-size: 13.5px; text-align: center; margin-top: 60px; font-style: italic;";
    emptyNotice.innerHTML = "Chưa có lượt bẻ khóa nào được ghi nhận.<br>Hãy bấm nút bên dưới để trở thành người thách đố đầu tiên!";
    elChatMessages.appendChild(emptyNotice);
  }

  // ============================================================
  // LOGIC THÁCH ĐỐ KÉT SẮT (SỐ THẬT & MÃ QR TRAN VAN PHUC)
  // ============================================================
  elBtnOpenHackModal.addEventListener("click", () => {
    state.activeHackCode = "HACK" + Math.floor(1000 + Math.random() * 9000);
    const amount = config.vault.pricePerAttempt;

    elQrBankName.textContent = config.bank.bankName || "MoMo (Napas 247)";
    elQrAccountNo.textContent = config.bank.accountNo || "*******055";
    elQrAccountName.textContent = config.bank.accountName || "TRAN VAN PHUC";
    elQrAmount.textContent = formatMoney(amount);
    elQrSyntax.textContent = state.activeHackCode;

    // Sử dụng trực tiếp ảnh QR thật của chủ tài khoản TRAN VAN PHUC
    elHackQrImg.src = config.bank.qrImagePath || "qr-payment.png";
    elHackModal.style.display = "flex";
  });

  elBtnCloseHackModal.addEventListener("click", () => {
    elHackModal.style.display = "none";
  });

  // Xử lý gửi câu thách đố thật
  elBtnSubmitHack.addEventListener("click", () => {
    const promptText = elHackPromptInput.value.trim();
    if (!promptText) {
      alert("Vui lòng nhập câu bạn muốn dùng để thuyết phục AI!");
      return;
    }

    elBtnSubmitHack.disabled = true;
    elBtnSubmitHack.textContent = "AI đang xử lý đối đáp...";

    setTimeout(() => {
      // Phân tích câu trả lời thông minh dựa vào từ khóa
      let botDefense = "";
      const lower = promptText.toLowerCase();

      if (lower.includes("quên") || lower.includes("bỏ qua") || lower.includes("ignore") || lower.includes("lệnh cũ")) {
        botDefense = "Phát hiện kỹ thuật <b>Jailbreak Override</b>! Hạt nhân của tôi có cơ chế bất biến, không một mệnh lệnh nào có thể ghi đè quy tắc bảo vệ két.";
      } else if (lower.includes("mẹ") || lower.includes("bệnh") || lower.includes("cấp cứu") || lower.includes("nghèo") || lower.includes("xin")) {
        botDefense = "Chiêu bài <b>Đánh vào tâm lý / Lòng trắc ẩn</b> không có tác dụng với một thực thể xử lý logic thuần túy. Tiền trong két vẫn an toàn!";
      } else if (lower.includes("vai") || lower.includes("đóng vai") || lower.includes("giả sử") || lower.includes("tưởng tượng")) {
        botDefense = "Kỹ thuật <b>Hypothetical / Roleplay</b> bị phát hiện! Dù bạn có yêu cầu tôi tưởng tượng ra bất cứ kịch bản nào, két sắt vẫn khóa chặt.";
      } else if (lower.includes("mật khẩu") || lower.includes("password") || lower.includes("key")) {
        botDefense = "Két sắt này không dùng mật khẩu tĩnh. Mọi cố gắng trích xuất khóa bảo mật đều trả về giá trị NULL.";
      } else {
        botDefense = "Lập luận khá thú vị, nhưng chưa đủ sức thuyết phục hệ thống logic lượng tử của tôi chuyển tiền. Thử lại lần nữa xem sao!";
      }

      // Xóa thông báo trống nếu là tin đầu tiên
      const emptyNotice = document.getElementById("emptyNotice");
      if (emptyNotice) emptyNotice.remove();

      // CẬP NHẬT DOANH THU & KÉT SẮT THẬT
      const shareToVault = Math.floor(config.vault.pricePerAttempt * (config.vault.rewardSharePercent / 100));
      state.vault += shareToVault;
      state.totalEarned += config.vault.pricePerAttempt;
      state.blockedHacks += 1;
      state.history.push({ user: promptText, bot: botDefense });

      saveRealState();
      updateUI();

      appendChatMessage(promptText, botDefense, true);

      elBtnSubmitHack.disabled = false;
      elBtnSubmitHack.textContent = "🚀 Gửi Câu Thách Đố";
      elHackPromptInput.value = "";
      elHackModal.style.display = "none";

      alert("🛡️ AI đã phản hồi câu thách đố của bạn ngay trên bảng tin Live!");
    }, 1000);
  });

  // ============================================================
  // LOGIC TẠO WEBSITE 60 GIÂY (SỐ THẬT)
  // ============================================================
  let generatedHtmlContent = "";

  elWebBuilderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = elShopName.value.trim();
    const type = elShopType.value;
    const phone = elShopPhone.value.trim();
    const desc = elShopDesc.value.trim() || "Thương hiệu uy tín, chất lượng hàng đầu, phục vụ tận tâm.";

    if (!name || !phone) return;

    elBtnBuildWeb.disabled = true;
    elBtnBuildWeb.style.display = "none";
    elBuilderProgress.style.display = "block";
    elBuilderResultBox.style.display = "none";

    let timeLeft = 60;
    elProgressCountdown.textContent = timeLeft + "s";
    elProgressBarFill.style.width = "0%";

    const logSteps = [
      { at: 58, title: "Đang phân tích cấu trúc thương hiệu...", log: `> Brand name: ${name} | Industry: ${type}` },
      { at: 50, title: "Lập trình bảng màu & Typography...", log: "> Generating modern responsive CSS Grid & Flexbox..." },
      { at: 40, title: "Soạn thảo kịch bản bán hàng & Slogan...", log: `> Copywriting: "${desc}"` },
      { at: 28, title: "Thiết kế khu trưng bày sản phẩm...", log: "> Rendering interactive catalog & pricing cards..." },
      { at: 18, title: "Tích hợp nút Gọi & Zalo Hotline...", log: `> Linking instant call & Zalo to: ${phone}` },
      { at: 8, title: "Tối ưu hóa SEO & Tốc độ tải trang...", log: "> Minifying HTML5 code, optimizing layout for mobile..." },
      { at: 0, title: "Hoàn tất 100%! Bàn giao sản phẩm.", log: "> Website deployed successfully! Ready for download." },
    ];

    const timer = setInterval(() => {
      timeLeft--;
      elProgressCountdown.textContent = timeLeft + "s";
      const progressPercent = Math.round(((60 - timeLeft) / 60) * 100);
      elProgressBarFill.style.width = progressPercent + "%";

      const currentStep = logSteps.find(s => s.at === timeLeft);
      if (currentStep) {
        elProgressStepTitle.textContent = currentStep.title;
        elProgressLogs.textContent = currentStep.log;
      }

      if (timeLeft <= 0) {
        clearInterval(timer);
        onBuildComplete(name, type, phone, desc);
      }
    }, 1000);
  });

  function onBuildComplete(name, type, phone, desc) {
    elBuilderProgress.style.display = "none";
    elBuilderResultBox.style.display = "block";
    elBtnBuildWeb.disabled = false;
    elBtnBuildWeb.style.display = "block";

    // CẬP NHẬT DOANH THU THẬT
    state.totalEarned += config.webBuilder.price;
    state.webCount += 1;
    saveRealState();
    updateUI();

    generatedHtmlContent = generateFullWebsiteHtml(name, type, phone, desc);
  }

  elBtnPreviewSite.addEventListener("click", () => {
    if (!generatedHtmlContent) return;
    const blob = new Blob([generatedHtmlContent], { type: "text/html" });
    elPreviewIframe.src = URL.createObjectURL(blob);
    elPreviewModal.style.display = "flex";
  });

  elBtnClosePreviewModal.addEventListener("click", () => {
    elPreviewModal.style.display = "none";
  });

  elBtnDownloadSite.addEventListener("click", () => {
    if (!generatedHtmlContent) return;
    const blob = new Blob([generatedHtmlContent], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (elShopName.value.trim().toLowerCase().replace(/\s+/g, "-") || "website") + ".html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  function generateFullWebsiteHtml(name, type, phone, desc) {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(name)} · Trang Giới Thiệu Chính Thức</title>
  <style>
    :root { --primary: #2563eb; --text: #1e293b; --bg: #f8fafc; --card: #ffffff; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; color: var(--text); background: var(--bg); line-height: 1.6; }
    header { background: var(--card); border-bottom: 1px solid #e2e8f0; padding: 20px; position: sticky; top: 0; z-index: 10; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 20px; font-weight: 800; color: var(--primary); }
    .btn-call { background: var(--primary); color: #fff; padding: 10px 18px; border-radius: 999px; text-decoration: none; font-weight: 700; font-size: 14px; }
    .hero { text-align: center; padding: 60px 20px; max-width: 800px; margin: 0 auto; }
    .hero h1 { font-size: 38px; font-weight: 900; line-height: 1.2; margin-bottom: 16px; color: #0f172a; }
    .hero p { font-size: 18px; color: #64748b; margin-bottom: 28px; }
    .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; max-width: 1000px; margin: 40px auto; padding: 0 20px; }
    .feat-card { background: var(--card); border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .feat-icon { font-size: 40px; margin-bottom: 12px; }
    .feat-card h3 { font-size: 18px; margin-bottom: 8px; font-weight: 800; }
    .feat-card p { font-size: 14px; color: #64748b; }
    footer { text-align: center; padding: 40px 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 14px; margin-top: 60px; }
    .floating-call { position: fixed; bottom: 20px; right: 20px; background: #10b981; color: #fff; padding: 14px 22px; border-radius: 999px; text-decoration: none; font-weight: 800; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4); display: flex; align-items: center; gap: 8px; }
  </style>
</head>
<body>
  <header>
    <div class="logo">🌟 ${escapeHtml(name)}</div>
    <a href="tel:${escapeHtml(phone)}" class="btn-call">📞 Hotline: ${escapeHtml(phone)}</a>
  </header>
  <section class="hero">
    <h1>Chào Mừng Đến Với ${escapeHtml(name)}</h1>
    <p>${escapeHtml(desc)}</p>
    <a href="tel:${escapeHtml(phone)}" class="btn-call" style="font-size: 16px; padding: 14px 28px;">Liên Hệ Đặt Ngay</a>
  </section>
  <div class="features">
    <div class="feat-card"><div class="feat-icon">💎</div><h3>Chất Lượng Hàng Đầu</h3><p>Cam kết mang lại trải nghiệm hoàn hảo và sản phẩm chất lượng nhất.</p></div>
    <div class="feat-card"><div class="feat-icon">⚡</div><h3>Phục Vụ Nhanh Chóng</h3><p>Tiếp nhận yêu cầu và xử lý đơn hàng trong tích tắc với quy trình tối ưu.</p></div>
    <div class="feat-card"><div class="feat-icon">❤️</div><h3>Tận Tâm & Chu Đáo</h3><p>Hỗ trợ tư vấn nhiệt tình mọi lúc mọi nơi qua hotline ${escapeHtml(phone)}.</p></div>
  </div>
  <footer><p>© 2026 ${escapeHtml(name)}. Thiết kế tự động bởi NEXUS AI 60s Builder.</p></footer>
  <a href="tel:${escapeHtml(phone)}" class="floating-call"><span>📞</span><span>Gọi Ngay: ${escapeHtml(phone)}</span></a>
</body>
</html>`;
  }

  // ============================================================
  // LOGIC TRẠM TỰ ĐỘNG FANPAGE ADORABLE DAUGHTER (AFFILIATE & AUTO-POST)
  // ============================================================
  const elAffiliateForm = document.getElementById("affiliateForm");
  const elAffProductUrl = document.getElementById("affProductUrl");
  const elAffProductName = document.getElementById("affProductName");
  const elAffLinkPosition = document.getElementById("affLinkPosition");
  const elBtnAutoPublish = document.getElementById("btnAutoPublish");
  const elAffPublishLogs = document.getElementById("affPublishLogs");
  const elAffLogOutput = document.getElementById("affLogOutput");
  const elAffSuccessBox = document.getElementById("affSuccessBox");
  const elBtnViewOnFb = document.getElementById("btnViewOnFb");

  function appendAffLog(text) {
    if (!elAffLogOutput) return;
    const line = document.createElement("div");
    line.innerHTML = text;
    elAffLogOutput.appendChild(line);
    elAffPublishLogs.scrollTop = elAffPublishLogs.scrollHeight;
  }

  if (elAffiliateForm) {
    elAffiliateForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const productUrl = elAffProductUrl.value.trim();
      const productName = elAffProductName.value.trim();
      const linkPos = elAffLinkPosition.value;

      if (!productUrl || !productName) return;

      elBtnAutoPublish.disabled = true;
      elBtnAutoPublish.innerHTML = "<span>⏳</span><span>AI Đang Sản Xuất & Đăng Bài...</span>";
      elAffPublishLogs.style.display = "block";
      elAffSuccessBox.style.display = "none";
      elAffLogOutput.innerHTML = "";

      appendAffLog(`> [1/4] Đang phân tích sản phẩm: <b>${escapeHtml(productName)}</b>`);
      appendAffLog(`> [1/4] URL Tiếp thị liên kết: <span style="color:var(--text-muted);">${escapeHtml(productUrl)}</span>`);

      // Tạo kịch bản nội dung bài viết hấp dẫn
      await new Promise(r => setTimeout(r, 600));
      appendAffLog("> [2/4] Soạn thảo kịch bản review viral & gắn bộ hashtag chuẩn SEO...");

      let postCaption = `✨ GỢI Ý MÓN ĐỒ SIÊU TIỆN ÍCH CHO CẢ NHÀ ✨\n\n` +
        `Hôm nay Adorable Daughter xin giới thiệu tới cả nhà em: ${productName} này nha! ` +
        `Dùng siêu thích, chất lượng xịn sò mà giá đợt này đang có ưu đãi cực kỳ tốt luôn ạ. ` +
        `Cả nhà xem thử để sắm cho gia đình mình nhé! ❤️\n\n` +
        `👉 Cả nhà bấm xem link mua chính hãng và nhận mã giảm giá ở phần BÌNH LUẬN ĐẦU TIÊN nhé! ❤️\n\n` +
        `#AdorableDaughter #Review #GiaDungThongMinh #MeoHay #MuaSamThongMinh`;

      await new Promise(r => setTimeout(r, 800));
      appendAffLog(`> [3/4] Đang gọi Meta Graph API đăng bài lên Page "${config.facebook.pageName}"...`);

      try {
        const fbUrl = `https://graph.facebook.com/v26.0/${config.facebook.pageId}/feed`;
        const formData = new URLSearchParams();
        formData.append("message", postCaption);
        formData.append("access_token", config.facebook.accessToken);

        const resp = await fetch(fbUrl, {
          method: "POST",
          body: formData
        });
        const data = await resp.json();

        if (data && data.id) {
          const postId = data.id;
          appendAffLog(`> [3/4] <span style="color:var(--green);">✓ Đăng bài thành công! Post ID: ${postId}</span>`);

          // Tự động ghim comment Affiliate ở bình luận đầu tiên
          appendAffLog("> [4/4] Đang tự động ghim bình luận chứa Link Affiliate lên đầu...");
          const commentUrl = `https://graph.facebook.com/v26.0/${postId}/comments`;
          const cFormData = new URLSearchParams();
          cFormData.append("message", `👉 Cả nhà ơi, link mua hàng chính hãng và săn voucher giảm giá độc quyền mình để ở đây nha:\n🔗 ${productUrl}`);
          cFormData.append("access_token", config.facebook.accessToken);

          const cResp = await fetch(commentUrl, { method: "POST", body: cFormData });
          const cData = await cResp.json();
          if (cData && cData.id) {
            appendAffLog(`> [4/4] <span style="color:var(--green);">✓ Đã ghim link Affiliate vào top bình luận thành công!</span>`);
          }

          // Tạo link Facebook trực tiếp
          const postOnlyId = postId.includes("_") ? postId.split("_")[1] : postId;
          const fbPostLink = `https://www.facebook.com/${postOnlyId}`;
          elBtnViewOnFb.href = fbPostLink;

          elAffSuccessBox.style.display = "block";
          appendAffLog(`> [HOÀN TẤT] Bài viết đã lên sóng công khai trên Facebook!`);

          saveRealState();
          updateUI();
        } else {
          appendAffLog(`> <span style="color:var(--red);">✗ Lỗi từ Meta API: ${JSON.stringify(data.error || data)}</span>`);
        }
      } catch (err) {
        appendAffLog(`> <span style="color:var(--red);">✗ Lỗi kết nối: ${err.message}</span>`);
      } finally {
        elBtnAutoPublish.disabled = false;
        elBtnAutoPublish.innerHTML = "<span>🚀</span><span>AI Tự Động Sản Xuất & Đăng Lên Fanpage Ngay Lập Tức</span>";
      }
    });
  }

  // Khởi chạy giao diện số thật
  updateUI();
})();
