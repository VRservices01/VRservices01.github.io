console.log('SRI MANIKANTA HOUSE CLEANING site loaded.'); 

// Testimonial slider logic
(function() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const leftArrow = document.querySelector('.testimonial-arrow.left');
  const rightArrow = document.querySelector('.testimonial-arrow.right');
  let current = 0;
  let autoSlideInterval = null;
  const AUTO_SLIDE_MS = 6000;

  function showTestimonial(idx) {
    testimonials.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextTestimonial() {
    showTestimonial((current + 1) % testimonials.length);
  }

  function prevTestimonial() {
    showTestimonial((current - 1 + testimonials.length) % testimonials.length);
  }

  function resetAutoSlide() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextTestimonial, AUTO_SLIDE_MS);
  }

  leftArrow && leftArrow.addEventListener('click', () => {
    prevTestimonial();
    resetAutoSlide();
  });
  rightArrow && rightArrow.addEventListener('click', () => {
    nextTestimonial();
    resetAutoSlide();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showTestimonial(i);
      resetAutoSlide();
    });
  });

  // Optional: swipe support for mobile
  let startX = null;
  const slider = document.querySelector('.testimonial-content');
  if (slider) {
    slider.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', e => {
      if (startX === null) return;
      let endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) {
        prevTestimonial();
        resetAutoSlide();
      } else if (startX - endX > 50) {
        nextTestimonial();
        resetAutoSlide();
      }
      startX = null;
    });
  }

  // Initialize
  showTestimonial(0);
  resetAutoSlide();
})(); 