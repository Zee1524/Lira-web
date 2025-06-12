const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const categoryBtns = document.querySelectorAll('.category-btn');
const commandsList = document.getElementById('commands-list');
const statNumbers = document.querySelectorAll('.stat-number');
const featureCards = document.querySelectorAll('.feature-card');

// Commands data
const commandsData = {
    music: [
        {
            name: '/play',
            description: 'Play music from YouTube, Spotify, or SoundCloud',
            syntax: '/play <song name>'
        },
        {
            name: '/queue',
            description: 'Show current music queue',
            syntax: '/queue'
        },
        {
            name: '/skip',
            description: 'Skip to the next song',
            syntax: '/skip'
        },
        {
            name: '/volume',
            description: 'Adjust the music volume',
            syntax: '/volume <0-100>'
        },
        {
            name: '/filter',
            description: 'Apply audio filters to the music',
            syntax: '/filter <type>'
        }
    ],
    moderation: [
        {
            name: '/ban',
            description: 'Ban a user from the server',
            syntax: '/ban <@user> [reason]'
        },
        {
            name: '/kick',
            description: 'Kick a user from the server',
            syntax: '/kick <@user> [reason]'
        },
        {
            name: '/mute',
            description: 'Mute a user for specified duration',
            syntax: '/mute <@user> <time>'
        },
        {
            name: '/warn',
            description: 'Give a warning to a user',
            syntax: '/warn <@user> <reason>'
        },
        {
            name: '/purge',
            description: 'Delete multiple messages at once',
            syntax: '/purge <amount>'
        }
    ],
    ai: [
        {
            name: '/ask',
            description: 'Ask the magic 8-ball a question',
            syntax: '/ask <question>'
        },
        {
            name: '/chatbor',
            description: 'Get a random meme',
            syntax: '/chatbot'
        },
        {
            name: '/translate',
            description: 'Tell a random joke',
            syntax: '/translate'
        }
    ],
        info: [
        {
            name: '/help',
            description: 'Ask the magic 8-ball a question',
            syntax: '/ask <question>'
        },
        {
            name: '/botinfo',
            description: 'Get a random meme',
            syntax: '/botinfo'
        },
        {
            name: '/translate',
            description: 'Tell a random joke',
            syntax: '/translate'
        }
    ],
    admin: [
        {
            name: '/backup-list',
            description: 'Get information about a user',
            syntax: '/backup-list'
        },
        {
            name: '/serverinfo',
            description: 'Get information about the server',
            syntax: '/serverinfo'
        },
        {
            name: '/poll',
            description: 'Create a poll with multiple options',
            syntax: '/poll <question> [options]'
        },
        {
            name: '/remind',
            description: 'Set a reminder for later',
            syntax: '/remind <time> <message>'
        },
        {
            name: '/weather',
            description: 'Get weather information for a location',
            syntax: '/weather <location>'
        }
    ]
};

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bar.style.transform = '';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile nav when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '1';
        });
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Commands section functionality
function displayCommands(category) {
    const commands = commandsData[category];
    commandsList.innerHTML = '';
    
    commands.forEach((command, index) => {
        const commandItem = document.createElement('div');
        commandItem.className = 'command-item loading';
        commandItem.style.animationDelay = `${index * 0.1}s`;
        
        commandItem.innerHTML = `
            <div class="command-info">
                <h4>${command.name}</h4>
                <p>${command.description}</p>
            </div>
            <div class="command-syntax">${command.syntax}</div>
        `;
        
        commandsList.appendChild(commandItem);
    });
}

// Category button event listeners
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Display commands for selected category
        const category = btn.getAttribute('data-category');
        displayCommands(category);
    });
});

// Initialize with music commands
displayCommands('music');

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format numbers
        if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M+';
        } else if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(0) + 'K+';
        } else {
            element.textContent = current.toFixed(target % 1 === 0 ? 0 : 1);
        }
    }, 16);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Feature cards tilt effect
featureCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', (e) => {
        card.style.transform = 'translateY(0) rotateX(0)';
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.feature-card, .stat-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-cards .card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
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
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Bot status simulation
function updateBotStatus() {
    const statusIndicator = document.querySelector('.status-indicator');
    const statuses = ['online', 'idle', 'dnd'];
    const colors = ['#43b581', '#faa61a', '#f04747'];
    
    setInterval(() => {
        const randomStatus = Math.floor(Math.random() * statuses.length);
        statusIndicator.className = `status-indicator ${statuses[randomStatus]}`;
        statusIndicator.style.background = colors[randomStatus];
    }, 5000);
}

updateBotStatus();

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 50);
});

// Invite button functionality
document.getElementById('invite-btn').addEventListener('click', () => {
    // Simulate bot invite process
    showNotification('Redirecting to Discord...', 'info');
    setTimeout(() => {
        // In a real application, this would redirect to Discord's OAuth2 URL
        window.open('https://discord.com/oauth2/authorize?client_id=1242082181929631784&permissions=8&scope=bot+applications.commands', '_blank');
    }, 1000);
});

// Dashboard button functionality
document.getElementById('dashboard-btn').addEventListener('click', () => {
    showNotification('Dashboard feature coming soon!', 'info');
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'info' ? 'info-circle' : type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'info' ? '#3498db' : type === 'success' ? '#2ecc71' : '#e74c3c',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Search functionality (for future implementation)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search commands...';
    searchInput.className = 'search-input';
    
    // Add search functionality if needed
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        // Implement search logic here
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + K for search (future feature)
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        showNotification('Search feature coming soon!', 'info');
    }
    
    // Escape to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.click();
    }
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Theme switching (future feature)
function initThemeSwitch() {
    const themeButton = document.createElement('button');
    themeButton.innerHTML = '<i class="fas fa-moon"></i>';
    themeButton.className = 'theme-switch';
    themeButton.setAttribute('aria-label', 'Toggle theme');
    
    // Add to navigation
    document.querySelector('.nav-container').appendChild(themeButton);
    
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeButton.querySelector('i');
        icon.className = document.body.classList.contains('light-theme') 
            ? 'fas fa-sun' 
            : 'fas fa-moon';
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
        
        // Send analytics (if implemented)
        if (loadTime > 3000) {
            console.warn('Page load time is slower than expected');
        }
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Lazy loading for images (future feature)
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    console.log('LiraBot website loaded successfully!');
    
    // Add loading animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🤖 LiraBot Website v1.0 - Ready to serve!');
