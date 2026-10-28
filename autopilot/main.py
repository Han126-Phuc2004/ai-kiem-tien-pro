# -*- coding: utf-8 -*-
"""
HỆ THỐNG ĐIỀU HÀNH TỰ ĐỘNG HÓA FANPAGE - ADORABLE DAUGHTER
"""
import os
import sys
import time
import fb_api
import video_engine
import auto_reply
import config

def menu():
    print("\n" + "="*60)
    print("🤖 HỆ THỐNG TỰ ĐỘNG HÓA FANPAGE: ADORABLE DAUGHTER")
    print("="*60)
    print("1. Kiểm tra kết nối Fanpage (Page Info)")
    print("2. Đăng bài viết + Tự ghim link Affiliate")
    print("3. [HOT] Dán Link (TikTok/Shopee) ➡️ Tự Cào/Tải Video ➡️ Đăng lên Page ➡️ Gắn Link")
    print("4. Tự AI sản xuất Video Reels (Edge-TTS giọng Hoài My) ➡️ Đăng lên Page")
    print("5. Quét và Tự động trả lời bình luận của khách hàng")
    print("6. Bật chế độ Tự Động Hóa 24/7 (Auto-pilot)")
    print("0. Thoát")
    print("="*60)

def main():
    while True:
        menu()
        choice = input("👉 Chọn tính năng (0-5): ").strip()

        if choice == "1":
            print("\n🔍 Đang kết nối tới Meta Graph API...")
            info = fb_api.get_page_info()
            if "id" in info:
                print(f"✅ Kết nối thành công!")
                print(f"   - Tên Fanpage: {info.get('name')}")
                print(f"   - Page ID:     {info.get('id')}")
                print(f"   - Người theo dõi: {info.get('followers_count')} người")
                print(f"   - Link Page:   {info.get('link')}")
            else:
                print(f"❌ Lỗi kết nối: {info}")

        elif choice == "2":
            content = input("\n📝 Nhập nội dung bài viết (Enter để dùng bài mẫu): ").strip()
            if not content:
                content = (
                    "✨ Chúc cả nhà một ngày mới tràn ngập năng lượng và niềm vui! ✨\n\n"
                    "Cùng theo dõi Adorable Daughter để cập nhật thêm nhiều mẹo hay và sản phẩm tiện ích mỗi ngày nhé! ❤️"
                )
            print("🚀 Đang đăng bài viết lên Fanpage...")
            res = fb_api.post_text(content)
            post_id = res.get("id")
            if post_id:
                print(f"✅ Đăng bài thành công! Post ID: {post_id}")
                print("📌 Đang tự động ghim bình luận chứa Link Tiếp Thị Liên Kết...")
                aff_comment = f"👉 Mọi người xem thêm thông tin và ưu đãi đặc quyền ở đây nhé: {config.DEFAULT_AFFILIATE_LINK}"
                c_res = fb_api.comment_post(post_id, aff_comment)
                print(f"✅ Đã ghim link Affiliate thành công!")
            else:
                print(f"❌ Lỗi đăng bài: {res}")

        elif choice == "3":
            print("\n📥 TỰ ĐỘNG CÀO VIDEO ➡️ ĐĂNG BÀI ➡️ GẮN LINK AFFILIATE")
            source_url = input("1. Dán link video cần cào (TikTok / Shopee / YouTube Shorts): ").strip()
            if not source_url:
                print("❌ Bạn chưa nhập link video!")
                continue
            aff_url = input(f"2. Nhập link Affiliate của bạn (Enter để dùng mặc định: {config.DEFAULT_AFFILIATE_LINK}): ").strip() or config.DEFAULT_AFFILIATE_LINK
            prod_name = input("3. Nhập tên sản phẩm (Ví dụ: Nồi chiên không dầu Lock&Lock): ").strip() or "Món đồ tiện ích"
            
            import auto_crawler_and_poster
            auto_crawler_and_poster.process_and_publish(source_url, aff_url, prod_name)

        elif choice == "4":
            print("\n🎬 Khởi động dây chuyền sản xuất Video Reels AI...")
            script = input("Nhập kịch bản video (Enter để dùng kịch bản mẫu): ").strip()
            if not script:
                script = (
                    "Chào mừng các bạn đến với Adorable Daughter! "
                    "Hôm nay mình sẽ mách cho các bạn 3 mẹo cực kỳ hữu ích giúp cuộc sống gia đình thảnh thơi hơn mỗi ngày. "
                    "Hãy bấm theo dõi kênh để không bỏ lỡ những video tiếp theo nhé!"
                )
            
            video_file = os.path.join(os.path.dirname(__file__), "reels_auto.mp4")
            video_engine.create_reels_video(script, video_file)

            upload_confirm = input("👉 Bạn có muốn đăng video này lên Fanpage ngay không? (y/n): ").strip().lower()
            if upload_confirm == "y":
                print("🚀 Đang tải video lên Fanpage...")
                title = "Mẹo Hay Mỗi Ngày · Adorable Daughter"
                desc = "Chia sẻ mẹo hay gia đình mỗi ngày. Bấm theo dõi kênh nhé! #AdorableDaughter #Reels #Viral"
                v_res = fb_api.post_video(video_file, title, desc)
                if "id" in v_res:
                    print(f"✅ Video đã được đăng lên Page! Video ID: {v_res.get('id')}")
                    fb_api.comment_post(v_res.get('id'), f"👉 Chi tiết và đồ dùng trong video: {config.DEFAULT_AFFILIATE_LINK}")
                    print("✅ Đã ghim link Affiliate thành công dưới Video!")
                else:
                    print(f"❌ Lỗi đăng video: {v_res}")

        elif choice == "5":
            print("\n🤖 Bắt đầu quét bình luận...")
            auto_reply.run_comment_check()

        elif choice == "6":
            print("\n🚀 CHẾ ĐỘ TỰ ĐỘNG HÓA 24/7 ĐANG CHẠY...")
            print("Hệ thống sẽ tự động quét và trả lời bình luận của khách mỗi 60 giây.")
            print("Nhấn Ctrl + C để dừng.")
            try:
                while True:
                    auto_reply.run_comment_check()
                    time.sleep(60)
            except KeyboardInterrupt:
                print("\n⏹️ Đã dừng chế độ tự động.")

        elif choice == "0":
            print("Tạm biệt!")
            break

if __name__ == "__main__":
    main()
