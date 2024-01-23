const debtRageValue = document.getElementById('debtvalue');
const monthRageValue = document.getElementById('monthvalue');
const formatRageValue = document.getElementById('formatvalue');
const month = document.getElementById('formatMonth');
const requestBtn = document.getElementById('requestBtn');
const output = document.getElementById('output');
let updatingSliders = false;

noUiSlider.create(debtSlider, {
  start: 100000,
  connect: 'lower',
  step: 1000,
  range: {
    'min': 10000,
    'max': 1000000
  },
  format: wNumb({
    decimals: 0,
  }),
});

noUiSlider.create(terminSlider, {
  start: 5,
  connect: 'lower',
  step: 1,
  range: {
    'min': 1,
    'max': 24
  },
  format: wNumb({
    decimals: 0,
  }),
});

debtRageValue.addEventListener("input", function() {
  debtSlider.noUiSlider.set([this.value]);
});

terminSlider.noUiSlider.on('update', function (values) {
  if (updatingSliders) return;
  updatingSliders = true;

  const selectedTerm = parseInt(values[0]);
  const selectedDebt = debtSlider.noUiSlider.get();
  const minPayment = Math.round(selectedDebt / selectedTerm);

  if (minPayment < 1500) {
    const newMaxMonths = Math.min(24, Math.ceil(selectedDebt / 1500));
    if (newMaxMonths !== terminSlider.noUiSlider.options.range.max) {
      terminSlider.noUiSlider.updateOptions({ range: { 'min': 1, 'max': newMaxMonths } });
      const currentTerm = terminSlider.noUiSlider.get();
      if (currentTerm > newMaxMonths) {
        terminSlider.noUiSlider.set(newMaxMonths);
      }
    }
  }

  updatingSliders = false;
});

formatRageValue.addEventListener("input", function() {
  terminSlider.noUiSlider.set([this.value]);
});

terminSlider.noUiSlider.on('update', function(values) {
  formatRageValue.value = values;

  function formatRangeValues(values) {
    if (values > 4) {
      return " месяцев";
    } else if (values > 1) {
      return " месяца";
    } else {
      return " месяц";
    }
  }
  month.innerText = formatRangeValues(values);

  const debt = debtSlider.noUiSlider.get();
  monthRageValue.innerText = Math.round(debt / values) + ' ₽';
});

terminSlider.noUiSlider.on('update', function (values) {
  if (updatingSliders) return;
  updatingSliders = true;

  const selectedTerm = parseInt(values[0]);
  const selectedDebt = debtSlider.noUiSlider.get();
  const minPayment = Math.round(selectedDebt / selectedTerm);

  if (minPayment < 1500) {
    const newMaxMonths = Math.min(24, Math.ceil(selectedDebt / 1500));
    if (newMaxMonths !== terminSlider.noUiSlider.options.range.max) {
      terminSlider.noUiSlider.updateOptions({ range: { 'min': 1, 'max': newMaxMonths } });
      const currentTerm = terminSlider.noUiSlider.get();
      if (currentTerm > newMaxMonths) {
        terminSlider.noUiSlider.set(newMaxMonths);
      }
    }
  }

  updatingSliders = false;
});

debtSlider.noUiSlider.on('update', function (values, handle) {
  if (updatingSliders) return;
  updatingSliders = true;

  debtRageValue.value = values[handle] + ' ₽';
  const term = terminSlider.noUiSlider.get();
  monthRageValue.innerText = Math.round(values[handle] / term) + ' ₽';

  const maxMonthsBasedOnDebt = Math.min(24, Math.ceil(values[handle] / 1500)-1);
  if (maxMonthsBasedOnDebt !== terminSlider.noUiSlider.options.range.max) {
    terminSlider.noUiSlider.updateOptions({ range: { 'min': 1, 'max': maxMonthsBasedOnDebt } });
    const selectedTerm = terminSlider.noUiSlider.get();
    if (selectedTerm > maxMonthsBasedOnDebt) {
      terminSlider.noUiSlider.set(maxMonthsBasedOnDebt);
    }
  }

  updatingSliders = false;
});

requestBtn.addEventListener('click', updateOutput);

function formatRangeValues(values) {
  if (values > 4) {
    return " месяцев";
  } else if (values > 1) {
    return " месяца";
  } else {
    return " месяц";
  }
}

function updateOutput() {
  const range1Value = debtSlider.noUiSlider.get() + ' ₽';
  const range2Value = Math.round(debtSlider.noUiSlider.get() / terminSlider.noUiSlider.get());
  const range3Value = terminSlider.noUiSlider.get();
  const formattedValue = formatRangeValues(range3Value);
  output.value = `Прошу согласовать рассрочку на сумму: ${range1Value}, Ежемесячный платёж составит: ${range2Value} ₽, Срок погашения: ${range3Value}${formattedValue}`;
}
