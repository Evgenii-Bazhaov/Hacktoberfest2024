from pytube import YouTube as yt, Playlist as pl

try:

    def get_playlist_length(playlist):
        length = 0
        for video in playlist.videos:
            length += video.length
        return length

    def print_playlist_stats(playlist):
        number = len(playlist.videos)
        length_minutes = round(get_playlist_length(playlist) / 60, 2)
        length_hours = round(get_playlist_length(playlist) / 3600, 2)
        print("Number of videos in the playlist:", number)
        print("Total length of the playlist:", length_minutes, "minutes")
        print("Total length of the playlist:", length_hours, "hours")

    def print_completion_time(length, freew):
        if length <= freew * 3600:
            print("You can complete the playlist in under a day")
        elif length <= freew * 3600 * 24:
            print("You can complete the playlist in approximately a day")
        elif length <= freew * 3600 * 24 * 7:
            print("You can complete the playlist in a week")
        elif length <= freew * 3600 * 24 * 2:
            print("You can complete the playlist in 2 days")
        elif length <= freew * 3600 * 24 * 3:
            print("You can complete the playlist in 3 days")
        elif length <= freew * 3600 * 24 * 4:
            print("You can complete the playlist in 4 days")
        else:
            print("You can complete the playlist in more than 4 days")

    def print_video_stats(video):
        length_minutes = video.length // 60
        length_seconds = video.length % 60
        print("Title of the video:", video.title)
        print("Number of views:", video.views)
        print("Length of the video:", length_minutes, "minutes", length_seconds, "seconds")
        print("Rating of the video:", video.rating)
        print("Description of the video:", video.description)

    def download_playlist(playlist):
        for video in playlist.videos:
            video.streams.get_highest_resolution().download()
        print("Playlist downloaded successfully!")

    def download_video(video):
        video.streams.get_highest_resolution().download()
        print("Video downloaded successfully!")

    print("Welcome to vidtime!")
    print("Choose an option:")
    print("1. Playlist")
    print("2. Video")
    option = int(input("Enter your choice (1 or 2): "))

    if option == 1:
        playlist_link = input("Enter the playlist link (with https:// format): ")
        playlist = pl(playlist_link)
        print_playlist_stats(playlist)
        free = int(input("How many hours can you dedicate for learning in a day? "))
        freew = free * 7
        length = get_playlist_length(playlist)
        print_completion_time(length, freew)

        print("Do you want to download the playlist? (y/n)")
        if input() == 'y':
            download_playlist(playlist)
        else:
            print("Goodbye!")

    elif option == 2:
        video_link = input("Enter the video link (with https:// format): ")
        video = yt(video_link)
        print_video_stats(video)

        print("Do you want to download the video? (y/n)")
        if input() == 'y':
            download_video(video)
        else:
            print("Goodbye!")

    else:
        print("Invalid option. Goodbye!")

    print("Thank you for using vidtime")

except Exception as e:
    print("An error occurred:", str(e))