// Enhanced mobile menu with smooth transitions
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden');

    const paths = mobileMenuBtn.querySelectorAll('path');
    if (paths.length > 0) {
      paths.forEach((path, index) => {
        if (index === 0) {
          path.setAttribute('d', isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16');
        }
      });
    }
  });
}

// Advanced smooth scrolling with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetID);
    if (target) {
      const nav = document.getElementById('navbar');
      const navHeight = nav ? nav.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Enhanced intersection observer with staggered animations
const observerOptions = {
  threshold: [0.1, 0.3, 0.7],
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Unobserve for performance
    }
  });
}, observerOptions);

document.querySelectorAll('.intersection-observer').forEach(el => observer.observe(el));

// Enhanced counter animation with easing
const animateCounter = (element, target) => {
  const duration = 2000;
  const start = performance.now();
  const startValue = 0;

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const updateCounter = (currentTime) => {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);

    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  requestAnimationFrame(updateCounter);
};

// Counter animation with intersection observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-counter'), 10) || 0;
      animateCounter(counter, target);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(counter => counterObserver.observe(counter));

// Dynamic navbar with multiple scroll states
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 100) {
      navbar.classList.add('nav-blur', 'shadow-xl');
    } else {
      navbar.classList.remove('nav-blur', 'shadow-xl');
    }

    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  document.querySelectorAll('.floating-element').forEach((element, index) => {
    const speed = 0.2 + (index * 0.1);
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Enhanced card hover effects with mouse tracking
document.querySelectorAll('.card-premium').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  });
});

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

// Debounced scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
  // Reserved for heavy scroll operations
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);
