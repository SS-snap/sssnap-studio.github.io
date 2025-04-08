// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const header = document.querySelector('header');
    const navList = document.querySelector('nav ul');
    
    // Create mobile menu toggle button
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    header.querySelector('.container').insertBefore(menuToggle, document.querySelector('nav'));
    
    // Add toggle functionality
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form input values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name && email && message) {
                // Here you would normally send the data to a server
                // For demo purposes, we'll just show an alert
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    }
    
    // Add scroll effects
    window.addEventListener('scroll', function() {
        // Add shadow to header on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Reveal elements on scroll
        revealElements();
    });
    
    // Add reveal class to elements when they come into view
    function revealElements() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('reveal');
            }
        });
    }
    
    // Initial call to reveal elements
    revealElements();
    
    // Add CSS for the reveal animation and menu toggle
    addDynamicStyles();
    
    function addDynamicStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .reveal {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.8s ease;
            }
            
            .reveal.reveal {
                opacity: 1;
                transform: translateY(0);
            }
            
            header.scrolled {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .menu-toggle {
                display: none;
                flex-direction: column;
                justify-content: space-between;
                width: 30px;
                height: 20px;
                cursor: pointer;
            }
            
            .menu-toggle span {
                display: block;
                width: 100%;
                height: 3px;
                background-color: var(--dark-color);
                transition: all 0.3s ease;
            }
            
            .menu-toggle.active span:nth-child(1) {
                transform: translateY(8.5px) rotate(45deg);
            }
            
            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .menu-toggle.active span:nth-child(3) {
                transform: translateY(-8.5px) rotate(-45deg);
            }
            
            @media (max-width: 768px) {
                .menu-toggle {
                    display: flex;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
}); 