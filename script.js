console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let song = [
    {songName: "Love Me Like You Do", filePath: "song/1.mp3", coverPath: "cover/1.jpg"},
    {songName: "Thoda Thoda Pyaar", filePath: "song/2.mp3", coverPath: "cover/2.jpg"},
    {songName: "Ae Dil Hai Mushkil", filePath: "song/3.mp3", coverPath: "cover/3.jpg"},
    {songName: "Kesariyaa", filePath: "song/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "Let Me Love You", filePath: "song/5.mp3", coverPath: "cover/5.jpg"},
    {songName: "Cielo", filePath: "song/6.mp3", coverPath: "cover/6.jpg"},
    {songName: "DEAF KEV", filePath: "song/7.mp3", coverPath: "cover/7.jpg"},
    // {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    // {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    // {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = song[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = song[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('bi-pause-circle-fill');
        masterPlay.classList.add('bi-play-circle-fill');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('bi-pause-circle-fill');
        element.classList.add('bi-play-circle-fill');
    })
}
// const makeAllPause = ()=>{
//     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//         element.classList.remove('bi-play-circle-fill');
//         element.classList.add('bi-pause-circle-fill');
//     })
// }

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        audioElement.src = `song/${songIndex+1}.mp3`;
        masterSongName.innerText = song[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
        
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bi-play-circle-fill');
    masterPlay.classList.add('bi-pause-circle-fill');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bi-play-circle-fill');
    masterPlay.classList.add('bi-pause-circle-fill');
})