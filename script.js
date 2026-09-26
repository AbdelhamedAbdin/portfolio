// Set this to the KyroStack WhatsApp number with country code, digits only (e.g. 201XXXXXXXXX).
const WHATSAPP_NUMBER = '';
const message = encodeURIComponent("Hello KyroStack, I'd like to discuss a project.");
const whatsappLink = document.querySelector('#whatsapp-link');
if (WHATSAPP_NUMBER) {
  whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  document.querySelector('#contact-note').textContent = 'A chat with KyroStack opens in WhatsApp.';
}
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {const expanded = menu.getAttribute('aria-expanded') === 'true';menu.setAttribute('aria-expanded',String(!expanded));menu.setAttribute('aria-label',expanded?'Open menu':'Close menu');nav.classList.toggle('open',!expanded)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu')}));
const reviews = [
  'Such a professional!!! So lucky to work with Abdelhamed! So, so grateful for his attention to detail. A great communicator, patient and 100%...',
  'Web Application To Read From Google Scholar. I am lucky to work with him. Highly recommend.',
  'Abdelhamed is a hardworking developer who is patient, oriented to details. He is willing to do revisions for multiple times without complaints unt...'
];
let current=1,playing=true,timer;
const dots=document.querySelector('#review-dots');
reviews.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Show review ${i+1}`);b.addEventListener('click',()=>show(i));dots.append(b)});
function show(i){current=(i+reviews.length)%reviews.length;document.querySelector('#featured-quote').textContent=`“${reviews[current]}”`;dots.querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-current',String(j===current)))}
function schedule(){clearInterval(timer);if(playing)timer=setInterval(()=>show(current+1),6000)}
document.querySelector('#review-prev').addEventListener('click',()=>{show(current-1);schedule()});document.querySelector('#review-next').addEventListener('click',()=>{show(current+1);schedule()});
document.querySelector('#review-autoplay').addEventListener('click',e=>{playing=!playing;e.currentTarget.textContent=playing?'Pause auto-play':'Resume auto-play';schedule()});show(current);schedule();document.querySelector('#year').textContent=new Date().getFullYear();
