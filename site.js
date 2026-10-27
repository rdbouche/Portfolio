(function(){
  /* respect reduced motion: don't autoplay videos */
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('video[autoplay]').forEach(function(v){v.removeAttribute('autoplay');v.pause();v.setAttribute('controls','');});
  }
  var items=[].slice.call(document.querySelectorAll('[data-lightbox]'));
  if(!items.length)return;
  var dlg=document.createElement('dialog');
  dlg.className='lightbox';dlg.setAttribute('aria-label','Enlarged image');
  dlg.innerHTML='<button type="button" class="lb-close" aria-label="Close">\u00d7</button>'+
    '<button type="button" class="lb-nav lb-prev" aria-label="Previous image">\u2039</button>'+
    '<figure><img alt=""><figcaption></figcaption></figure>'+
    '<button type="button" class="lb-nav lb-next" aria-label="Next image">\u203a</button>';
  document.body.appendChild(dlg);
  var img=dlg.querySelector('img'),cap=dlg.querySelector('figcaption'),group=[],idx=0,opener=null;
  function show(i){
    idx=(i+group.length)%group.length;var b=group[idx];
    img.src=b.dataset.full;img.alt=b.dataset.alt||'';
    cap.textContent='';
    if(b.dataset.paper){
      var a=document.createElement('a');a.href=b.dataset.url;a.target='_blank';a.rel='noopener';a.textContent=b.dataset.paper;
      cap.appendChild(a);cap.appendChild(document.createTextNode(' '+(b.dataset.venue||'')));
    }
    dlg.classList.toggle('single',group.length<2);
  }
  function close(){if(dlg.close)dlg.close();else dlg.removeAttribute('open');}
  items.forEach(function(b){
    b.addEventListener('click',function(){
      opener=b;var g=b.closest('[data-gallery]');
      group=[].slice.call((g||document).querySelectorAll('[data-lightbox]'));
      show(group.indexOf(b));
      if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');
      dlg.querySelector('.lb-close').focus();
    });
  });
  dlg.querySelector('.lb-close').addEventListener('click',close);
  dlg.querySelector('.lb-prev').addEventListener('click',function(){show(idx-1);});
  dlg.querySelector('.lb-next').addEventListener('click',function(){show(idx+1);});
  dlg.addEventListener('click',function(e){if(e.target===dlg)close();});
  dlg.addEventListener('keydown',function(e){
    if(e.key==='ArrowLeft'){e.preventDefault();show(idx-1);}
    if(e.key==='ArrowRight'){e.preventDefault();show(idx+1);}
  });
  dlg.addEventListener('close',function(){if(opener)opener.focus();});
})();
