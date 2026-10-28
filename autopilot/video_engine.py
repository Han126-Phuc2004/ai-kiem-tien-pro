# -*- coding: utf-8 -*-
"""
Bộ máy sản xuất video tự động bằng Edge-TTS + FFmpeg
"""
import os
import asyncio
import subprocess
import edge_tts
import config

async def generate_voice(text, output_audio_path, voice=config.VOICE_NAME):
    """Tạo file giọng đọc AI tiếng Việt từ kịch bản"""
    communicate = edge_tts.Communicate(text, voice=voice)
    await communicate.save(output_audio_path)
    return output_audio_path

def create_reels_video(script_text, output_video_path, title="Mẹo Hay Mỗi Ngày"):
    """
    Tự động dựng 1 video Reels hoàn chỉnh:
    - Tạo giọng đọc AI
    - Render video dọc 1080x1920 (Chuẩn tỷ lệ 9:16)
    - Tự động đồng bộ độ dài video theo độ dài giọng đọc
    """
    temp_dir = os.path.dirname(output_video_path)
    audio_path = os.path.join(temp_dir, "temp_voice.mp3")

    print(f"🎙️ Đang tạo giọng đọc AI tiếng Việt ({config.VOICE_NAME})...")
    asyncio.run(generate_voice(script_text, audio_path))

    print("🎬 Đang render video Reels độ phân giải 1080x1920 bằng FFmpeg...")
    
    # Lệnh FFmpeg tạo video dọc có background màu gradient công nghệ, ghép audio
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "color=c=0x0f172a:s=1080x1920",
        "-i", audio_path,
        "-c:v", "libx264", "-tune", "stillimage",
        "-c:a", "aac", "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        "-shortest",
        output_video_path
    ]

    subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    if os.path.exists(audio_path):
        os.remove(audio_path)

    print(f"✅ Video hoàn thành: {output_video_path}")
    return output_video_path

if __name__ == "__main__":
    sample_script = "Chào mừng mọi người đến với kênh Adorable Daughter. Hôm nay mình sẽ mách cho các mẹ một bí quyết chăm sóc gia đình siêu tiện lợi nhé!"
    out = os.path.join(os.path.dirname(__file__), "sample_reels.mp4")
    create_reels_video(sample_script, out)
