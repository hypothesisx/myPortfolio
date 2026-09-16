const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Kui vajutad hamburgerile, lisa/eemalda 'active' klass
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Kui vajutad menüüs mõnele lingile, pane menüü uuesti kinni
/* --- SUJUV KERIMINE JA HINGAMISRUUM --- */
const header = document.querySelector('.header');

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        // 1. Peatame brauseri inetu hüppamise
        e.preventDefault();
        
        // 2. Paneme mobiilimenüü kinni (kui see on lahti)
        navMenu.classList.remove('active');
        
        // 3. Leiame, kuhu sektsiooni peame minema
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // 4. Arvutame asukoha: sektsioon miinus päise paksus miinus 40px tühja ruumi
            const headerHeight = header.offsetHeight;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerHeight - 0;
            
            // 5. Teeme sujuva libisemise sinna punkti
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
/* --- SKROLLIMISE ANIMATSIOON (Fade in) --- */
// Otsime üles kõik sektsioonid peale Hero (sest Hero tuleb sisse juba lehe laadimisel)
const sections = document.querySelectorAll('.section:not(#hero)');

// Seadistame vaatleja (Observer) tingimused
const observerOptions = {
    threshold: 0.15, // Animatsioon käivitub, kui 15% sektsioonist on ekraanile ilmunud
    rootMargin: "0px 0px -50px 0px" // Käivitub veidi enne, kui jõuab päris ekraani allserva
};

const sectionObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        // Kui element ei ole veel ekraanil, ära tee midagi
        if (!entry.isIntersecting) {
            return;
        } else {
            // Kui jõuab ekraanile, lisa nähtavuse klass
            entry.target.classList.add('fade-in-visible');
            // Lõpeta selle elemendi jälgimine (animatsioon toimub ainult üks kord alla kerides)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Käime kõik leitud sektsioonid läbi, muudame nad alguses nähtamatuks ja paneme vaatleja külge
sections.forEach(section => {
    section.classList.add('fade-in-hidden');
    sectionObserver.observe(section);
});