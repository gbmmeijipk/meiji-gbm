document.addEventListener('DOMContentLoaded', function() {
    // Popup Advertisement
    const popup = document.getElementById('popup-ad');
    const closePopup = document.querySelector('.close-popup');
    
    // Show popup after 3 seconds
    setTimeout(function() {
        popup.style.display = 'block';
    }, 3000);
    
    // Close popup when clicking X
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            popup.style.display = 'none';
        });
    }
    
    // Close popup when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Slideshow functionality
    let slideIndex = 1;
    showSlides(slideIndex);
    
    // Auto advance slides every 5 seconds
    setInterval(function() {
        plusSlides(1);
    }, 5000);
    
    // Make the slideshow functions globally accessible
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    };
    
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    };
    
    function showSlides(n) {
        let i;
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        
        if (slides.length === 0) return; // Exit if no slides found
        
        // Loop back to first slide if at the end
        if (n > slides.length) {slideIndex = 1}
        
        // Go to last slide if going back from first slide
        if (n < 1) {slideIndex = slides.length}
        
        // Hide all slides
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        // Remove active class from all dots
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }
        
        // Show the current slide and activate the corresponding dot
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active-dot";
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                // Update icon
                const icon = item.querySelector('.toggle-icon i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const company = document.getElementById('company').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return false;
            }
            
            // Format email body
            const emailBody = `Name: ${name}%0D%0A`+
                            `Email: ${email}%0D%0A`+
                            `Phone: ${phone}%0D%0A`+
                            `Company: ${company}%0D%0A`+
                            `Subject: ${subject}%0D%0A%0D%0A`+
                            `Message:%0D%0A${message}`;
            
            // Create mailto link with subject and body
            const mailtoLink = `mailto:info@meiji-gbm.com.pk?subject=Website Contact: ${subject}&body=${emailBody}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            alert('Thank you for your message. We will contact you shortly.');
            contactForm.reset(); // Reset form after submission
        });
    }

    // No duplicate form validation needed as it's handled above

    // Testimonial slider auto-scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && testimonialSlider.children.length > 3) {
        let scrollAmount = 0;
        const slideWidth = testimonialSlider.querySelector('.testimonial').offsetWidth + 30; // width + gap
        const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
        
        setInterval(() => {
            scrollAmount += slideWidth;
            if (scrollAmount > maxScroll) {
                scrollAmount = 0;
            }
            
            testimonialSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 5000); // Auto-scroll every 5 seconds
    }

    // Add animation classes when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-item, .team-member, .package-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run on initial load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});