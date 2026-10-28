# -*- coding: utf-8 -*-
"""
Trình Tự Động Cào & Tải Video từ TikTok / Shopee / YouTube Shorts
"""
import os
import re
import requests
import yt_dlp

def download_video_from_url(url, output_path="downloaded_product.mp4"):
    """
    Tự động nhận diện và tải video chất lượng cao từ link:
    - Hỗ trợ TikTok (tự xóa watermark)
    - Hỗ trợ Shopee (lấy video sản phẩm)
    - Hỗ trợ Facebook / YouTube Shorts / Douyin
    """
    print(f"🌐 Đang truy cập vào đường link: {url}...")

    # Xử lý nếu là link Shopee
    if "shopee.vn" in url:
        return download_shopee_video(url, output_path)

    # Xử lý các link video khác (TikTok, YouTube, FB...) bằng yt-dlp
    ydl_opts = {
        'outtmpl': output_path,
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        'quiet': False,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print("📥 Đang tải video gốc độ phân giải cao...")
            ydl.download([url])
            if os.path.exists(output_path):
                print(f"✅ Đã tải video thành công về: {output_path}")
                return output_path
    except Exception as e:
        print(f"⚠️ yt-dlp gặp lỗi: {e}")

    return None

def download_shopee_video(shopee_url, output_path="downloaded_product.mp4"):
    """Cào video trực tiếp từ Shopee API"""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    # Bóc tách itemid và shopid từ URL Shopee
    # Format: i.{shopid}.{itemid} hoặc product/{shopid}/{itemid}
    shop_id, item_id = None, None
    m1 = re.search(r'i\.(\d+)\.(\d+)', shopee_url)
    m2 = re.search(r'product/(\d+)/(\d+)', shopee_url)

    if m1:
        shop_id, item_id = m1.group(1), m1.group(2)
    elif m2:
        shop_id, item_id = m2.group(1), m2.group(2)

    if not shop_id or not item_id:
        print("⚠️ Không bóc tách được mã sản phẩm Shopee, đang thử lấy video bằng trình tải đa năng...")
        try:
            with yt_dlp.YoutubeDL({'outtmpl': output_path, 'quiet': True}) as ydl:
                ydl.download([shopee_url])
                if os.path.exists(output_path):
                    return output_path
        except Exception:
            return None

    # Gọi API chi tiết sản phẩm của Shopee
    api_url = f"https://shopee.vn/api/v4/item/get?itemid={item_id}&shopid={shop_id}"
    try:
        r = requests.get(api_url, headers=headers).json()
        item_data = r.get("data", {})
        video_list = item_data.get("video_info_list", [])

        if video_list and len(video_list) > 0:
            video_cdn_url = video_list[0].get("default", {}).get("url")
            if video_cdn_url:
                print(f"📥 Tìm thấy video sản phẩm Shopee! Đang tải...")
                v_res = requests.get(video_cdn_url, headers=headers, stream=True)
                with open(output_path, "wb") as f:
                    for chunk in v_res.iter_content(chunk_size=8192):
                        f.write(chunk)
                print(f"✅ Tải video Shopee thành công: {output_path}")
                return output_path
    except Exception as e:
        print(f"⚠️ Lỗi cào Shopee: {e}")

    return None

if __name__ == "__main__":
    # Test thử
    test_link = "https://www.tiktok.com/@tiktok/video/7187428807983156526"
    download_video_from_url(test_link, "test_down.mp4")
