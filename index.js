// --- 1. Data & Configuration ---
// const lyrics = [
//     {time: 0.00, text: "I don't know how to say this" },
//     {time: 4.00, text: "But" },
//     {time: 7.00, text: "I think you should know this" },
//     { time: 9.72, text: "They say, you know when you know" },
//     { time: 16.90, text: "So let's face it, you had me at hello" },
//     { time: 25.31, text: "Hesitation never helps" },
//     { time: 28.23, text: "How could this be anything, anything else?" },
//     { time: 32.93, text: "When all I dream of is your eyes" },
//     { time: 37.29, text: "All I long for is your touch" },
//     { time: 41.03, text: "And, darlin', something tells me that's enough, mm" },
//     { time: 48.56, text: "You can say that I'm a fool" },
//     { time: 51.96, text: "And I don't know very much" },
//     { time: 55.18, text: "But I think they call this love" },
//     {time: 63.00, text: ""}
// ];
const lyrics = [
    { time: 0.00, text: "I don't know how to say this" },
    { time: 4.00, text: "But" },
    { time: 7.00, text: "I think you should know this" },
    { time: 9.10, text: "All I dream of is your eyes" },
    { time: 13.46, text: "All I long for is your touch" },
    { time: 17.20, text: "And, darlin', something tells me that's enough, mm" },
    { time: 24.23, text: "You can say that I'm a fool" },
    { time: 27.63, text: "And I don't know very much" },
    { time: 30.95, text: "But I think they call this love" },
    { time: 38.00, text: "" }
];


const imgSources = [
    "1.jpeg","2.jpeg","3.jpeg","4.jpeg","5.jpeg","6.jpeg","7.jpeg","8.jpeg","9.jpeg","10.jpeg"
];

const captions = ["Your Presence 🤍", "Your Smile 😊", "Every Moment 🫶", "My Love 🫴", "Our World 🌎", "Our Adventures 💗", "Our Dream 🌝", "Our Inside Jokes 🙈", "Simply us 🦢", "Your Eyes 👀"];

const heartPattern = [
    {x: -55, y: -90}, {x: 55, y: -90},
    {x: -95, y: -35}, {x: -32, y: -35}, {x: 32, y: -35}, {x: 95, y: -35},
    {x: -65, y: 30}, {x: 0, y: 30}, {x: 65, y: 30},
    {x: 0, y: 95}
];

