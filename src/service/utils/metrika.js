export const METRIKA_STORAGE_KEY = 'noMetrika';
export const METRIKA_QUERY_KEY = 'no-metrika';
const METRIKA_ID = 95726509;

// Настройки события form_start_field: человек начал заполнять поле формы

// С какого символа считается начатым поле, куда вводят текст: ФИО, телефон
// (только цифры после +7), почта, сумма, номер договора, текст обращения,
// дата, набранная руками. Список, файл и дата из календаря - сразу при выборе
export const FIELD_START_MIN_LENGTH = 1;

// Свой порог для отдельных полей, ключ - id поля из атрибута data-field-id.
// Например {name: 3, contractId: 2} - ФИО с третьего символа, номер договора со второго
export const FIELD_START_MIN_LENGTH_BY_FIELD = {};

// Однотипные поля в разных формах получают один id. name, по которому
// бэкенд собирает письмо, не меняется
const FIELD_ID_ALIASES = {
				phone: 'tel',
				claim: 'message',
				complaintMessage: 'message',
};

export const sendMetrikaEvent = (eventName, params = {}) => {
				if (typeof window.ym !== 'undefined') {
								window.ym(METRIKA_ID, 'reachGoal', eventName, params);
				} else {
								console.warn('Метрика не загружена, событие не отправлено', eventName, params);
				}
}

export function isMetrikaDisabled() {
				try {
								return localStorage.getItem(METRIKA_STORAGE_KEY) === '1';
				} catch {
								return false;
				}
}

/**
	* Перебрасывает на текущий URL с ?no-metrika=1 или ?no-metrika=0.
	* Дальше всё делает логика из index.html: пишет в localStorage и показывает плашку.
	*/
export function toggleMetrikaByRedirect() {
				const url = new URL(window.location.href);

				// Если сейчас отключена — включаем (?no-metrika=0), иначе выключаем (?no-metrika=1)
				const value = isMetrikaDisabled() ? '0' : '1';

				url.searchParams.set(METRIKA_QUERY_KEY, value);

				// Убираем якорь, чтобы не мешал
				url.hash = '';

				window.location.href = url.toString();
}

export function resolveFormId(formMetrikaId, inputs) {
				let formId = formMetrikaId;
				if (!formId) {
								const messageTypeInput = inputs?.find(input => input.name === 'messageType');
								const raw = messageTypeInput?.value;
								formId = (raw && typeof raw === 'object') ? raw.value : raw;
				}
				return formId ? String(formId) : 'unknown';
}

// Начало заполнения полей форм, событие form_start_field. Настройки - в начале файла

export function resolveFieldId(name) {
				return FIELD_ID_ALIASES[name] || name;
}

// Хватает ли введённого, чтобы считать поле начатым
export function isFieldStarted(type, value, fieldId) {
				if (value === null || value === undefined || value === '') return false;

				const minLength = FIELD_START_MIN_LENGTH_BY_FIELD[fieldId] ?? FIELD_START_MIN_LENGTH;

				switch (type) {
								case 'tel':
												// маска сама пишет +7 и подчёркивания, считаем только цифры после +7
												return String(value).replace(/\D/g, '').replace(/^7/, '').length >= minLength;
								case 'number':
												return String(value).replace(/\D/g, '').length >= minLength;
								case 'text':
								case 'email':
								case 'textarea':
												return String(value).trim().length >= minLength;
								default:
												return true;
				}
}

/**
	* Учёт начатых полей одной формы, у каждой формы свой.
	* Форма закрылась и пропала со страницы - пропал и учёт, при новом открытии
	* события пойдут снова. Поля, очищенные после отправки, возвращает reset.
	*/
export function createFieldStartTracker(getFormId) {
				const started = new Set();

				return {
								start(fieldId) {
												if (!fieldId || started.has(fieldId)) return;

												started.add(fieldId);
												const url = window.location.href.split('#')[0];
												sendMetrikaEvent('form_start_field', { form: getFormId(), field: fieldId, url });
								},
								reset(fieldId) {
												started.delete(fieldId);
								},
				};
}