document.getElementById('get-in-touch').addEventListener('click', function() {
  const images = document.getElementById('social-links');
  if (images.style.opacity == 0) {
    images.style.opacity = 1;
  } else {
    images.style.opacity = 0;
  }
});
