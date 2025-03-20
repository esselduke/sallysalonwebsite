
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');
    const backToTop = document.querySelector('.back-to-top');
    const preloader = document.getElementById('preloader');
    
    // Preloader
    window.addEventListener('load', function() {
        preloader.style.display = 'none';
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('sticky');
            backToTop.classList.remove('show');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('open');
        navMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('open');
            navMenu.classList.remove('show');
        });
    });
    
    // Add About dropdown toggle functionality for mobile
    const aboutNavItem = document.querySelector('.nav-item:nth-child(2)');
    const aboutNavLink = aboutNavItem.querySelector('a');
    
    // Prevent the default link behavior and toggle dropdown on mobile
    aboutNavLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            aboutNavItem.classList.toggle('active');
        }
    });
    
    // Close dropdowns when clicking elsewhere
    document.addEventListener('click', function(e) {
        if (!aboutNavItem.contains(e.target) && window.innerWidth <= 992) {
            aboutNavItem.classList.remove('active');
        }
    });
    
    // Update behavior if window is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            aboutNavItem.classList.remove('active');
        }
    });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Active nav link based on scroll position
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const scrollPosition = window.scrollY;
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === '#' + sectionId) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            });
            
            // Testimonial Slider
            const testimonialSlides = document.querySelector('.testimonial-slides');
            const sliderDots = document.querySelectorAll('.slider-dot');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            let currentSlide = 0;
            const slideCount = document.querySelectorAll('.testimonial-slide').length;
            
            function updateSlider() {
                testimonialSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                sliderDots.forEach((dot, index) => {
                    dot.classList.remove('active');
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    }
                });
            }
            
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            });
            
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlider();
            });
            
            sliderDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    currentSlide = index;
                    updateSlider();
                });
            });
            
            // Auto slide for testimonials
            setInterval(function() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            }, 5000);
