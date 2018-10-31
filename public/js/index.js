'use strict';

(function (global) {
  // const formHeader = global.getElementById('form-header');


  if (window.location.pathname === '/users/register') {
    const signupBtn = global.getElementById('signup-btn');
    signupBtn.classList.add('active');

    const signupForm = global.getElementById('signup-form');
    const verificateBtn = global.getElementById('verificate');

    verificateBtn.addEventListener('click', e => {
      e.preventDefault();

      const number = signupForm['signup-phone'].value;
      const obj = {
        number
      };

      fetch('/users/nexmo', {
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
  }

  if (window.location.pathname === '/users/login') {
    const loginBtn = global.getElementById('login-btn');
    loginBtn.classList.add('active');
  }

  // const loginForm = global.getElementById('login-form');

  // function toggleForm (target, {loginBtn, signupBtn}) {
  //   if (target.classList.contains('login')) {
  //     loginBtn.classList.add('active');
  //     signupBtn.classList.remove('active');
  //   } else {
  //     loginBtn.classList.remove('active');
  //     signupBtn.classList.add('active');
  //   }
  // }

  // formHeader.addEventListener('click', ({target} = event) => {
  //   const formObject = {
  //     loginBtn: global.getElementById('login-btn'),
  //     signupBtn: global.getElementById('signup-btn'),
  //   };
  //   toggleForm(target, formObject);
  // });
})(document);
