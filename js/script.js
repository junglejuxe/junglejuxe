function grantAccess() {
  const email = document.getElementById('userEmail').value;
  if (email && email.includes('@')) {
    localStorage.setItem('jj_access', 'true');
    window.location.href = 'main.html';
  } else {
    alert('Please enter a valid email.');
  }
}