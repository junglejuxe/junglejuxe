function purchaseAlbum() {
  alert("Redirecting to payment... (Stripe integration placeholder)");
}

document.addEventListener('DOMContentLoaded', () => {
  const allAudio = document.querySelectorAll('audio');
  allAudio.forEach(audio => {
    audio.addEventListener('play', () => {
      allAudio.forEach(other => {
        if (other !== audio) {
          other.pause();
        }
      });
    });
  });
});
