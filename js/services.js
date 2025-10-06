(function () {
  var serviceSelect = document.getElementById('serviceType');
  var priceLabel = document.getElementById('servicePrice');
  var leadLabel = document.getElementById('serviceLead');
  var dateLabel = document.getElementById('serviceDate');
  var historyTable = document.getElementById('historyTable');
  var form = document.getElementById('serviceForm');
  var servicesMap = {
    cloud: { name: 'Arquitetura Cloud', price: 12500, lead: 15 },
    devops: { name: 'DevOps Performance', price: 8750, lead: 20 },
    security: { name: 'Ciberseguranca 24/7', price: 9800, lead: 10 },
    analytics: { name: 'Analytics e AI', price: 14900, lead: 25 },
    support: { name: 'Suporte Gerenciado', price: 4200, lead: 7 }
  };

  function formatCurrency(value) {
    return 'R$ ' + value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatDateISO(date) {
    return date.toISOString().slice(0, 10);
  }

  function formatDateBR(date) {
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
  }

  function updateServiceDetails() {
    var key = serviceSelect ? serviceSelect.value : '';
    var service = servicesMap[key];
    if (!service) {
      return;
    }
    if (priceLabel) {
      priceLabel.textContent = formatCurrency(service.price);
    }
    if (leadLabel) {
      leadLabel.textContent = service.lead + ' dias';
    }
    if (dateLabel) {
      var forecast = new Date();
      forecast.setDate(forecast.getDate() + service.lead);
      dateLabel.textContent = formatDateBR(forecast);
    }
  }

  function removeRow(event) {
    var trigger = event.target;
    if (!trigger || trigger.getAttribute('data-action') !== 'remove') {
      return;
    }
    event.preventDefault();
    var row = trigger.closest('tr');
    if (row && row.parentElement) {
      row.parentElement.removeChild(row);
    }
  }

  function bindDeleteButtons() {
    if (!historyTable) {
      return;
    }
    historyTable.querySelectorAll('[data-action="remove"]').forEach(function (button) {
      button.removeEventListener('click', removeRow);
      button.addEventListener('click', removeRow);
    });
  }

  function sortRows() {
    if (!historyTable) {
      return;
    }
    var tbody = historyTable.querySelector('tbody');
    if (!tbody) {
      return;
    }
    var rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort(function (a, b) {
      var dateA = a.cells[0].textContent;
      var dateB = b.cells[0].textContent;
      return dateA.localeCompare(dateB);
    });
    rows.forEach(function (row) {
      tbody.appendChild(row);
    });
  }

  function generateId() {
    return 'SRV-' + Math.floor(Math.random() * 9000 + 1000);
  }

  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateServiceDetails);
    updateServiceDetails();
  }

  if (historyTable) {
    bindDeleteButtons();
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!serviceSelect || !historyTable) {
        return;
      }
      var service = servicesMap[serviceSelect.value];
      if (!service) {
        return;
      }
      var today = new Date();
      var requestDate = formatDateISO(today);
      var forecast = new Date();
      forecast.setDate(forecast.getDate() + service.lead);
      var serviceRow = document.createElement('tr');
      serviceRow.setAttribute('data-id', generateId());
      serviceRow.innerHTML = [
        '<td>' + requestDate + '</td>',
        '<td>' + serviceRow.getAttribute('data-id') + '</td>',
        '<td>' + service.name + '</td>',
        '<td>EM ELABORACAO</td>',
        '<td>' + formatCurrency(service.price) + '</td>',
        '<td>' + formatDateISO(forecast) + '</td>',
        '<td><button type="button" class="btn secondary" data-action="remove">Excluir</button></td>'
      ].join('');

      historyTable.querySelector('tbody').appendChild(serviceRow);
      bindDeleteButtons();
      sortRows();
      window.alert('Solicitacao incluida no carrinho.');
    });
  }
})();
