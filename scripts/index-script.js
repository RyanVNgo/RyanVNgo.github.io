document.getElementById('get-in-touch').addEventListener('click', function() {
  const social_link_block = document.getElementById('social-links');
  if (social_link_block.style.opacity == 0) {
    social_link_block.style.opacity = 1;
    social_link_block.classList.remove('disabled-link');
  } else {
    social_link_block.style.opacity = 0;
    social_link_block.classList.add('disabled-link');
  }
});

