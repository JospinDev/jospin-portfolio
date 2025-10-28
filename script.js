window.addEventListener('load', () => {
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('hidden');
            }, 2000);
        });

        // Generate particles
        const particlesContainer = document.querySelector('.particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.width = Math.random() * 5 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }

        // Typing effect
        const typingElement = document.querySelector('.typing-text');
        const phrases = [
            'Backend Developer 💻',
            'Django Expert 🐍',
            'Vue.js Enthusiast ⚡',
            'Flutter Developer 📱',
            'API Architect 🔧',
            'Problem Solver 🎯'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            if (!isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(typeEffect, 2000);
                    return;
                }
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
            }
            
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }

        setTimeout(typeEffect, 1000);

        // Navbar scroll effect
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Active section highlighting
            let current = '';
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinksContainer = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });

        // Scroll reveal animation
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

        // Skill bars animation
        const skillItems = document.querySelectorAll('.skill-item');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.5
        });

        skillItems.forEach(item => {
            skillObserver.observe(item);
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Contact form handling
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Using mailto as a simple solution
            const mailtoLink = `mailto:williamjospin1@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${email}`;
            
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
            
            // Show success message (you can customize this)
            alert('Thank you for your message! Your email client will open shortly.');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add hover effect to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Animated counter for stats
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    const numericValue = parseInt(finalValue);
                    
                    if (!isNaN(numericValue)) {
                        let currentValue = 0;
                        const increment = numericValue / 50;
                        const timer = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= numericValue) {
                                target.textContent = finalValue;
                                clearInterval(timer);
                            } else {
                                target.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : '');
                            }
                        }, 30);
                    }
                    
                    statsObserver.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });

        // CV Modal functionality
        const viewCvBtn = document.getElementById('viewCvBtn');
        const cvModal = document.getElementById('cvModal');
        const closeCvModal = document.getElementById('closeCvModal');
        const cvIframe = document.getElementById('cvIframe');

        // Check if all elements exist before adding event listeners
        if (viewCvBtn && cvModal && closeCvModal && cvIframe) {
            viewCvBtn.addEventListener('click', () => {
                console.log('View CV button clicked'); // Debug log
                cvIframe.src = 'images/jospin_cv.pdf';
                cvModal.style.display = 'flex'; // Force display first
                setTimeout(() => {
                    cvModal.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });

            closeCvModal.addEventListener('click', () => {
                console.log('Close CV button clicked'); // Debug log
                cvModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
                setTimeout(() => {
                    cvModal.style.display = 'none';
                    cvIframe.src = ''; // Clear iframe after animation
                }, 300);
            });

            // Close modal when clicking outside
            cvModal.addEventListener('click', (e) => {
                if (e.target === cvModal) {
                    closeCvModal.click();
                }
            });

            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && cvModal.classList.contains('active')) {
                    closeCvModal.click();
                }
            });
        } else {
            console.error('CV Modal elements not found:', {
                viewCvBtn: !!viewCvBtn,
                cvModal: !!cvModal,
                closeCvModal: !!closeCvModal,
                cvIframe: !!cvIframe
            });
        }