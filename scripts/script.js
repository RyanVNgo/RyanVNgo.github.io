fetch('/elements/navbar.html')
  .then(response => response.text())
  .then(data => {document.getElementById('site-nav').innerHTML= data;});
