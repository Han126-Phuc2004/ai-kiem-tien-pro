# -*- coding: utf-8 -*-
"""
Bot tự động quét và trả lời bình luận của khách hàng kèm Link Affiliate
"""
import json
import os
import fb_api
import config

DB_FILE = os.path.join(os.path.dirname(__file__), "replied_comments.json")

def load_replied_ids():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def save_replied_ids(ids):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(ids, f, ensure_ascii=False, indent=2)

def generate_smart_reply(comment_text):
    """Phân tích nội dung bình luận để đưa ra câu trả lời phù hợp nhất"""
    text = comment_text.lower()

    if any(k in text for k in ["xin link", "link", "mua ở đâu", "mua dau", "shop", "giá", "gia bao nhieu", "bao nhieu"]):
        return (
            f"Dạ chào bạn ạ! Món này mình có để link mua chính hãng kèm mã giảm giá độc quyền ở đây nè: "
            f"{config.DEFAULT_AFFILIATE_LINK} - Bạn bấm vào xem chi tiết nha!"
        )
    elif any(k in text for k in ["chất lượng", "dùng tốt không", "review", "ổn không"]):
        return (
            f"Dạ món này xài cực kỳ ưng luôn bạn ơi! Thông số chi tiết và đánh giá mình để ở link này nha: "
            f"{config.DEFAULT_AFFILIATE_LINK}"
        )
    else:
        return (
            "Dạ cảm ơn bạn đã quan tâm và theo dõi Adorable Daughter nha! "
            "Chúc bạn và gia đình một ngày thật nhiều niềm vui ạ! ❤️"
        )

def run_comment_check():
    """Quét các bài viết gần nhất và tự động trả lời bình luận mới"""
    replied = load_replied_ids()

    # Lấy danh sách bài viết gần nhất của Page
    url = f"{fb_api.BASE_URL}/{config.PAGE_ID}/feed"
    res = fb_api.requests.get(url, params={"access_token": config.PAGE_ACCESS_TOKEN, "limit": 5}).json()
    posts = res.get("data", [])

    print(f"🔍 Đang kiểm tra bình luận trên {len(posts)} bài viết gần nhất...")

    new_replies_count = 0
    for post in posts:
        post_id = post.get("id")
        comments_data = fb_api.get_post_comments(post_id)
        comments = comments_data.get("data", [])

        for c in comments:
            c_id = c.get("id")
            c_msg = c.get("message", "")
            c_from = c.get("from", {}).get("name", "Khách")

            # Bỏ qua nếu đã trả lời rồi hoặc bình luận của chính Page
            if c_id in replied or config.PAGE_ID in c.get("from", {}).get("id", ""):
                continue

            print(f"💬 Phát hiện cmt mới từ {c_from}: '{c_msg}'")
            reply_text = generate_smart_reply(c_msg)
            
            # Gửi câu trả lời
            res = fb_api.reply_comment(c_id, reply_text)
            if "id" in res:
                print(f"✅ Đã trả lời comment {c_id}: {reply_text}")
                replied.append(c_id)
                new_replies_count += 1
            else:
                print(f"⚠️ Lỗi trả lời: {res}")

    save_replied_ids(replied)
    print(f"🎉 Hoàn tất quét! Đã trả lời {new_replies_count} bình luận mới.")

if __name__ == "__main__":
    run_comment_check()
