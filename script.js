// Add this at the beginning of your script.js
document.body.classList.add('loading');

window.addEventListener('load', function() {
    // Delay to show loader for at least 1 second
    setTimeout(function() {
        const loader = document.querySelector('.loader-wrapper');
        loader.classList.add('fade-out');
        document.body.classList.remove('loading');
        
        // Remove loader from DOM after animation
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-links') && !event.target.closest('.mobile-menu')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// View More/Less Properties functionality
const viewMoreBtn = document.querySelector('.view-more-btn');
const hiddenProperties = document.querySelectorAll('.property-card.hidden');

if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', function() {
        if (viewMoreBtn.getAttribute('data-state') === 'more') {
            // Show hidden properties
            hiddenProperties.forEach(property => {
                property.classList.remove('hidden');
                property.classList.add('show');
            });
            
            // Update button text and state
            viewMoreBtn.textContent = 'Tignan ang Mas Konti';
            viewMoreBtn.setAttribute('data-state', 'less');
        } else {
            // Hide properties
            hiddenProperties.forEach(property => {
                property.classList.add('hidden');
                property.classList.remove('show');
            });
            
            // Update button text and state
            viewMoreBtn.textContent = 'Tignan Lahat ng Properties';
            viewMoreBtn.setAttribute('data-state', 'more');
            
            // Scroll to properties section
            const propertiesSection = document.querySelector('.properties');
            propertiesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Add this to your script.js
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', data);
    
    // Show success message (customize as needed)
    alert('Salamat sa iyong mensahe! Kokontakin ka namin sa lalong madaling panahon.');
    
    // Reset form
    this.reset();
});

// Add this to your script.js
function reveal() {
    const reveals = document.querySelectorAll('.hero, .who-we-are, .why-choose-us, .properties, .meet-team, .testimonials, .contact, .footer');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Adjust this value to change when the animation triggers
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add event listeners
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Initial check
reveal(); 

// Add this to your script.js
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('click', function() {
        const modal = document.getElementById('teamModal');
        const modalImg = document.getElementById('modalImage');
        const modalName = document.getElementById('modalName');
        const modalTitle = document.getElementById('modalTitle');
        const modalPhone = document.getElementById('modalPhone');
        const modalEmail = document.getElementById('modalEmail');
        const modalBio = document.getElementById('modalBio');
        
        // Get info from data attributes
        const memberData = {
            img: this.querySelector('img').src,
            name: this.querySelector('.member-overlay h3').textContent,
            title: this.dataset.title || 'Real Estate Agent',
            phone: this.dataset.phone || '403-978-2539',
            email: this.dataset.email || 'homes@briones.ca',
            bio: this.dataset.bio || 'Part of the Briones Real Estate team, committed to helping you find your dream home.'
        };
        
        // Set modal content
        modalImg.src = memberData.img;
        modalName.textContent = memberData.name;
        modalTitle.textContent = memberData.title;
        modalPhone.textContent = memberData.phone;
        modalEmail.textContent = memberData.email;
        modalBio.textContent = memberData.bio;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

// Add click handler for new close button
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('teamModal').classList.remove('show');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('teamModal');
    if (event.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Add scroll functionality to CTA buttons
document.addEventListener('DOMContentLoaded', function() {
    const propertyButton = document.querySelector('.cta-button.primary');
    const contactButton = document.querySelector('.cta-button.secondary');

    propertyButton.addEventListener('click', function() {
        const propertiesSection = document.querySelector('.properties');
        propertiesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    contactButton.addEventListener('click', function() {
        const contactSection = document.querySelector('.contact');
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
});