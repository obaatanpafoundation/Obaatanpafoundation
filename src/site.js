// Mobile navigation
(function(){
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if(!btn || !nav) return;
  btn.addEventListener('click', function(){
    var open = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', String(!open));
    btn.setAttribute('aria-expanded', String(!open));
    btn.textContent = open ? 'Menu' : 'Close';
  });
  nav.addEventListener('click', function(e){
    if(e.target.tagName === 'A' && window.innerWidth <= 900){
      nav.setAttribute('data-open','false');
      btn.setAttribute('aria-expanded','false');
      btn.textContent = 'Menu';
    }
  });
})();

// Giving amounts — shows what each amount pays for
(function(){
  var buttons = document.querySelectorAll('.amt');
  var effect  = document.getElementById('effect');
  var giveBtn = document.getElementById('give-btn');
  var custom  = document.getElementById('custom-amount');
  if(!buttons.length) return;

  function format(n){ return Number(n).toLocaleString('en-GH'); }

  buttons.forEach(function(b){
    b.addEventListener('click', function(){
      buttons.forEach(function(x){ x.setAttribute('aria-pressed','false'); });
      b.setAttribute('aria-pressed','true');
      if(custom) custom.value = '';
      effect.textContent = b.dataset.effect;
      giveBtn.textContent = 'Give GH₵' + format(b.dataset.amount);
    });
  });

  if(custom){
    custom.addEventListener('input', function(){
      var v = custom.value.trim();
      if(!v){ return; }
      buttons.forEach(function(x){ x.setAttribute('aria-pressed','false'); });
      effect.textContent = 'Every cedi goes into the same three programmes. We will write and tell you what yours paid for.';
      giveBtn.textContent = 'Give GH₵' + format(v);
    });
  }
})();

// Current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Donate page: switch between one-off and monthly giving
(function(){
  var toggle = document.getElementById('freq-toggle');
  if(!toggle) return;
  var buttons = toggle.querySelectorAll('button');
  var amounts = document.querySelectorAll('.amt');
  var effect  = document.getElementById('effect');
  var giveBtn = document.getElementById('give-btn');

  function apply(mode){
    buttons.forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.mode === mode)); });
    amounts.forEach(function(a){
      a.textContent = 'GH\u20B5' + Number(a.dataset.amount).toLocaleString('en-GH') + (mode === 'monthly' ? '/mo' : '');
      a.dataset.effect = (mode === 'monthly' ? a.dataset.monthly : a.dataset.once);
      if(a.getAttribute('aria-pressed') === 'true'){
        effect.textContent = a.dataset.effect;
        giveBtn.textContent = (mode === 'monthly' ? 'Give monthly' : 'Give') +
          ' GH\u20B5' + Number(a.dataset.amount).toLocaleString('en-GH');
      }
    });
  }
  var mode = 'once';
  buttons.forEach(function(b){
    b.addEventListener('click', function(){ mode = b.dataset.mode; apply(mode); });
  });
  // re-apply after the shared amount handler runs, so the label keeps /mo
  amounts.forEach(function(a){ a.addEventListener('click', function(){ apply(mode); }); });
  apply('once');
})();

// Contact form: the form does not submit anywhere until you connect a handler
(function(){
  var form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var note = document.getElementById('form-status');
    note.textContent = 'This form is not connected yet. Until it is, please email hello@obaatanpafoundation.org.';
    note.style.color = '#8A3324';
  });
})();
