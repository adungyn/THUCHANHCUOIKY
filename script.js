/* --- 1. NAVIGATION LOGIC --- */
function navigate(viewId, elmnt) {
  // Ẩn tất cả các sections
  document.querySelectorAll('.view-section').forEach(el => el.style.display = 'none');
  // Hiển thị section mục tiêu
  const target = document.getElementById(viewId);
  target.style.display = (viewId === 'landing-view') ? 'flex' : 'block';
  
  // Quản lý hiển thị Navbar
  const navbar = document.getElementById('navbar');
  navbar.style.display = (viewId === 'landing-view') ? 'none' : 'flex';

  // Cuộn lên đầu trang
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Cập nhật trạng thái Active cho Nav Link
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if (elmnt) elmnt.classList.add('active');
}

function enterHouse() {
  // Điều hướng từ Landing sang Hub, đặt link đầu tiên (Nhà Chung) là active
  navigate('hub-view', document.querySelector('.nav-links .nav-item:first-child'));
  randomGreeting();
}

function goHome() {
  if(confirm("Bạn muốn rời nhà chung và quay lại cửa chính?")) {
    navigate('landing-view');
  } else {
    // Tìm link Nhà Chung và navigate
    const hubLink = document.querySelector(`.nav-item[onclick="navigate('hub-view', this)"]`);
    navigate('hub-view', hubLink);
  }
}

/* --- 2. HUB LOGIC (Nhím Message) --- */
function randomGreeting() {
  const msgs = [
    "Chào mừng bạn về nhà!",
    "Hôm nay bạn có chuyện gì vui không?",
    "Nhím đã đợi bạn mãi đó!",
    "Nghỉ ngơi một chút nhé!",
    "Ghé góc cá nhân uống chút nước nào."
  ];
  document.getElementById('nhim-msg').textContent = msgs[Math.floor(Math.random() * msgs.length)];
}

/* --- 3. SEASONS LOGIC (Toggle giữa Mùa 1 và Mùa 2) --- */
function toggleSeason(season, elmnt) {
  document.getElementById('season-1').style.display = 'none';
  document.getElementById('season-2').style.display = 'none';
  
  const targetSeason = document.getElementById('season-' + season);
  if (targetSeason) {
    targetSeason.style.display = 'block';
  }

  // Cập nhật trạng thái nút (bỏ outline khi active)
  document.querySelectorAll('#season-view .btn-modern').forEach(btn => btn.classList.add('btn-outline'));
  if (elmnt) {
    elmnt.classList.remove('btn-outline');
  }
}

/* --- 4. PROFILE TABS LOGIC (Chuyển đổi giữa các tab cá nhân) --- */
function showTab(tabId, elmnt) {
  document.querySelectorAll('.profile-tab').forEach(el => el.style.display = 'none');
  const targetTab = document.getElementById(tabId);
  if (targetTab) {
      targetTab.style.display = 'block';
  }
  
  document.querySelectorAll('.menu-btn').forEach(btn => btn.classList.remove('active'));
  if (elmnt) elmnt.classList.add('active');
}

/* --- 5. EDIT PROFILE (Thẻ Căn Cước) --- */
function editProfile() {
  const name = prompt("Tên mới của bạn:", document.getElementById('display-name').innerText);
  const nick = prompt("Biệt danh mới:", document.getElementById('display-nick').innerText);
  if(name) document.getElementById('display-name').innerText = name;
  if(nick) document.getElementById('display-nick').innerText = nick;
}

/* --- 6. WELLNESS LOGIC (Uống Nước) --- */
let water = 0;
function addWater(amount) {
  water += amount;
  const waterCountEl = document.getElementById('water-count');
  if (waterCountEl) {
      waterCountEl.innerText = water + " ml";
  }
  if(water >= 2000) alert("Tuyệt vời! Bạn đã uống đủ nước hôm nay.");
}

