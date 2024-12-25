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

// Contact form handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = {
        name: this.querySelector('#name').value,
        email: this.querySelector('#email').value,
        phone: this.querySelector('#phone').value,
        message: this.querySelector('#message').value
    };

    // Send to our server
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Replace alert with SweetAlert2
            Swal.fire({
                title: 'Salamat!',
                text: 'Natanggap na namin ang iyong mensahe. Kokontakin ka namin sa lalong madaling panahon.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4CAF50'
            });
            this.reset();
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Replace error alert with SweetAlert2
        Swal.fire({
            title: 'Error!',
            text: 'May error sa pagpapadala. Pakisubukan ulit.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#dc3545'
        });
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
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

document.addEventListener('DOMContentLoaded', function() {
    // Loader
    setTimeout(function() {
        document.querySelector('.loader-wrapper').style.display = 'none';
    }, 2000);

    // Team Modal Functionality
    const teamMembers = document.querySelectorAll('.team-member');
    const modal = document.getElementById('teamModal');
    const closeButtons = document.querySelectorAll('.close-modal, .close-btn');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            const img = member.querySelector('img').src;
            const name = member.querySelector('h3').textContent;
            const title = member.dataset.title;
            const phone = member.dataset.phone;
            const email = member.dataset.email;
            const bio = member.dataset.bio;

            document.getElementById('modalImage').src = img;
            document.getElementById('modalName').textContent = name;
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalPhone').textContent = phone;
            document.getElementById('modalEmail').textContent = email;
            document.getElementById('modalBio').textContent = bio || '';

            modal.style.display = 'flex';
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Show success message using SweetAlert2
            Swal.fire({
                title: 'Salamat!',
                text: 'Natanggap na namin ang iyong mensahe. Makikipag-ugnayan kami sa iyo sa lalong madaling panahon.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#4CAF50'
            });

            // Reset form
            contactForm.reset();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});