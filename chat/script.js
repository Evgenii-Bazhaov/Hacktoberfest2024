const artists = [
    {name: 'Arijit Singh', id: 1, imageUrl: 'https://www.suntiros.com/wp-content/uploads/2018/05/Arijit-Singh-Latest-Style-Images-Download-2.jpg'},
    {name: 'KK', id: 2, imageUrl: 'https://i.scdn.co/image/9b9643ab7444d6184d1b33e534cacc15c1e44186'},
    {name: 'Vile', id: 3, imageUrl: 'https://i.pinimg.com/originals/4a/28/48/4a284821225a241c4470b7bc5e5b0430.jpg'},
    {name: 'Pritam', id: 4, imageUrl: 'https://th.bing.com/th/id/OIP.Dd-zqplDFZnCcIoKc1NAywHaF7?w=249&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7'},
    {name: 'Honey Singh', id: 5, imageUrl: 'https://th.bing.com/th/id/OIP.Dd-zqplDFZnCcIoKc1NAywHaF7?w=249&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7'}
];

const musicList = [
    {title: 'Sajni by Arijit Singh', artistId: 1, url:'https://open.spotify.com/embed/track/4gU4FIc5N5nqg6W29LwXIs?si=83b4f693b90341aa'},
    {title: 'Satranga by Arijit Singh', artistId: 1, url:'https://open.spotify.com/embed/track/3yHyiUDJdz02FZ6jfUbsmY?si=2b5ab91f4f474717'},
    {title: 'Heeriye by Arijit Singh', artistId: 1, url:'https://open.spotify.com/embed/track/5PUXKVVVQ74C3gl5vKy9Li?si=d9cbb0f6eed84d3c'},
    {title: 'Dil Jhoom by Arijit Singh', artistId: 1, url:'https://open.spotify.com/embed/track/11qnwt18ZckPqchzK2I3U7?si=1b3e06e04b3b4400'},
    {title: 'Chaleya by Arijit Singh', artistId: 1, url:'https://open.spotify.com/embed/track/4nc6XiUze2Yh7wFueGOPv7?si=68f51445d5a54509'},
    {title: 'Soni Soni by Darshan Raval', artistId: 1, url: 'https://open.spotify.com/embed/track/36N5awamOX6XX5pQn3aFXZ?si=8ca3a98367fb4fd3' },
    {title: 'Soulmate by Arijit Singh', artistId: 2, url: 'https://open.spotify.com/embed/track/1tf2iody5iRLYYPDSBpzRc?si=226589226bfc4829' },
    {title: 'Satranga by Arijit Singh', artistId: 2, url: 'https://open.spotify.com/embed/track/3yHyiUDJdz02FZ6jfUbsmY?si=f81dab5f0d014fec' },
    {title: 'Chaleya by Arijit Singh', artistId: 2, url: 'https://open.spotify.com/embed/track/3xMHXmedL5Rvfxmiar9Ryv?si=beeffb896c9045c9' },
    {title: 'O Maahi by Arijit Singh', artistId: 2, url: 'https://open.spotify.com/embed/track/6bmmHeCvZI92pRiTHxEdTC?si=60051d5d9a864b97' },
    {title: 'Sajni by Arijit Singh', artistId: 2, url: 'https://open.spotify.com/embed/track/5zCnGtCl5Ac5zlFHXaZmhy?si=326135aa8b5c4ad4' },
    {title: 'Apna Bana Le by Arijit Singh', artistId: 2, url: 'https://open.spotify.com/embed/track/5bQ6oDLqvw8tywmnSmwEyL?si=3de3ca12b2924a9f' },
    {title: 'Raatan Lambiyaan by Jubin Nautiyal', artistId: 3, url: 'https://open.spotify.com/embed/track/2rOnSn2piaqLAlYjtfUBlY?si=574b30b0f58b430a' },
    {title: 'Agar Tum Ho by Jubin Nautiyal', artistId: 3, url: 'https://open.spotify.com/embed/track/2JS0RFqBJvBtvG1GIsZmjW?si=72e462b6e810483d' },
    {title: 'Humnawa Mere by Jubin Nautiyal', artistId: 3, url: 'https://open.spotify.com/embed/track/0loZn1c5heXie7OAtvK6nH?si=401d2902c0f44efb' },
    {title: 'Tum Hi Aana by Jubin Nautiyal', artistId: 3, url: 'https://open.spotify.com/embed/track/6E9UwSfT80age2xknoMS7Y?si=46caa90e35d749af' },
    {title: 'Manike by Jubin Nautiyal', artistId: 3, url: 'https://open.spotify.com/embed/track/0zlGnseLGzRIBA0TJcb3Bo?si=a137c7b2814e4e15' },
    {title: 'Gazab Ka Hai Din by Jubin Nautiyal', artistId: 3, url: 'https://open.spotify.com/embed/track/4byiHL0b9mIoCUCjbjI4eA?si=8674eae1ead04418' },
    {title: 'Lambi Judaai by Pritam', artistId: 4, url: 'https://open.spotify.com/embed/track/3mFDF0ulC4tyOFC4bB67Kd?si=8e5a928014104f8f' },
    {title: 'Jannat Jahan by Pritam', artistId: 4, url: 'https://open.spotify.com/embed/track/39laDigENmKNlT94cnLWwr?si=8702ace460914653' },
    {title: 'Door Na Jaa by Pritam', artistId: 4, url: 'https://open.spotify.com/embed/track/7jTGX0RfaO4iEVlHHChxM1?si=2b9e258c809c4f19' },
    {title: 'Kya Mujhe Pyar Hai by Pritam', artistId: 4, url: 'https://open.spotify.com/embed/track/5X9xwTj0pTQjbz8W6GR83w?si=20e14e5668b9445d' },
    {title: 'Apna Bana Le by Pritam', artistId: 4, url: 'https://open.spotify.com/embed/track/5URr1pFCn0cQfy5VbAzexx?si=b3a0e7ff5d514bd5' },
    {title: 'Ae Dil Hai Mushkil by Pritam', artistId: 4, url: 'https://open.spotify.com/embed/track/7BPPgKuemUmkfuT8LrL4Cf?si=25bcab9c6c824a64' },
    {title: 'Brown Rang by Honey Singh', artistId: 5, url: 'https://open.spotify.com/embed/track/3FCUBl6S4lQCV7DQQE3G0I?si=bb07a4bc10094889' },
    {title: 'One Bottle Down by Honey Singh', artistId: 5, url: 'https://open.spotify.com/embed/track/0ZKIxHaGpHmAvArhfNLgHp?si=93895d9f3aa94ec3' },
    {title: 'Desi Kalakaar by Honey Singh', artistId: 5, url: 'https://open.spotify.com/embed/track/2MyF14dsb2yTafkHsJExUp?si=b47f8fe758a64e28' },
    {title: 'High Heels by Honey Singh', artistId: 5, url: 'https://open.spotify.com/embed/track/6LxSoMwwdcIb9HfDuqnXOt?si=004120ab7b8f429a' },
    {title: 'Dheere Dheere Se by Honey Singh', artistId: 5, url: 'https://open.spotify.com/embed/track/1xK9Xvfm3RYXpgYhYR8LWR?si=bd67db9b308e4a2a' },
    {title: 'Break Up Party by Honey Singh', artistId: 5, url: 'https://open.spotify.com/embed/track/5f6DlbCsSOvaHRlF4EJbiA?si=5094b5f32c1642e7' }
];

