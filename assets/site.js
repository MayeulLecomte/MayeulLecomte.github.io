var y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

// L'adresse est reconstituée ici pour ne pas l'exposer en clair aux robots spammeurs.
var MAIL = ['mayeul.lecomte','gmail.com'].join('@');
document.querySelectorAll('.reveal-mail').forEach(function(el){
  el.addEventListener('click', function(e){
    if(!el.classList.contains('shown')){
      e.preventDefault();
      el.querySelector('.lbl').textContent = MAIL;
      var ico = el.querySelector('.ico'); if(ico) ico.textContent = '✉️';
      el.setAttribute('href','mailto:'+MAIL);
      el.classList.add('shown');
      if(navigator.clipboard){
        navigator.clipboard.writeText(MAIL).then(function(){
          var tag = document.createElement('span');
          tag.className = 'copied'; tag.textContent = 'copié';
          el.appendChild(tag);
          setTimeout(function(){ tag.remove(); }, 2200);
        }).catch(function(){});
      }
    }
  });
});
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

var io = new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
},{threshold:.12, rootMargin:'0px 0px -8%'});
document.querySelectorAll('.rise').forEach(function(el){ reduce ? el.classList.add('in') : io.observe(el); });

if(!reduce && matchMedia('(hover: hover)').matches){
  var els = [].slice.call(document.querySelectorAll('.orb'));
  var tx=0,ty=0,cx=0,cy=0,raf=null;
  addEventListener('pointermove', function(e){
    tx=(e.clientX/innerWidth-.5)*2; ty=(e.clientY/innerHeight-.5)*2;
    if(!raf) raf=requestAnimationFrame(tick);
  },{passive:true});
  function tick(){
    cx+=(tx-cx)*.06; cy+=(ty-cy)*.06;
    els.forEach(function(el,i){
      var d = 20 + i*7;
      el.style.marginLeft=(cx*d)+'px';
      el.style.marginTop=(cy*d*.6)+'px';
    });
    raf=(Math.abs(tx-cx)>.001||Math.abs(ty-cy)>.001)?requestAnimationFrame(tick):null;
  }
}

// Aperçu Instagram : on masque les vignettes absentes (dépose tes images dans assets/insta/).
var grid = document.getElementById('instaGrid');
if(grid){
  grid.querySelectorAll('img').forEach(function(img){
    img.addEventListener('error', function(){
      img.remove();
      if(!grid.querySelector('img')) grid.remove();
    });
    if(img.complete && img.naturalWidth === 0) img.dispatchEvent(new Event('error'));
  });
}
