window.onload = function() {
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
