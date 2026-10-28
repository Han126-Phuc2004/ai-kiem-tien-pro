# -*- coding: utf-8 -*-
"""
Thư viện kết nối Meta Graph API cho Page Adorable Daughter
"""
import requests
import os
import config

BASE_URL = "https://graph.facebook.com/v26.0"

def get_page_info():
    """Kiểm tra thông tin Trang"""
    url = f"{BASE_URL}/{config.PAGE_ID}"
    params = {
        "fields": "id,name,link,followers_count",
        "access_token": config.PAGE_ACCESS_TOKEN
    }
    r = requests.get(url, params=params)
    return r.json()

def post_text(message):
    """Đăng bài viết văn bản lên Page"""
    url = f"{BASE_URL}/{config.PAGE_ID}/feed"
    payload = {
        "message": message,
        "access_token": config.PAGE_ACCESS_TOKEN
    }
    r = requests.post(url, data=payload)
    return r.json()

def post_photo(image_path, caption):
    """Đăng bài viết kèm hình ảnh"""
    url = f"{BASE_URL}/{config.PAGE_ID}/photos"
    data = {
        "caption": caption,
        "access_token": config.PAGE_ACCESS_TOKEN
    }
    with open(image_path, "rb") as img_file:
        files = {"source": img_file}
        r = requests.post(url, data=data, files=files)
    return r.json()

def post_video(video_path, title, description):
    """Đăng Video / Reels lên Page"""
    url = f"{BASE_URL}/{config.PAGE_ID}/videos"
    data = {
        "title": title,
        "description": description,
        "access_token": config.PAGE_ACCESS_TOKEN
    }
    with open(video_path, "rb") as vid_file:
        files = {"source": vid_file}
        r = requests.post(url, data=data, files=files)
    return r.json()

def comment_post(post_id, comment_text):
    """Bình luận vào bài viết (Dùng để ghim link Affiliate ở top bình luận)"""
    url = f"{BASE_URL}/{post_id}/comments"
    payload = {
        "message": comment_text,
        "access_token": config.PAGE_ACCESS_TOKEN
    }
    r = requests.post(url, data=payload)
    return r.json()

def get_post_comments(post_id):
    """Lấy danh sách bình luận trên một bài viết"""
    url = f"{BASE_URL}/{post_id}/comments"
    params = {
        "fields": "id,from,message,created_time",
        "access_token": config.PAGE_ACCESS_TOKEN
    }
    r = requests.get(url, params=params)
    return r.json()

def reply_comment(comment_id, message):
    """Tự động trả lời một bình luận của khách"""
    url = f"{BASE_URL}/{comment_id}/comments"
    payload = {
        "message": message,
        "access_token": config.PAGE_ACCESS_TOKEN
    }
    r = requests.post(url, data=payload)
    return r.json()

def update_post(post_id, message):
    """Cập nhật nội dung bài viết hoặc video"""
    url = f"{BASE_URL}/{post_id}"
    payload = {
        "description": message,
        "message": message,
        "access_token": config.PAGE_ACCESS_TOKEN
    }
    r = requests.post(url, data=payload)
    return r.json()
