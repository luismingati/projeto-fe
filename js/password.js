(function () {
  const form = document.getElementById('passwordForm');
  const emailInput = document.getElementById('passwordEmail');
  const passwordInput = document.getElementById('passwordNew');
  const confirmInput = document.getElementById('passwordConfirm');
  const message = document.getElementById('passwordMessage');

  console.log('Password.js carregado');
  console.log('Form encontrado:', !!form);
  console.log('Message element encontrado:', !!message);

  const allowedSpecial = "@#$%&*!?/\\|-_+.=";
  const blockedCharacters = "\"{}[] ́`~^:;<>,'“‘";

  function showMessage(text, isError) {
    console.log('showMessage chamada:', text, 'isError:', isError);
    if (!message) {
      console.log('Elemento message n\u00e3o encontrado, usando alert');
      if (isError) {
        window.alert(text);
      }
      return;
    }
    message.textContent = text;
    message.classList.remove('success', 'error');
    message.classList.add(isError ? 'error' : 'success');
    message.style.display = 'block';
    console.log('Mensagem exibida, display:', message.style.display, 'classes:', message.className);
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
    for (const element of blockedCharacters) {
      if (element && password.indexOf(element) !== -1) {
        return true;
      }
    }
    return false;
  }

  function hasAllowedSpecial(password) {
    for (const element of allowedSpecial) {
      if (password.indexOf(element) !== -1) {
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
    console.log('Adicionando event listener ao form');
    form.addEventListener('submit', function (event) {
      console.log('Submit event triggered');
      event.preventDefault();
      hideMessage();

      const emailValue = emailInput ? emailInput.value.trim() : '';
      const passwordValue = passwordInput ? passwordInput.value : '';
      const confirmValue = confirmInput ? confirmInput.value : '';

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

      const passwordError = validatePassword(passwordValue);
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
