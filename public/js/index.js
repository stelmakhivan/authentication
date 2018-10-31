'use strict';

(function (global) {
  const formHeader = global.getElementById('form-header');
  // const loginForm = global.getElementById('login-form');
  const signupForm = global.getElementById('signup-form');
  const verificateBtn = global.getElementById('verificate');

  verificateBtn.addEventListener('click', e => {
    e.preventDefault();

    const number = signupForm['signup-phone'].value;
    const obj = {
      number
    };

    fetch('http://localhost:8080/nexmo', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.text())
      .then(data => console.warn(data))
      .catch(err => (console.warn(err)));
  });

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
