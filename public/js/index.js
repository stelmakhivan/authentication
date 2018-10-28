'use strict';

(function (global) {
  const formHeader = global.getElementById('form-header');

  function toggleForm (target, {loginBtn, signupBtn, loginBody, signupBody}) {
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
  }

  formHeader.addEventListener('click', ({target} = event) => {
    const formObject = {
      loginBtn: global.getElementById('login-btn'),
      signupBtn: global.getElementById('signup-btn'),
      loginBody: global.getElementById('login-form'),
      signupBody: global.getElementById('signup-form')
    };
    toggleForm(target, formObject);
  });
})(document);
