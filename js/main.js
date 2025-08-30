document.addEventListener('DOMContentLoaded', () => {
  // --- THEME TOGGLE ---
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
      themeToggle.innerHTML = moonIcon;
    } else {
      document.documentElement.classList.remove('light-mode');
      themeToggle.innerHTML = sunIcon;
    }
  };

  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    let newTheme = document.documentElement.classList.contains('light-mode')
      ? 'dark'
      : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });

  // --- 3D TILT EFFECT FOR PROFILE PICTURE ---
  const profilePic = document.querySelector('.about__profile-pic');
  if (profilePic) {
    profilePic.addEventListener('mousemove', (e) => {
      const rect = profilePic.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      profilePic.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    profilePic.addEventListener('mouseleave', () => {
      profilePic.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // --- 3D TILT EFFECT FOR PROJECT CARDS ---
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });

  // --- SCROLL-BASED BACKGROUND ANIMATIONS ---
  const shapes = document.querySelectorAll('.scroll-bg-shape');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    shapes.forEach((shape, index) => {
      let speed = 0.1;
      let rotationSpeed = 0.05;
      let scaleSpeed = 0.0002;

      if (index === 0) {
        // Shape 1
        speed = 0.2;
        rotationSpeed = 0.1;
        scaleSpeed = 0.0003;
      } else if (index === 2) {
        // Shape 3
        speed = 0.05;
        rotationSpeed = -0.08;
        scaleSpeed = 0.0001;
      }

      const translateY = -scrollY * speed;
      const rotate = scrollY * rotationSpeed;
      const scale = 1 + scrollY * scaleSpeed;

      shape.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
    });
  });

  // --- SCROLL ANIMATIONS (INTERSECTION OBSERVER) ---
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  const elementsToAnimate = document.querySelectorAll(
    '.timeline__item, .card, .about__container, .contact p, .contact__links'
  );
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});
