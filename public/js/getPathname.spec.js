const getPathname = require('./getPathname');

test('Should return string', () => {
  const obj = {};
  obj.pathname = '/users/nexmo';
  expect(getPathname(obj)).toMatch(/[a-z\-._~%!$&'()*+,;=:@/]/);
});

test('Should return string', () => {
  const obj = {};
  obj.pathname = '/';
  expect(getPathname(obj)).toMatch(/[a-z\-._~%!$&'()*+,;=:@/]/);
});

test('Should return string', () => {
  const obj = {};
  obj.pathname = '/users';
  expect(getPathname(obj)).toMatch(/[a-z\-._~%!$&'()*+,;=:@/]/);
});