/* --- 7. BREATHING LOGIC (Hít Thở) --- */
let breathingInterval;
function toggleBreathing() {
  const btn = document.getElementById('btn-breathe');
  const text = document.getElementById('breathe-text');
  const circle = document.getElementById('breathe-circle');
  
  if(!btn || !text || !circle) return; // Bảo vệ khỏi lỗi null

  if(btn.innerText === "Dừng lại") {
    // Dừng
    clearInterval(breathingInterval);
    btn.innerText = "Bắt đầu";
    btn.style.background = "var(--primary)";
    text.innerText = "Sẵn sàng?";
    circle.style.transform = "scale(1)";
    circle.style.background = `conic-gradient(from 0deg, var(--secondary), var(--primary), var(--secondary))`;
  } else {
    // Bắt đầu
    btn.innerText = "Dừng lại";
    btn.style.background = "#e74c3c";
    
    let phase = 0;
    const phases = [
      { t: "HÍT VÀO (4s)", s: 1.2, c: "var(--primary)" },
      { t: "GIỮ HƠI (7s)", s: 1.25, c: "var(--primary-dark)" },
      { t: "THỞ RA (8s)", s: 1.0, c: "var(--secondary)" }
    ];

    function runCycle() {
      const p = phases[phase % 3];
      text.innerText = p.t;
      circle.style.transform = `scale(${p.s})`;
      circle.style.background = `conic-gradient(from 0deg, ${p.c}, ${p.c}, ${p.c})`;
      phase++;
    }
    
    runCycle();
    // Khởi tạo interval với thời gian tổng chu kỳ đơn giản (4s + 7s + 8s) để đồng bộ hóa
    breathingInterval = setInterval(runCycle, 4000); 
  }
}

/* --- 8. FORTUNE LOGIC (Bói Quẻ) --- */
function getFortune() {
  const tasks = [
    "Cười với chính mình trong gương 3 lần!",
    "Nhắn tin cho một người bạn cũ.",
    "Nghe bài hát yêu thích và nhún nhảy.",
    "Uống ngay 1 ly nước đầy.",
    "Dọn dẹp bàn học trong 5 phút."
  ];
  const task = tasks[Math.floor(Math.random() * tasks.length)];
  document.getElementById('fortune-card').innerHTML = `<span style='color: var(--primary); font-weight:bold;'>${task}</span>`;
}

/* --- 9. 3D TILT EFFECT FOR ID CARD --- */
function initTiltEffect() {
    const card = document.querySelector('.id-card');
    const container = document.querySelector('.id-card-wrapper');
    
    if (container && card) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const xAxis = (centerY - e.clientY) / 20; 
            const yAxis = (e.clientX - centerX) / 20; 
            
            card.style.transform = `rotateX(${xAxis}deg) rotateY(${yAxis}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }
}


/* --- 10. PARTICLE GENERATOR --- */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return; 

  for(let i=0; i<20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 20 + 5 + 'px';
    p.style.width = size;
    p.style.height = size;
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = Math.random() * 10 + 10 + 's';
    p.style.opacity = Math.random();
    container.appendChild(p);
  }
}

/* --- 11. INITIALIZATION --- */
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initTiltEffect();
    
    // Khởi tạo trạng thái mặc định cho Navigation và Season
    const defaultSeasonButton = document.querySelector('#season-view .btn-modern');
    if (defaultSeasonButton) {
        // Đảm bảo S1 được hiển thị và nút S1 được active
        toggleSeason('s1', defaultSeasonButton); 
    }
    
    // Đảm bảo tab Home/Hub được active trong navbar khi load
    const hubLink = document.querySelector(`.nav-item[onclick="navigate('hub-view', this)"]`);
    if (hubLink) {
        // Chỉ active Hub link nếu không ở Landing page
        if (document.getElementById('landing-view').style.display !== 'flex') {
             document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
             hubLink.classList.add('active');
        }
    }
});