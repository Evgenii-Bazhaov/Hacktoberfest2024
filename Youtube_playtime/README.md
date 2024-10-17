# 🎬 Vidtime - YouTube Playlist & Video Downloader 📥

Welcome to **Vidtime**, a simple Python CLI tool that allows you to download YouTube videos and playlists effortlessly! You can also get detailed statistics about videos and playlists, including completion times based on your daily available hours.

## 🚀 Features

- Download individual YouTube videos or entire playlists in the highest resolution.
- View detailed statistics about videos and playlists (length, views, rating, etc.).
- Calculate how long it will take to complete a playlist based on your daily learning hours.
- Super simple command-line interface (CLI).

## 🛠 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/vidtime-downloader.git
   cd vidtime-downloader
   ```

2. Install the required dependencies using the provided `requirements.txt` file:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the downloader:
   ```bash
   python downloader.py
   ```

## 📋 Usage

1. **Video Download:**
   - Select **Option 2** in the CLI.
   - Enter the YouTube video URL.
   - View the video stats.
   - Optionally, download the video.

2. **Playlist Download:**
   - Select **Option 1** in the CLI.
   - Enter the playlist URL.
   - View playlist stats including the number of videos and total length.
   - Calculate completion time based on your daily learning hours.
   - Optionally, download the entire playlist.

3. **Completion Time Estimator:**
   - After providing your daily learning hours, Vidtime estimates how long it will take you to finish the playlist.

## Example

To download a playlist:

```bash
python downloader.py
```

- Enter the playlist link.
- View stats and completion time estimate.
- Choose whether to download.

To download a video:

```bash
python downloader.py
```

- Enter the video link.
- View stats and choose whether to download.

## ⚙️ Requirements

- Python 3.x
- `pytube` (automatically installed via `requirements.txt`)

## 💡 License

This project is licensed under the MIT License. Feel free to fork and contribute!

---

Thank you for using **Vidtime**! 🎉
```