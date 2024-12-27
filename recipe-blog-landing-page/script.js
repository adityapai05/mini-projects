


window.onload = function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

  document.addEventListener('click', ({ target }) => {
      if (!menuToggle.contains(target) && !navLinks.contains(target)) {
          navLinks.classList.remove('active');
      }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(anchor.getAttribute('href'));
          target?.scrollIntoView({ behavior: 'smooth' });
          navLinks.classList.remove('active');
      });
  });
  let currentImageIndex = 0;
  const images = [
    'assets/sangeetabg1.png',
    'assets/sangeetabg2.png',
    'assets/sangeetabg3.png'
  ];

  setInterval(() => {
    const profileImage = document.getElementById('profileImage');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    profileImage.src = images[currentImageIndex];
  }, 2000); 
};
