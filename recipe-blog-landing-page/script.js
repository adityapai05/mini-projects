const profileImage = document.getElementById('profile-image');
const images = ['./assets/sangeetabg1.png', './assets/sangeetabg2.png', './assets/sangeetabg3.png'];
let currentIndex = 0;



setInterval(( ) => {
    profileImage.src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
}, 1000);