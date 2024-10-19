  document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function() {
          const link = this.getAttribute('data-link');
          if (link) {
              window.open(link, '_blank') = link; 
          }
      });
  });

