/* Rao Bricks Udhyog — shared site behaviour */
document.addEventListener('DOMContentLoaded', function () {

  /* ---- Header scroll state ---- */
  var header = document.querySelector('.site-header');
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ---- Hero carousel ---- */
  var slides = document.querySelectorAll('.hero-slide');
  var dotsWrap = document.querySelector('.hero-dots');
  if (slides.length) {
    var current = 0;
    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', 'Show slide ' + (i + 1));
        dot.addEventListener('click', function () { goToSlide(i); });
        dotsWrap.appendChild(dot);
      });
    }
    function goToSlide(index) {
      slides[current].classList.remove('active');
      if (dotsWrap) dotsWrap.children[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      if (dotsWrap) dotsWrap.children[current].classList.add('active');
    }
    setInterval(function () {
      goToSlide((current + 1) % slides.length);
    }, 5500);
  }

  /* ---- Product / content tabs ---- */
  var tabButtons = document.querySelectorAll('.tab-btn');
  if (tabButtons.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
        document.querySelectorAll('.tab-panel').forEach(function (p) { p.classList.remove('active'); });
        btn.classList.add('active');
        var panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* ---- Gallery filter ---- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');
  if (filterButtons.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        galleryItems.forEach(function (item) {
          var cats = (item.getAttribute('data-category') || '').split(' ');
          if (filter === 'all' || cats.indexOf(filter) !== -1) item.classList.add('show');
          else item.classList.remove('show');
        });
      });
    });
    galleryItems.forEach(function (item) { item.classList.add('show'); });
  }

  /* ---- Testimonial slider ---- */
  var testimonials = document.querySelectorAll('.testimonial');
  var tDotsWrap = document.querySelector('.testimonial-dots');
  if (testimonials.length) {
    var tCurrent = 0;
    if (tDotsWrap) {
      testimonials.forEach(function (_, i) {
        var dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function () { showTestimonial(i); });
        tDotsWrap.appendChild(dot);
      });
    }
    function showTestimonial(index) {
      testimonials[tCurrent].classList.remove('active');
      if (tDotsWrap) tDotsWrap.children[tCurrent].classList.remove('active');
      tCurrent = index;
      testimonials[tCurrent].classList.add('active');
      if (tDotsWrap) tDotsWrap.children[tCurrent].classList.add('active');
    }
    setInterval(function () {
      showTestimonial((tCurrent + 1) % testimonials.length);
    }, 6000);
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- Back to top ---- */
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Contact form (front-end only demo) ---- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var successBox = document.querySelector('.form-success');
      if (successBox) {
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      contactForm.reset();
    });
  }

});
