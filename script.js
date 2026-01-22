gsap.registerPlugin(ScrollTrigger);

const music = document.getElementById("bgMusic");

function startMusic() {
  music.volume = 0.25;
  music.play().catch(() => {});
  document.removeEventListener("click", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

// Mobile + Desktop support
document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

// Countdown
const target = new Date("Feb 14, 2026 00:00:00").getTime();
setInterval(()=>{
  const now = new Date().getTime();
  const d = target - now;
  document.getElementById("countdown").innerText =
    `⏳ ${Math.floor(d/86400000)} days to Valentine’s`;
},1000);

// Chat bubbles
gsap.to(".bubble",{opacity:1, stagger:0.6});

// Hearts canvas
const canvas=document.getElementById("hearts");
const ctx=canvas.getContext("2d");
canvas.width=innerWidth; canvas.height=innerHeight;
let hearts=[...Array(30)].map(()=>({
  x:Math.random()*canvas.width,
  y:Math.random()*canvas.height,
  s:Math.random()*20+10,
  v:Math.random()+0.5
}));

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hearts.forEach(h=>{
    ctx.font=`${h.s}px serif`;
    ctx.fillText("💖",h.x,h.y);
    h.y-=h.v;
    if(h.y<0) h.y=canvas.height;
  });
  requestAnimationFrame(draw);
}
draw();

// Candle mode
document.getElementById("candleToggle").onclick=()=>{
  document.body.classList.toggle("night");
};

// NO button chaos
const noBtn=document.getElementById("noBtn");
noBtn.onmouseover=()=>{
  noBtn.style.transform=`translate(${Math.random()*200-100}px,${Math.random()*200-100}px)`;
};

// YES button
document.getElementById("yesBtn").onclick=()=>{
  document.querySelector(".final-message").classList.remove("hidden");

  // Heartbeat vibration
  if(navigator.vibrate){
    navigator.vibrate([200,100,200,100,400]);
  }
};