function renderArtists() {
    const artistContainer = document.getElementById('artists');
    artistContainer.innerHTML = ''; // Clear previous artist elements
    artists.forEach(artist => {
        const artistElement = document.createElement('div');
        artistElement.classList.add('artist-circle');
        artistElement.dataset.artistId = artist.id;
        artistElement.innerHTML = `<img src="${artist.imageUrl}" alt="${artist.name}">`;
        artistElement.addEventListener('click', () => selectArtist(artist.id));
        artistContainer.appendChild(artistElement);
    });
}

function renderMusicList(artistId) {
    const musicContainer = document.getElementById('music-list');
    musicContainer.innerHTML = ''; // Clear previous music items
    musicList.filter(music => music.artistId === artistId).forEach(music => {
        const musicElement = document.createElement('div');
        musicElement.classList.add('music-item');
        musicElement.textContent = music.title;
        musicElement.addEventListener('click', () => playMusic(music.url));
        musicContainer.appendChild(musicElement);
    });
}

function selectArtist(artistId) {
    document.querySelectorAll('.artist-circle').forEach(element => {
        element.classList.remove('selected');
    });
    document.querySelector(`.artist-circle[data-artist-id="${artistId}"]`).classList.add('selected');
    renderMusicList(artistId);
}

function playMusic(url) {
    const player = document.getElementById('player');
    player.innerHTML = `<iframe src="${url}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
}

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(query));
    const artistContainer = document.getElementById('artists');
    artistContainer.innerHTML = ''; // Clear previous artist elements
    filteredArtists.forEach(artist => {
        const artistElement = document.createElement('div');
        artistElement.classList.add('artist-circle');
        artistElement.dataset.artistId = artist.id;
        artistElement.innerHTML = `<img src="${artist.imageUrl}" alt="${artist.name}">`;
        artistElement.addEventListener('click', () => selectArtist(artist.id));
        artistContainer.appendChild(artistElement);
    });
});

// Initial rendering
renderArtists();