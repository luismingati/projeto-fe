(function () {
  var emailInput = document.getElementById('loginEmail');
  var passwordInput = document.getElementById('loginPassword');
  var form = document.getElementById('loginForm');
  var message = document.getElementById('loginMessage');

  function showMessage(text, isError) {
    if (!message) {
      if (isError) {
        window.alert(text);
      }
      return;
    }
    message.textContent = text;
    message.classList.remove('success', 'error');
    message.style.display = 'block';
    message.classList.add(isError ? 'error' : 'success');
  }

  function hideMessage() {
    if (message) {
      message.style.display = 'none';
      message.textContent = '';
      message.classList.remove('success', 'error');
    }
  }

  function isValidEmail(value) {
    var emailRegex = /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/;
    return emailRegex.test(String(value || '').trim());
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      hideMessage();

      var emailValue = emailInput ? emailInput.value.trim() : '';
      var passwordValue = passwordInput ? passwordInput.value : '';

      if (!emailValue) {
        showMessage('Informe o login (formato e-mail).', true);
        if (emailInput) {
          emailInput.focus();
        }
        return;
      }

      if (!isValidEmail(emailValue)) {
        showMessage('Digite um e-mail valido.', true);
        if (emailInput) {
          emailInput.focus();
        }
        return;
      }

      if (!passwordValue) {
        showMessage('Digite sua senha.', true);
        if (passwordInput) {
          passwordInput.focus();
        }
        return;
      }

      showMessage('Validacao realizada com sucesso.', false);
      sessionStorage.setItem('technovaLoggedIn', 'true');
      window.location.href = 'index.html';
    });

    form.addEventListener('reset', function () {
      window.setTimeout(function () {
        hideMessage();
        if (emailInput) {
          emailInput.value = '';
          emailInput.focus();
        }
        if (passwordInput) {
          passwordInput.value = '';
        }
      }, 0);
    });
  }

  if (emailInput) {
    emailInput.focus();
  }
})();
