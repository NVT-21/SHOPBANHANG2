const showAlert = (type, msg) => {
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  
    // Remove alert after 5 seconds
    setTimeout(() => {
      const alert = document.querySelector('.alert');
      if (alert) alert.parentElement.removeChild(alert);
    }, 5000);
  };
module.exports =showAlert;
