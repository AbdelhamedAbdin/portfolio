// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const floatingNav = document.getElementById('floatingNav');
    let lastScrollY = window.scrollY;

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle scroll events
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Hide/show floating nav based on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            floatingNav.classList.add('hidden');
        } else {
            floatingNav.classList.remove('hidden');
        }
        lastScrollY = currentScrollY;

        // Update active navigation link based on scroll position
        const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
        let currentSection = 'hero';

        sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 200 && rect.bottom >= 200) {
                    currentSection = sectionId;
                }
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // Animate elements on scroll (Simple AOS implementation)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    const SERVICE_ID    = "service_lncqfdm"; 
    const TEMPLATE_ID   = "template_2p8ep9d";
    const PUBLIC_KEY    = "QPbJalJCMPywGLjTg";

    // EmailJS initialization
    (function(){
        emailjs.init(PUBLIC_KEY); // Replace with your EmailJS user ID
    })();

    function getTimestamp() {
        return new Date().toLocaleString();  // e.g., "9/27/2025, 3:45:12 PM"
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // ---- Loading Spinner State ----
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="
                    width: 1.25rem; height: 1.25rem;
                    border: 2px solid transparent;
                    border-top: 2px solid currentColor;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <span>Sending...</span>
            </div>
        `;
        submitBtn.disabled = true;

        // Add @keyframes dynamically
        const style = document.createElement("style");
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // ---- Build Message ----
        const fullName = this.querySelector('input[name="from_name"]').value.trim();
        const email = this.querySelector('input[name="reply_to"]').value.trim();
        const whatsapp = this.querySelector('input[name="whatsapp"]').value.trim();
        const mobile = this.querySelector('input[name="mobile"]').value.trim();
        const businessType = this.querySelector('input[name="business_type"]').value.trim();
        const customMsg = this.querySelector('textarea[name="message"]').value.trim();
        const submittedAt = getTimestamp();

        const message = `
📩 New Business Submission
A new business inquiry has been received. Below are the details:

Full Name: ${fullName}
Email: ${email}
Mobile Number: ${mobile}
WhatsApp Number: ${whatsapp}
Business Type: ${businessType}
Additional Message: ${customMsg || "N/A"}
Submitted At: ${submittedAt}
        `;

        const templateParams = {
            message: message,
            name: fullName,
            email: email,
            mobile: mobile,
            whatsapp: whatsapp,
            business_type: businessType,
            custom_message: customMsg,
            time: submittedAt
        };

        // ---- Send via EmailJS ----
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams).then(
            () => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                formStatus.innerHTML = "✅ Message sent successfully! I’ll get back to you as soon as possible.";
                formStatus.className = "form-status success";
                contactForm.reset();

                setTimeout(() => {
                    formStatus.innerHTML = "";
                    formStatus.className = "form-status";
                }, 5000);

                document.head.removeChild(style);
            },
            (err) => {
                console.error("EmailJS Error:", err);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                formStatus.innerHTML = "❌ Failed to send message. Please try again.";
                formStatus.className = "form-status error";

                setTimeout(() => {
                    formStatus.innerHTML = "";
                    formStatus.className = "form-status";
                }, 5000);

                document.head.removeChild(style);
            }
        );
    });
}

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn, .project-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Add ripple animation
            if (!document.querySelector('#ripple-style')) {
                const rippleStyle = document.createElement('style');
                rippleStyle.id = 'ripple-style';
                rippleStyle.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(rippleStyle);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for floating orbs
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title .title-line');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid #06b6d4';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
});

// Utility function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add performance optimization for scroll events
let ticking = false;

function updateScrollEffects() {
    // Update floating nav visibility
    const floatingNav = document.getElementById('floatingNav');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        floatingNav.style.opacity = '0.95';
    } else {
        floatingNav.style.opacity = '1';
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});