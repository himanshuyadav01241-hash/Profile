/*==============================
INSANE HR
script.js
==============================*/

// Loader
window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

setTimeout(()=>{

if(loader) loader.style.display="none";

},1200);

});

/*==============================
CLOCK
==============================*/

const clock=document.getElementById("clock");

function updateClock(){

const d=new Date();

clock.innerHTML=d.toLocaleTimeString();

}

setInterval(updateClock,1000);

updateClock();

/*==============================
THEME
==============================*/

const body=document.body;

const theme=document.getElementById("themeButton");

const saved=localStorage.getItem("theme");

if(saved){

body.className=saved;

}

theme.onclick=()=>{

body.classList.toggle("red");

localStorage.setItem("theme",body.className);

};

/*==============================
CUSTOM CURSOR
==============================*/

const c1=document.getElementById("cursor");

const c2=document.getElementById("cursor2");

document.addEventListener("mousemove",e=>{

if(c1){

c1.style.left=e.clientX+"px";

c1.style.top=e.clientY+"px";

}

setTimeout(()=>{

if(c2){

c2.style.left=e.clientX+"px";

c2.style.top=e.clientY+"px";

}

},80);

});

/*==============================
PARTICLES
==============================*/

const particleBox=document.getElementById("particles");

if(particleBox){

for(let i=0;i<40;i++){

const p=document.createElement("span");

p.className="particle";

p.style.left=Math.random()*100+"%";

p.style.animationDuration=5+Math.random()*8+"s";

p.style.animationDelay=Math.random()*5+"s";

particleBox.appendChild(p);

}

}

/*==============================
MUSIC PLAYER
==============================*/

const audio=document.getElementById("audio");

const play=document.getElementById("play");

const prev=document.getElementById("prev");

const next=document.getElementById("next");

const title=document.getElementById("songTitle");

const bar=document.querySelector(".bar");

const disc=document.querySelector(".music-player");

let index=0;

function loadSong(){

audio.src=playlist[index].src;

title.innerHTML=playlist[index].title;

}

loadSong();

play.onclick=()=>{

if(audio.paused){

audio.play();

play.innerHTML='<i class="fa-solid fa-pause"></i>';

disc.classList.add("playing");

}else{

audio.pause();

play.innerHTML='<i class="fa-solid fa-play"></i>';

disc.classList.remove("playing");

}

};

next.onclick=()=>{

index=(index+1)%playlist.length;

loadSong();

audio.play();

play.innerHTML='<i class="fa-solid fa-pause"></i>';

disc.classList.add("playing");

};

prev.onclick=()=>{

index=(index-1+playlist.length)%playlist.length;

loadSong();

audio.play();

play.innerHTML='<i class="fa-solid fa-pause"></i>';

disc.classList.add("playing");

};

audio.addEventListener("ended",()=>{

next.click();

});

audio.addEventListener("timeupdate",()=>{

if(audio.duration){

bar.style.width=(audio.currentTime/audio.duration)*100+"%";

}

});

/*==============================
COPY IDs
==============================*/

document.querySelectorAll("[data-copy]").forEach(btn=>{

btn.onclick=()=>{

navigator.clipboard.writeText(btn.dataset.copy);

const toast=document.getElementById("toast");

if(toast){

toast.style.opacity="1";

toast.style.bottom="30px";

setTimeout(()=>{

toast.style.opacity="0";

toast.style.bottom="-80px";

},1800);

}

};

});

/*==============================
TOP BUTTON
==============================*/

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/*==============================
REVEAL ANIMATION
==============================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll("section,.social-card,.spec,.game-card,.about-card").forEach(el=>{

observer.observe(el);

});

/*==============================
KONAMI EASTER EGG
==============================*/

const code=[];

const secret=[
"ArrowUp",
"ArrowUp",
"ArrowDown",
"ArrowDown",
"ArrowLeft",
"ArrowRight",
"ArrowLeft",
"ArrowRight",
"b",
"a"
];

document.addEventListener("keydown",e=>{

code.push(e.key);

code.splice(-secret.length-1,code.length-secret.length);

if(code.join("")===secret.join("")){

const egg=document.getElementById("easterEgg");

if(egg){

egg.style.display="block";

setTimeout(()=>{

egg.style.display="none";

},3000);

}

}

});

/*==============================
PARALLAX
==============================*/

window.addEventListener("mousemove",e=>{

const x=(e.clientX/window.innerWidth-.5)*25;

const y=(e.clientY/window.innerHeight-.5)*25;

document.querySelectorAll(".glow").forEach(g=>{

g.style.transform=`translate(${x}px,${y}px)`;

});

});

/*==============================
PREVENT DRAG IMAGE
==============================*/

document.querySelectorAll("img").forEach(img=>{

img.draggable=false;

});

console.log("🔥 INSANE HR Loaded");