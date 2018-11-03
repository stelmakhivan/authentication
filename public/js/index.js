'use strict';

(function (global) {
  if (window.location.pathname === '/users/register' ||
    window.location.pathname === '/users/nexmo') {
    const signupBtn = global.getElementById('signup-btn');
    signupBtn.classList.add('active');
  }

  if (window.location.pathname === '/users/login') {
    const loginBtn = global.getElementById('login-btn');
    loginBtn.classList.add('active');
  }
})(document);
