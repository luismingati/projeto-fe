(function () {
  const form = document.getElementById('registerForm');
  const emailInput = document.getElementById('registerEmail');
  const passwordInput = document.getElementById('registerPassword');
  const confirmInput = document.getElementById('registerConfirm');
  const nameInput = document.getElementById('registerName');
  const cpfInput = document.getElementById('registerCpf');
  const birthInput = document.getElementById('registerBirth');
  const phoneInput = document.getElementById('registerPhone');
  const message = document.getElementById('registerMessage');
  const backButton = document.getElementById('backRegister');
  const allowedSpecial = "@#$%&*!?/\\|-_+.=";
  const blockedCharacters = "\"{}[] ́`~^:;<>,'“‘";

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
    const emailRegex = /^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/;
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

  function stripNonDigits(value) {
    return (value || '').replace(/\D/g, '');
  }

  function formatCpf(value) {
    var digits = stripNonDigits(value).slice(0, 11);
    var formatted = digits;
    if (digits.length > 3) {
      formatted = digits.slice(0, 3) + '.' + digits.slice(3);
    }
    if (digits.length > 6) {
      formatted = formatted.slice(0, 7) + '.' + formatted.slice(7);
    }
    if (digits.length > 9) {
      formatted = formatted.slice(0, 11) + '-' + formatted.slice(11);
    }
    return formatted;
  }

  function cpfDigits(cpf) {
    return stripNonDigits(cpf);
  }

  function isValidCpf(value) {
    var cpf = cpfDigits(value);
    if (!cpf || cpf.length !== 11) {
      return false;
    }
    if (/^([0-9])\1+$/.test(cpf)) {
      return false;
    }
    var sum = 0;
    for (var i = 0; i < 9; i += 1) {
      sum += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    var firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) {
      firstDigit = 0;
    }
    if (firstDigit !== parseInt(cpf.charAt(9), 10)) {
      return false;
    }
    sum = 0;
    for (var j = 0; j < 10; j += 1) {
      sum += parseInt(cpf.charAt(j), 10) * (11 - j);
    }
    var secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) {
      secondDigit = 0;
    }
    return secondDigit === parseInt(cpf.charAt(10), 10);
  }

  function isAdult(dateString) {
    if (!dateString) {
      return false;
    }
    var today = new Date();
    var birthDate = new Date(dateString + 'T00:00:00');
    if (Number.isNaN(birthDate.getTime())) {
      return false;
    }
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age >= 18;
  }

  function isValidName(value) {
    var name = String(value || '').trim();
    if (!name) {
      return { valid: false, message: 'Informe o nome completo.' };
    }
    var parts = name.split(/\s+/);
    if (parts.length < 2) {
      return { valid: false, message: 'Informe pelo menos nome e sobrenome.' };
    }
    if (parts[0].length < 2) {
      return { valid: false, message: 'O primeiro nome deve ter ao menos 2 letras.' };
    }
    var nameRegex = /^[A-Za-z\u00C0-\u017F\s]+$/;
    if (!nameRegex.test(name)) {
      return { valid: false, message: 'Nao use caracteres especiais no nome.' };
    }
    return { valid: true, message: '' };
  }

  function isValidPhone(value) {
    if (!value) {
      return true;
    }
    var phoneRegex = /^\(?(\d{2})\)?\s?\d{4,5}-?\d{4}$/;
    return phoneRegex.test(value.trim());
  }

  if (cpfInput) {
    cpfInput.addEventListener('input', function () {
      var cursor = cpfInput.selectionStart;
      var prevLength = cpfInput.value.length;
      cpfInput.value = formatCpf(cpfInput.value);
      var newLength = cpfInput.value.length;
      cpfInput.setSelectionRange(cursor + (newLength - prevLength), cursor + (newLength - prevLength));
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var digits = stripNonDigits(phoneInput.value).slice(0, 11);
      if (!digits) {
        phoneInput.value = '';
        return;
      }
      var result = '';
      if (digits.length <= 2) {
        result = '(' + digits;
      } else if (digits.length <= 7) {
        result = '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
      } else if (digits.length <= 11) {
        result = '(' + digits.slice(0, 2) + ') ' + digits.slice(2, digits.length - 4) + '-' + digits.slice(-4);
      }
      phoneInput.value = result;
    });
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      hideMessage();

      var emailValue = emailInput ? emailInput.value.trim() : '';
      var passwordValue = passwordInput ? passwordInput.value : '';
      var confirmValue = confirmInput ? confirmInput.value : '';
      var nameValue = nameInput ? nameInput.value : '';
      var cpfValue = cpfInput ? cpfInput.value : '';
      var birthValue = birthInput ? birthInput.value : '';
      var phoneValue = phoneInput ? phoneInput.value : '';

      if (!emailValue) {
        showMessage('Informe o e-mail.', true);
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
        showMessage('Informe a senha.', true);
        if (passwordInput) {
          passwordInput.focus();
        }
        return;
      }

      if (!confirmValue) {
        showMessage('Confirme a senha.', true);
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

      var nameValidation = isValidName(nameValue);
      if (!nameValidation.valid) {
        showMessage(nameValidation.message, true);
        if (nameInput) {
          nameInput.focus();
        }
        return;
      }

      if (!cpfValue) {
        showMessage('Informe o CPF.', true);
        if (cpfInput) {
          cpfInput.focus();
        }
        return;
      }

      if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfValue)) {
        showMessage('Use o formato 000.000.000-00.', true);
        if (cpfInput) {
          cpfInput.focus();
        }
        return;
      }

      if (!isValidCpf(cpfValue)) {
        showMessage('CPF invalido.', true);
        if (cpfInput) {
          cpfInput.focus();
        }
        return;
      }

      if (!birthValue) {
        showMessage('Informe a data de nascimento.', true);
        if (birthInput) {
          birthInput.focus();
        }
        return;
      }

      if (!isAdult(birthValue)) {
        showMessage('Cadastro permitido somente para maiores de 18 anos.', true);
        if (birthInput) {
          birthInput.focus();
        }
        return;
      }

      if (!isValidPhone(phoneValue)) {
        showMessage('Telefone invalido. Use (11) 99999-9999.', true);
        if (phoneInput) {
          phoneInput.focus();
        }
        return;
      }

      showMessage('Validacao realizada com sucesso.', false);
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
        if (nameInput) {
          nameInput.value = '';
        }
        if (cpfInput) {
          cpfInput.value = '';
        }
        if (birthInput) {
          birthInput.value = '';
        }
        if (phoneInput) {
          phoneInput.value = '';
        }
      }, 0);
    });
  }

  if (backButton) {
    backButton.addEventListener('click', function () {
      window.history.back();
    });
  }

  if (emailInput) {
    emailInput.focus();
  }
})();
