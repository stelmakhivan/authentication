'use strict';

(function (global) {
  const formHeader = global.getElementById('form-header');

  formHeader.addEventListener('click', ({target} = event) => {
    const loginBtn = global.getElementById('login-btn');
    const signupBtn = global.getElementById('signup-btn');
    const loginBody = global.getElementById('login-form');
    const signupBody = global.getElementById('signup-form');

    if (target.classList.contains('login')) {
      loginBtn.classList.add('active');
      signupBtn.classList.remove('active');

      loginBody.classList.remove('is-hide');
      signupBody.classList.add('is-hide');
    } else {
      loginBtn.classList.remove('active');
      signupBtn.classList.add('active');

      signupBody.classList.remove('is-hide');
      loginBody.classList.add('is-hide');
    }
  });
})(document);
