# -*- coding: utf-8 -*-
"""
QUY TRÌNH TỰ ĐỘNG HOÀN CHỈNH:
DÁN LINK ➡️ TỰ TẢI VIDEO VỀ ➡️ TỰ ĐĂNG LÊN FANPAGE ➡️ TỰ GẮN LINK AFFILIATE
"""
import os
import sys
import media_downloader
import fb_api
import config

def process_and_publish(source_video_url, affiliate_link, product_name):
    """
    Quy trình 4 bước tự động:
    1. Tự truy cập link và tải video về máy
    2. Viết caption và hashtag chuẩn viral
    3. Đăng video lên Fanpage "Adorable Daughter"
    4. Tự động comment link Affiliate ghim đầu
    """
    print("\n" + "="*60)
    print("🚀 BẮT ĐẦU QUY TRÌNH TỰ ĐỘNG HÓA NỘI DUNG AFFILIATE")
    print("="*60)
    print(f"📌 Sản phẩm: {product_name}")
    print(f"🔗 Nguồn video: {source_video_url}")
    print(f"💰 Link Affiliate của bạn: {affiliate_link}")

    # Bước 1: Tải video về máy
    temp_video = os.path.join(os.path.dirname(__file__), "temp_product_video.mp4")
    if os.path.exists(temp_video):
        os.remove(temp_video)

    video_path = media_downloader.download_video_from_url(source_video_url, temp_video)
    if not video_path or not os.path.exists(video_path):
        print("❌ Không thể tải video từ link này. Vui lòng kiểm tra lại đường link!")
        return False

    # Bước 2: Chuẩn bị nội dung đăng bài
    title = f"Review {product_name} Siêu Tiện Ích · Adorable Daughter"
    caption = (
        f"✨ GỢI Ý MÓN ĐỒ SIÊU TIỆN LỢI CHO GIA ĐÌNH ✨\n\n"
        f"Em {product_name} này dùng mê thực sự cả nhà ơi! Tiện lợi, bền đẹp mà giá đợt này đang có sale lớn nha.\n\n"
        f"👉 Cả nhà bấm xem link mua chính hãng và nhận mã giảm giá ở phần BÌNH LUẬN ĐẦU TIÊN nhé! ❤️\n\n"
        f"#AdorableDaughter #Review #GiaDungThongMinh #MeoHay #TikTokShop #Shopee"
    )

    # Bước 3: Đăng video lên Facebook Fanpage
    print("\n📤 Đang tải video lên Fanpage Adorable Daughter qua Meta Graph API...")
    res = fb_api.post_video(video_path, title, caption)

    video_id = res.get("id")
    if not video_id:
        print(f"❌ Lỗi đăng video: {res}")
        return False

    print(f"✅ ĐÃ ĐĂNG VIDEO THÀNH CÔNG! Video ID: {video_id}")

    # Bước 4: Tự động ghim link Affiliate vào bình luận
    print("📌 Đang tự động ghim bình luận chứa Link Affiliate lên đầu...")
    comment_msg = (
        f"👉 Link mua hàng chính hãng và săn voucher giảm giá độc quyền ở đây nha cả nhà:\n"
        f"🔗 {affiliate_link}"
    )
    c_res = fb_api.comment_post(video_id, comment_msg)
    if "id" in c_res:
        print(f"✅ ĐÃ GHIM LINK AFFILIATE THÀNH CÔNG!")
    else:
        print(f"⚠️ Chưa ghim được bình luận: {c_res}")

    # Dọn dẹp file tạm
    if os.path.exists(temp_video):
        try:
            os.remove(temp_video)
        except Exception:
            pass

    print("\n🎉 HOÀN TẤT 100%! BẠN CÓ THỂ MỞ FACEBOOK ĐỂ KIỂM TRA BÀI VIẾT VỪA ĐĂNG.")
    return True

if __name__ == "__main__":
    if len(sys.argv) >= 3:
        source_url = sys.argv[1]
        aff_url = sys.argv[2]
        prod_name = sys.argv[3] if len(sys.argv) > 3 else "Sản phẩm tiện ích"
        process_and_publish(source_url, aff_url, prod_name)
    else:
        print("💡 CÁCH DÙNG TỰ ĐỘNG:")
        source = input("1. Dán link video (TikTok / Shopee / YouTube Shorts): ").strip()
        aff = input("2. Dán link Affiliate của bạn (Shopee / TikTok Shop): ").strip() or config.DEFAULT_AFFILIATE_LINK
        name = input("3. Nhập tên sản phẩm: ").strip() or "Món đồ tiện ích"
        process_and_publish(source, aff, name)
