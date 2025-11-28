// CARGA
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loadingScreen').classList.add('hidden');
        document.getElementById('mainContainer').classList.add('visible');
        document.getElementById('verticalNav').classList.add('visible');
    }, 1800);
});

// PÁGINAS
const pages = {
    home: document.getElementById('mainContainer'),
    about: document.getElementById('aboutPage'),
    contact: document.getElementById('contactPage')
};
const homeLink = document.getElementById('homeLink');
const aboutLink = document.getElementById('aboutLink');
const contactLink = document.getElementById('contactLink');

function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    if (pages[pageName]) pages[pageName].classList.add('active');
}

homeLink.addEventListener('click', (e) => { e.preventDefault(); showPage('home'); });
aboutLink.addEventListener('click', (e) => { e.preventDefault(); showPage('about'); });
contactLink.addEventListener('click', (e) => { e.preventDefault(); showPage('contact'); });

// PROYECTOS
const projectItems = document.querySelectorAll('.project-item');
const projectImages = document.querySelectorAll('.project-image');
const leftSide = document.getElementById('leftSide');
const TOTAL_PROJECTS = 5;
let currentIndex = 0;
let isScrolling = false;
let scrollTimeout;

function updateActiveProject(index) {
    currentIndex = ((index % TOTAL_PROJECTS) + TOTAL_PROJECTS) % TOTAL_PROJECTS;
    
    projectItems.forEach((item, i) => {
        if (i === currentIndex) item.classList.add('active');
        else item.classList.remove('active');
    });
    
    projectImages.forEach((img, i) => {
        if (i === currentIndex) img.classList.add('active');
        else img.classList.remove('active');
    });
}

// CARRUSEL AUTOMÁTICO (AUTO-PLAY 5s)
const carousels = document.querySelectorAll('.carousel-wrapper-outside');

carousels.forEach((carouselWrapper) => {
    const slideRow = carouselWrapper.querySelector('.carousel-slide');
    const images = slideRow.querySelectorAll('img');
    
    let counter = 0;
    const size = 100; 

    // Si solo hay 1 imagen, no hacemos nada
    if (images.length <= 1) return;

    const moveNext = () => {
        if (counter >= images.length - 1) {
            counter = 0; 
        } else {
            counter++;
        }
        slideRow.style.transform = 'translateX(' + (-size * counter) + '%)';
    };

    // 5 segundos
    setInterval(moveNext, 5000);
});

// SCROLL & CLICK
leftSide.addEventListener('wheel', function(e) {
    e.preventDefault();
    if (isScrolling) return;
    if (Math.abs(e.deltaY) < 20) return;
    
    isScrolling = true;
    if (e.deltaY > 0) updateActiveProject(currentIndex + 1);
    else updateActiveProject(currentIndex - 1);
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { isScrolling = false; }, 800);
}, { passive: false });

projectItems.forEach((item, index) => {
    item.addEventListener('click', function() {
        if (!isScrolling) updateActiveProject(index);
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
        if (isScrolling) return;
        e.preventDefault(); isScrolling = true; updateActiveProject(currentIndex + 1);
        clearTimeout(scrollTimeout); scrollTimeout = setTimeout(() => { isScrolling = false; }, 800);
    } else if (e.key === 'ArrowUp') {
        if (isScrolling) return;
        e.preventDefault(); isScrolling = true; updateActiveProject(currentIndex - 1);
        clearTimeout(scrollTimeout); scrollTimeout = setTimeout(() => { isScrolling = false; }, 800);
    }
});

setTimeout(() => { updateActiveProject(0); }, 100);

// CURSOR
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    follower.style.transform = `translate(${followerX - 4}px, ${followerY - 4}px)`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

loopScroll();


