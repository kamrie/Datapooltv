let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showSlide(index) {
    testimonials.forEach((testimonial, idx) => {
        testimonial.classList.toggle('active', idx === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    showSlide(currentSlide);
}

// Initialize the first slide
showSlide(currentSlide);