// --- 2. Helper: Image Preloading ---
function preloadImages() {
    imgSources.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// --- 3. Particle System ---
const pCanvas = document.getElementById('particle-canvas');
const pCtx = pCanvas.getContext('2d');
let particles = [];
const res = () => { pCanvas.width = window.innerWidth; pCanvas.height = window.innerHeight; };
window.addEventListener('resize', res); res();

class P { 
    constructor() { this.reset(); } 
    reset() { 
        this.x = Math.random() * pCanvas.width; 
        this.y = pCanvas.height + 20; 
        this.s = Math.random() * 15 + 10; 
        this.v = Math.random() * 1.5 + 0.5;
        this.type = Math.random() > 0.4 ? '💌' : '❤️'; 
        this.opacity = Math.random() * 0.5 + 0.5;
    } 
    update() { this.y -= this.v; if(this.y < -20) this.reset(); } 
    draw() { 
        pCtx.globalAlpha = this.opacity;
        pCtx.font = `${this.s}px serif`; 
        pCtx.fillText(this.type, this.x, this.y); 
    } 
}
for(let i=0; i<50; i++) particles.push(new P());
function loop() { pCtx.clearRect(0,0,pCanvas.width,pCanvas.height); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(loop); }
loop();

// --- 4. Intro & Lyric Logic ---
const music = document.getElementById('bg-music');
const lyricBox = document.getElementById('lyric-display');

document.getElementById('ready-btn').onclick = function() {
    preloadImages(); // Start preloading immediately
    this.parentElement.style.display = 'none';
    document.querySelector('#stage-0 h1').style.display = 'none';
    music.play();
    
    const syncLyrics = setInterval(() => {
        const currentTime = music.currentTime;
        const currentLine = lyrics.filter(l => currentTime >= l.time).pop();
        
        if (currentLine) {
            if (lyricBox.innerText !== currentLine.text) {
                lyricBox.style.opacity = 0;
                lyricBox.style.transform = "translateY(10px)";
                setTimeout(() => {
                    lyricBox.innerText = currentLine.text;
                    lyricBox.style.opacity = 1;
                    lyricBox.style.transform = "translateY(0)";
                }, 300);
            }
        }

        if (currentTime >= 34.00) { 
            clearInterval(syncLyrics);
            nextStage(1);
        }
    }, 100);
};

// --- 5. Stage 1: The Will You Be Mine Logic ---
const noBtn = document.getElementById('no-btn');
const handleNo = (e) => {
    e.preventDefault();
    noBtn.style.animation = 'none';
    noBtn.offsetHeight; 
    noBtn.style.animation = 'shake 0.5s ease-in-out';
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px';
    noBtn.style.top = Math.max(10, Math.floor(Math.random() * maxY)) + 'px';
};

noBtn.addEventListener('touchstart', handleNo, {passive: false});
noBtn.addEventListener('click', handleNo);

document.getElementById('yes-btn').onclick = () => {
    nextStage(2);
};

function nextStage(n) {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
    document.getElementById(`stage-${n}`).classList.add('active');
    if(n===2) formHeartShowcase();
}

// --- 6. Stage 2: Gallery Animation ---
async function formHeartShowcase() {
    const gallery = document.getElementById('heart-gallery');
    gallery.innerHTML = '';
    
    for (let i = 0; i < imgSources.length; i++) {
        const div = document.createElement('div');
        div.className = 'mini-polaroid';
        div.innerHTML = `<img src="${imgSources[i]}"><p>${captions[i]}</p>`;
        div.style.transform = "translate(0, 0) scale(0)";
        gallery.appendChild(div);

        // Instant delay because they are already preloaded
        await new Promise(r => setTimeout(r, 100));
        div.style.transform = `translate(0, 0) scale(2.8) rotate(${(Math.random()-0.5)*10}deg)`;
        div.style.zIndex = "1000";

        await new Promise(r => setTimeout(r, 1300));

        const pos = heartPattern[i];
        const randomRot = (Math.random() - 0.5) * 30;
        const finalTrans = `translate(${pos.x}px, ${pos.y}px) scale(1) rotate(${randomRot}deg)`;
        
        div.style.zIndex = "5";
        div.style.transform = finalTrans;
        div.dataset.origTrans = finalTrans;

        div.onclick = (e) => {
            e.stopPropagation();
            if(div.classList.contains('zoomed')) {
                div.classList.remove('zoomed');
                div.style.transform = div.dataset.origTrans;
            } else {
                closeAllPhotos();
                div.classList.add('zoomed');
            }
        };
    }

    setTimeout(() => {
        document.getElementById('swipe-wrap').classList.add('show');
        initSlider();
    }, 600);
}

function closeAllPhotos() {
    document.querySelectorAll('.mini-polaroid.zoomed').forEach(p => {
        p.classList.remove('zoomed');
        p.style.transform = p.dataset.origTrans;
    });
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.mini-polaroid')) closeAllPhotos();
});

// --- 7. Stage 2: Slider Logic ---
function initSlider() {
    const knob = document.getElementById('heart-knob'), fill = document.getElementById('fill'), track = document.getElementById('track');
    let dragging = false;
    const startDragging = (e) => { dragging = true; if(e.type === 'touchstart') e.preventDefault(); };
    const stopDragging = () => dragging = false;
    const onMove = (e) => {
        if(!dragging) return;
        const rect = track.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const x = clientX - rect.left - 27;
        let p = Math.max(0, Math.min(x / (rect.width - 55), 1));
        knob.style.left = (p * (rect.width - 55)) + 'px';
        fill.style.width = (p * 100) + '%';
        if(p > 0.98) { dragging = false; nextStage(3); }
    };
    knob.addEventListener('mousedown', startDragging);
    knob.addEventListener('touchstart', startDragging, {passive: false});
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, {passive: false});
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchend', stopDragging);
}

// --- 8. Stage 3: Scratch Logic ---
const envelope = document.getElementById('envelope');
envelope.onclick = () => { envelope.classList.add('open'); setTimeout(initScratch, 500); };

function initScratch() {
    const canvas = document.getElementById('scratch-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    grad.addColorStop(0,'#e2e2e2'); grad.addColorStop(0.5,'#ffb3c1'); grad.addColorStop(1,'#d1d1d1');
    ctx.fillStyle = grad; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#ff4d6d'; ctx.font='bold 16px "Shantell Sans"'; ctx.textAlign='center';
    ctx.fillText('SCRATCH HERE', canvas.width/2, canvas.height/2+5);
    const scratch = (clientX, clientY) => {
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x, y, 25, 0, Math.PI*2); ctx.fill();
    };
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); scratch(e.touches[0].clientX, e.touches[0].clientY); }, {passive: false});
    canvas.addEventListener('mousemove', (e) => { if(e.buttons === 1) scratch(e.clientX, e.clientY); });
}