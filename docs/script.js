document.addEventListener('DOMContentLoaded', () => {

   // ----------------------------------------------------
    // EFEITO TYPEWRITER (DIGITAÇÃO) - CORRIGIDO
    // ----------------------------------------------------
    const greeting = document.querySelector('.greeting');
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');

    if (greeting && title && subtitle) {
        const text1 = "Olá, eu sou";
        const text2 = "Pedro Oliveira";
        const text3 = "Analista de Sistemas, Dados e Negócios";

        const typingSpeed = 60; // Velocidade da digitação

        const gHeight = greeting.getBoundingClientRect().height;
        const tHeight = title.getBoundingClientRect().height;
        const sHeight = subtitle.getBoundingClientRect().height;

        greeting.style.minHeight = gHeight + 'px';
        title.style.minHeight = tHeight + 'px';
        subtitle.style.minHeight = sHeight + 'px';

        function typeWriter(element, text, callback) {
            let i = 0;
            element.classList.add('typing-cursor');
            element.textContent = ''; 
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, typingSpeed);
                } else {
                    if (callback) callback();
                }
            }
            type();
        }

        function iniciarDigitacao() {
            greeting.textContent = '\u200B';
            title.textContent = '\u200B';
            subtitle.textContent = '\u200B';
            
            greeting.classList.remove('typing-cursor');
            title.classList.remove('typing-cursor');
            subtitle.classList.remove('typing-cursor');

            typeWriter(greeting, text1, () => {
                greeting.classList.remove('typing-cursor'); 
                
                typeWriter(title, text2, () => {
                    
                    setTimeout(() => {
                        title.classList.remove('typing-cursor'); 
                        
                        typeWriter(subtitle, text3, () => {
                            
                            setTimeout(() => {
                                subtitle.classList.remove('typing-cursor');
                                iniciarDigitacao();
                            }, 5000); 
                            
                        });
                    }, 500); 
                    
                });
            });
        }

        setTimeout(iniciarDigitacao, 300);
    }
    
    // 1. Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    // 3. Scroll Spy (Atualizar link ativo no menu)
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Compensar altura do header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if(navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive, { passive: true });

    // 4. Intersection Observer para Animações de Entrada
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

});