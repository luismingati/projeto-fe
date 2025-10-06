(function () {
  var form = document.getElementById('passwordForm');
  var emailInput = document.getElementById('passwordEmail');
  var passwordInput = document.getElementById('passwordNew');
  var confirmInput = document.getElementById('passwordConfirm');
  var message = document.getElementById('passwordMessage');

  var allowedSpecial = "@#$%&*!?/\\|-_+.=";
  var blockedCharacters = "\u00a8{}[]\u00b4`~^:;<>,'\\"\u201c\u201d\u2018\u2019";

  function showMessage(text, isError) {
    if (!message) {
      if (isError) {
        window.alert(text);
      }
      return;
    }
    message.textContent = text;
    message.classList.remove('success', 'error');
    message.classList.add(isError ? 'error' : 'success');
    message.style.display = 'block';
  }

  function hideMessage() {
    if (message) {
      message.textContent = '';
      message.style.display = 'none';
      message.classList.remove('success', 'error');
    }
  }

  function isValidEmail(value) {
    var emailRegex = /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/;
    return emailRegex.test(String(value || '').trim());
  }

  function hasBlockedCharacters(password) {
    for (var i = 0; i < blockedCharacters.length; i += 1) {
      if (blockedCharacters[i] && password.indexOf(blockedCharacters[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  function hasAllowedSpecial(password) {
    for (var i = 0; i < allowedSpecial.length; i += 1) {
      if (password.indexOf(allowedSpecial[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  function validatePassword(password) {
    if (!password || password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Inclua pelo menos uma letra maiuscula.';
    }
    if (!/\d/.test(password)) {
      return 'Inclua pelo menos um numero.';
    }
    if (!hasAllowedSpecial(password)) {
      return 'Inclua ao menos um caracter especial permitido.';
    }
    if (hasBlockedCharacters(password)) {
      return 'Remova caracteres especiais nao permitidos.';
    }
    return '';
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      hideMessage();

      var emailValue = emailInput ? emailInput.value.trim() : '';
      var passwordValue = passwordInput ? passwordInput.value : '';
      var confirmValue = confirmInput ? confirmInput.value : '';

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
        showMessage('Digite a nova senha.', true);
        if (passwordInput) {
          passwordInput.focus();
        }
        return;
      }

      if (!confirmValue) {
        showMessage('Confirme a nova senha.', true);
        if (confirmInput) {
          confirmInput.focus();
        }
        return;
      }

      var passwordError = validatePassword(passwordValue);
      if (passwordError) {
        showMessage(passwordError, true);
        if (passwordInput) {
          passwordInput.focus();
        }
        return;
      }

      if (passwordValue !== confirmValue) {
        showMessage('As senhas devem ser iguais.', true);
        if (confirmInput) {
          confirmInput.focus();
        }
        return;
      }

      showMessage('Validacao realizada com sucesso.', false);
      window.setTimeout(function () {
        window.history.back();
      }, 900);
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
        if (confirmInput) {
          confirmInput.value = '';
        }
      }, 0);
    });
  }

  if (emailInput) {
    emailInput.focus();
  }
})();