// Product Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
            const productCards = document.querySelectorAll('.product-card');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const target = this.dataset.target;
                    
                    tabBtns.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    productCards.forEach(card => {
                        if (target === 'all' || card.dataset.category === target) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
            
            // Product Details Modals
            const productDetailsBtns = document.querySelectorAll('.product-details-btn');
            const productModals = document.querySelectorAll('.product-modal');
            const productModalCloseBtns = document.querySelectorAll('.product-modal-close');
            
            productDetailsBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const productId = this.dataset.product;
                    const modal = document.getElementById(`product-modal-${productId}`);
                    
                    if (modal) {
                        modal.classList.add('show');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });
            
            productModalCloseBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const modal = this.closest('.product-modal');
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                });
            });
            
            productModals.forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === this) {
                        this.classList.remove('show');
                        document.body.style.overflow = 'auto';
                    }
                });
                
                // Add swipe to close for mobile
                let touchStartY = 0;
                let touchEndY = 0;
                
                modal.addEventListener('touchstart', e => {
                    touchStartY = e.changedTouches[0].screenY;
                }, false);
                
                modal.addEventListener('touchend', e => {
                    touchEndY = e.changedTouches[0].screenY;
                    
                    // If swiped down by more than 50px, close the modal
                    if (touchEndY - touchStartY > 50) {
                        modal.classList.remove('show');
                        document.body.style.overflow = 'auto';
                    }
                }, false);
            });
            
            // Add keyboard support for Escape key
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape') {
                    productModals.forEach(modal => {
                        if (modal.classList.contains('show')) {
                            modal.classList.remove('show');
                            document.body.style.overflow = 'auto';
                        }
                    });
                }
            });
            
            // Gallery Filter
            const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.dataset.filter;
                    
                    filterBtns.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    
                    galleryItems.forEach(item => {
                        if (filter === 'all' || item.dataset.category === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // Lightbox for Gallery
            const galleryOverlays = document.querySelectorAll('.gallery-overlay');
            
            galleryOverlays.forEach(overlay => {
                overlay.addEventListener('click', function(e) {
                    if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
                        e.preventDefault();
                        
                        const lightbox = document.createElement('div');
                        lightbox.className = 'lightbox';
                        lightbox.innerHTML = `
                            <div class="lightbox-content">
                                <img src="${e.target.closest('a').getAttribute('href')}" alt="Gallery Image">
                                <span class="lightbox-close">&times;</span>
                            </div>
                        `;
                        
                        document.body.appendChild(lightbox);
                        document.body.style.overflow = 'hidden';
                        
                        const closeBtn = lightbox.querySelector('.lightbox-close');
                        closeBtn.addEventListener('click', function() {
                            document.body.removeChild(lightbox);
                            document.body.style.overflow = 'auto';
                        });
                        
                        lightbox.addEventListener('click', function(e) {
                            if (e.target === lightbox) {
                                document.body.removeChild(lightbox);
                                document.body.style.overflow = 'auto';
                            }
                        });
                    }
                });
            });
            
            // Animation on scroll
            function animateOnScroll() {
                const elements = document.querySelectorAll('.service-card, .product-card, .gallery-item, .about-img, .about-text, .testimonial-card');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 50) {
                        element.classList.add('fade-in');
                    }
                });
            }
            
            window.addEventListener('scroll', animateOnScroll);
            animateOnScroll(); // Initial check
            
            // Back to Top Button functionality
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Calendar Date Picker for Booking
            const datePicker = document.querySelector('.date-picker');
            const calendarContainer = document.querySelector('.calendar-container');
            const calendarDays = document.querySelector('.calendar-days');
            const calendarMonthYear = document.querySelector('.calendar-month-year');
            const prevMonthBtn = document.querySelector('.prev-month');
            const nextMonthBtn = document.querySelector('.next-month');
            
            // Current date
            let currentDate = new Date();
            let selectedDate = null;
            
            // Available dates (simulated - these would come from your backend)
            const availableDates = [
                new Date(2025, 2, 20), // March 20, 2025
                new Date(2025, 2, 21),
                new Date(2025, 2, 22),
                new Date(2025, 2, 24),
                new Date(2025, 2, 25),
                new Date(2025, 2, 27),
                new Date(2025, 2, 28),
                new Date(2025, 2, 31),
                new Date(2025, 3, 1),  // April 1, 2025
                new Date(2025, 3, 2),
                new Date(2025, 3, 3),
                new Date(2025, 3, 4),
                new Date(2025, 3, 7),
                new Date(2025, 3, 8),
                new Date(2025, 3, 10),
                new Date(2025, 3, 11),
                new Date(2025, 3, 14),
                new Date(2025, 3, 15)
            ];
            
            // Check if a date is available
            function isDateAvailable(date) {
                return availableDates.some(availableDate => 
                    availableDate.getDate() === date.getDate() && 
                    availableDate.getMonth() === date.getMonth() && 
                    availableDate.getFullYear() === date.getFullYear()
                );
            }
            
            // Toggle calendar
            datePicker.addEventListener('click', function() {
                calendarContainer.classList.toggle('show');
                generateCalendar(currentDate);
            });
            
            // Close calendar when clicking outside
            document.addEventListener('click', function(e) {
                if (!datePicker.contains(e.target) && !calendarContainer.contains(e.target)) {
                    calendarContainer.classList.remove('show');
                }
            });
            
            // Generate calendar
            function generateCalendar(date) {
                // Clear previous days
                calendarDays.innerHTML = '';
                
                // Set month and year display
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                calendarMonthYear.textContent = calendarMonthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
                
                // Get first day of month and number of days
                const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
                const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                
                // Add empty cells for days before first of month
                for (let i = 0; i < firstDayOfMonth; i++) {
                    const emptyDay = document.createElement('div');
                    emptyDay.className = 'calendar-day disabled';
                    calendarDays.appendChild(emptyDay);
                }
                
                // Add days of month
                const today = new Date();
                for (let i = 1; i <= daysInMonth; i++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'calendar-day';
                    dayElement.textContent = i;
                    
                    const currentDateCheck = new Date(date.getFullYear(), date.getMonth(), i);
                    
                    // Check if day is today
                    if (today.getDate() === i && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
                        dayElement.classList.add('today');
                    }
                    
                    // Check if day is selected
                    if (selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === date.getMonth() && selectedDate.getFullYear() === date.getFullYear()) {
                        dayElement.classList.add('selected');
                    }
                    
                    // Check if day is available
                    if (isDateAvailable(currentDateCheck)) {
                        dayElement.classList.add('available');
                        
                        // Add click event to available days
                        dayElement.addEventListener('click', function() {
                            // Remove selected class from previously selected day
                            const prevSelected = document.querySelector('.calendar-day.selected');
                            if (prevSelected) {
                                prevSelected.classList.remove('selected');
                            }
                            
                            // Select this day
                            this.classList.add('selected');
                            selectedDate = new Date(date.getFullYear(), date.getMonth(), i);
                            
                            // Update input field
                            const formattedDate = `${monthNames[date.getMonth()].substring(0, 3)} ${i}, ${date.getFullYear()}`;
                            datePicker.value = formattedDate;
                            
                            // Hide calendar
                            calendarContainer.classList.remove('show');
                        });
                    } else {
                        // Disable past days and unavailable days
                        dayElement.classList.add('disabled');
                    }
                    
                    calendarDays.appendChild(dayElement);
                }
            }
            
            // Previous month
            prevMonthBtn.addEventListener('click', function() {
                currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                generateCalendar(currentDate);
            });
            
            // Next month
            nextMonthBtn.addEventListener('click', function() {
                currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
                generateCalendar(currentDate);
            });
            
            // Initialize calendar with current month
            generateCalendar(currentDate);
            
            // Form Validation
            const forms = document.querySelectorAll('form');
            
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    let valid = true;
                    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
                    
                    inputs.forEach(input => {
                        if (!input.value.trim()) {
                            valid = false;
                            input.classList.add('error');
                        } else {
                            input.classList.remove('error');
                        }
                    });
                    
                    if (valid) {
                        // Show success message (simulated)
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.textContent = 'Your form has been submitted successfully! We will contact you shortly.';
                        
                        form.appendChild(successMessage);
                        form.reset();
                        
                        setTimeout(() => {
                            successMessage.style.opacity = '0';
                            setTimeout(() => {
                                form.removeChild(successMessage);
                            }, 500);
                        }, 3000);
                    }
                });
            });
            
            // Add to cart functionality (simulated)
            const addToCartBtns = document.querySelectorAll('.product-actions .btn:first-child, .product-modal-actions .btn');
            
            addToCartBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const productName = this.closest('.product-card') ? 
                        this.closest('.product-card').querySelector('h3').textContent :
                        this.closest('.product-modal-content').querySelector('h3').textContent;
                    
                    // Create notification
                    const notification = document.createElement('div');
                    notification.className = 'cart-notification';
                    notification.innerHTML = `
                        <div class="notification-content">
                            <i class="fas fa-check-circle"></i>
                            <p>${productName} has been added to your cart!</p>
                        </div>
                    `;
                    
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.classList.add('show');
                    }, 100);
                    
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 500);
                    }, 3000);
                });
            });
        });
   