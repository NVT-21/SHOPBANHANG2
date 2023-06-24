const handlebars = require('handlebars');

// Đăng ký helper 'add'
handlebars.registerHelper('add', function (value1, value2) {
    const num1 = parseInt(value1);
    const num2 = parseInt(value2);
    return num1 + num2;
  });
  
  // Định nghĩa helper trừ
  handlebars.registerHelper('subtract', function (value1, value2) {
    return value1 - value2;
  });
  handlebars.registerHelper('limit', function (value, max) {
    if (value < 1) {
      return 1;
    }
    if (value > max) {
      return max;
    }
    return value;
  });
module.exports = handlebars;
