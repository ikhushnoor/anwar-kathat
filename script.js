// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth animations on page load
    const card = document.querySelector('.card');
    const profileImage = document.querySelector('.profile-image');
    const contactItems = document.querySelectorAll('.contact-item');
    const aboutSection = document.querySelector('.about-section');
    const ctaButton = document.querySelector('.linkedin-btn');
    
    // Initial animation on page load
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate contact items with stagger effect
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + (index * 150));
    });
    
    // Animate about section
    setTimeout(() => {
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
    }, 800);
    
    // Animate CTA button
    setTimeout(() => {
        ctaButton.style.opacity = '1';
        ctaButton.style.transform = 'translateY(0)';
    }, 1000);
    
    // Profile image hover effect
    profileImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Contact item click effects
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactValue = this.querySelector('.contact-value');
            const href = contactValue.getAttribute('href');
            
            if (href && href.startsWith('tel:')) {
                // For phone numbers, show a toast message
                showToast('Phone number copied to clipboard!');
                navigator.clipboard.writeText(contactValue.textContent);
            } else if (href && href.startsWith('mailto:')) {
                // For email, show a toast message
                showToast('Opening email client...');
            }
        });
    });
    
    // LinkedIn button click tracking
    ctaButton.addEventListener('click', function() {
        showToast('Redirecting to LinkedIn...');
    });
    
    // Parallax effect on scroll (for mobile)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (window.innerWidth <= 768) {
            card.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Apply ripple effect to LinkedIn button
    ctaButton.addEventListener('click', createRipple);
    
    // Toast notification function
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #18cb96;
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 4px 12px rgba(24, 203, 150, 0.3);
        `;
        
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .about-section {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
        
        .linkedin-btn {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add smooth scrolling for any internal links
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
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('contact-item') || 
                focusedElement.classList.contains('linkedin-btn')) {
                focusedElement.click();
            }
        }
    });
    
    // Make contact items focusable for accessibility
    contactItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
    });
    
    // Add loading animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #18cb96 0%, #0f9b73 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    const spinKeyframes = document.createElement('style');
    spinKeyframes.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinKeyframes);
    
    loadingOverlay.appendChild(loader);
    document.body.appendChild(loadingOverlay);
    
    // Hide loading overlay after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                if (loadingOverlay.parentNode) {
                    loadingOverlay.parentNode.removeChild(loadingOverlay);
                }
            }, 500);
        }, 1000);
    });
});
