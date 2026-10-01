// ===== Ganti nomor WhatsApp (format internasional, tanpa + atau spasi) =====
const NOMOR_WA = '62XXXXXXXXXX';

// ===== Slot foto =====
// Klik kotak putus-putus untuk memilih foto (sementara), atau tambahkan data-src="img/foto.jpg" agar permanen.
document.querySelectorAll('.photo-slot').forEach(slot => {
  const setImage = url => {
    let img = slot.querySelector('img');
    if (!img) { img = document.createElement('img'); slot.appendChild(img); }
    img.src = url;
    img.alt = slot.dataset.label || '';
    slot.classList.add('has-img');
  };
  if (slot.dataset.src) setImage(slot.dataset.src);

  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*'; input.hidden = true;
  slot.appendChild(input);
  slot.tabIndex = 0;
  slot.setAttribute('role', 'button');
  slot.setAttribute('aria-label', 'Tambah foto: ' + (slot.dataset.label || ''));
  slot.addEventListener('click', e => { if (e.target !== input) input.click(); });
  slot.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
  });
  input.addEventListener('change', () => {
    if (input.files[0]) setImage(URL.createObjectURL(input.files[0]));
  });
});

// ===== Menu mobile =====
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded', nav.classList.toggle('open'));
});
nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', false); }
});

// ===== Tombol "Pilih layanan" mengisi pilihan di form =====
const select = document.getElementById('layanan');
document.querySelectorAll('[data-layanan]').forEach(btn =>
  btn.addEventListener('click', () => { select.value = btn.dataset.layanan; }));

// ===== Form kontak -> WhatsApp =====
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const nama = form.nama.value.trim();
  if (!nama) { msg.textContent = 'Isi nama kamu dulu.'; form.nama.focus(); return; }
  const teks = `Halo Hacikda Accounting, saya ${nama}. Saya tertarik dengan layanan ${select.value}.`;
  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`, '_blank', 'noopener');
  msg.textContent = 'Membuka WhatsApp...';
});

// ===== Ticker & tahun =====
const track = document.querySelector('.ticker-track');
if (track) for (let i = 0; i < 3; i++) track.innerHTML += track.innerHTML; // 8 salinan, geser 50% = loop mulus
document.getElementById('year').textContent = new Date().getFullYear();
