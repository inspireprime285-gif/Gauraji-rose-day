script.js
document.addEventListener('DOMContentLoaded', ()=> {
 // Gallery lightbox
 const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
 const lightbox = document.getElementById('lightbox');
 const lbImg = document.getElementById('lightbox-img');
 const lbCap = document.getElementById('lightbox-cap');
 const closeBtn = document.getElementById('close-lightbox');
 thumbs.forEach(t => {
 t.addEventListener('click', ()=> {
 lbImg.src = t.src;
 lbCap.textContent = t.dataset.caption || t.alt || '';
 lightbox.classList.add('show');
 });
 });
 closeBtn.addEventListener('click', ()=> lightbox.classList.remove('show'));
 lightbox.addEventListener('click', (e)=> { if (e.target === lightbox) lightbox.classList.remove('show'); });
  document.getElementById('open-gallery').addEventListener('click', ()=> {
 document.getElementById('gallery').scrollIntoView({behavior:'smooth'});
 });
  // Playlist player
 const audio = document.getElementById('audio');
 const playBtn = document.getElementById('play');
 const prevBtn = document.getElementById('prev');
 const nextBtn = document.getElementById('next');
 const trackTitle = document.getElementById('track-title');
 const seek = document.getElementById('seek');
 const listItems = Array.from(document.querySelectorAll('#playlist li'));
  let idx = 0;
 const playlist = listItems.map(li => ({ src: li.dataset.src, title: li.textContent.trim() }));
  function loadTrack(i) {
 if (!playlist[i]) { audio.src = ''; trackTitle.textContent = 'No track'; return; }
 audio.src = playlist[i].src;
 trackTitle.textContent = playlist[i].title;
 audio.load();
  }
  function playPause() {
 if (audio.paused) { audio.play(); playBtn.textContent = 'Pause'; }
 else { audio.pause(); playBtn.textContent = 'Play'; }
  }
  playBtn.addEventListener('click', playPause);
 prevBtn.addEventListener('click', ()=> { idx = (idx-1+playlist.length)%playlist.length; loadTrack(idx); audio.play(); playBtn.textContent='Pause'; });
 nextBtn.addEventListener('click', ()=> { idx = (idx+1)%playlist.length; loadTrack(idx); audio.play(); playBtn.textContent='Pause'; });
 listItems.forEach((li,i)=> li.addEventListener('click', ()=> { idx = i; loadTrack(i); audio.play(); playBtn.textContent='Pause'; }));
 audio.addEventListener('timeupdate', ()=> { if (audio.duration) seek.value = Math.floor((audio.currentTime/audio.duration)100); });
 seek.addEventListener('input', ()=> { if (audio.duration) audio.currentTime = (seek.value/100)audio.duration; });
 audio.addEventListener('ended', ()=> { idx = (idx+1)%playlist.length; loadTrack(idx); audio.play(); });
  loadTrack(idk);
});
