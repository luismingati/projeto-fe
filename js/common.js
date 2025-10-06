(function () {
  const onReady = function () {
    const yearHolder = document.getElementById('year');
    if (yearHolder) {
      yearHolder.textContent = new Date().getFullYear();
    }

    const serviceLink = document.getElementById('serviceLink');
    const loggedIn = sessionStorage.getItem('technovaLoggedIn') === 'true';
    if (serviceLink) {
      serviceLink.style.display = loggedIn ? 'inline-block' : 'none';
    }

    document.querySelectorAll('[data-logout="true"]').forEach(function (logoutLink) {
      logoutLink.addEventListener('click', function () {
        sessionStorage.removeItem('technovaLoggedIn');
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  } else {
    onReady();
  }
})();
