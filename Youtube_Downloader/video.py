import pytube
link=input("Enter the url of the video you want to download")
video=pytube.YouTube(link)
# stream=video_instance.streams.get_highest_resolution()
# stream=video_instance.streams.filter(res="1080p").first().download()
stream=video.streams.filter(res="720p").first().download()
stream.download()

# video = YouTube('mylink')
# highresvid = video.streams.get_highest_resolution()
# highresvid.download('location')
