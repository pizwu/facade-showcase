(function () {
  // Load shared nav & footer fragments, then initialize mobile menu
  function loadFragment(url, placeholder) {
    return fetch(url)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        var temp = document.createElement('div');
        temp.innerHTML = html;
        while (temp.firstChild) {
          placeholder.parentNode.insertBefore(temp.firstChild, placeholder);
        }
        placeholder.remove();
      });
  }

  var navSlot = document.getElementById('shared-nav');
  var footerSlot = document.getElementById('shared-footer');

  var tasks = [];
  if (navSlot) tasks.push(loadFragment('_nav.html', navSlot));
  if (footerSlot) tasks.push(loadFragment('_footer.html', footerSlot));

  Promise.all(tasks).then(function () {
    // Mobile menu toggle
    var hamburger = document.querySelector('.nav-hamburger');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      });
      mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }

    // Re-run scroll reveal observer for dynamically loaded content
    document.querySelectorAll('.reveal').forEach(function (el) {
      if (typeof observer !== 'undefined') observer.observe(el);
    });
  });
})();
