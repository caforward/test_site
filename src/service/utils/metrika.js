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

// Адрес страницы для параметра url: без якоря и без хвоста после «?» (utm, ysclid, pv_id),
// иначе одна и та же страница расходится в отчёте на разные адреса
export function getPageUrl() {
				return window.location.origin + window.location.pathname;
}

// Идентификатор для связи визита Метрики с данными в 1С: время в миллисекундах и четыре
// заглавные латинские буквы, например 1792357050061AKRP. Новый перед каждым действием,
// которое потом надо связать с визитом, и сразу уходит в Метрику событием track_id
export function sendTrackId() {
				let letters = '';
				for (let i = 0; i < 4; i++) {
								letters += String.fromCharCode(65 + Math.floor(Math.random() * 26));
				}
				const tid = Date.now() + letters;
				sendMetrikaEvent('track_id', { tid });
				return tid;
}

// id темы обращения для параметра theme. У тем без своего value id задан полем theme
export function resolveThemeId(option) {
				if (!option || typeof option !== 'object') return undefined;
				return option.theme || option.value || undefined;
}

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
export function createFieldStartTracker(getFormInfo) {
				const started = new Set();

				return {
								start(fieldId) {
												if (!fieldId || started.has(fieldId)) return;

												started.add(fieldId);
												// getFormInfo отдаёт id формы строкой или {form, theme, from}; theme есть только у debt-info
												const info = getFormInfo();
												const { form, theme, from } = typeof info === 'string' ? { form: info } : info;
												const params = { form };
												if (theme) params.theme = theme;
												if (from) params.from = from;
												params.url = getPageUrl();
												params.field = fieldId;
												sendMetrikaEvent('form_start_field', params);
								},
								reset(fieldId) {
												started.delete(fieldId);
								},
				};
}