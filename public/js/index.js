'use strict';

(function (global) {
  function getPathname (obj) {
    return obj.pathname;
  }
  if (getPathname(window.location) === '/users/register' ||
    getPathname(window.location) === '/users/nexmo') {
    const signupBtn = global.getElementById('signup-btn') || null;
    if (signupBtn) {
      signupBtn.classList.add('active');
    }
  }

  if (getPathname(window.location) === '/users/login') {
    const loginBtn = global.getElementById('login-btn') || null;
    if (loginBtn) {
      loginBtn.classList.add('active');
    }
  }
})(document);
