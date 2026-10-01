export const METRIKA_STORAGE_KEY = 'noMetrika';
export const METRIKA_QUERY_KEY = 'no-metrika';
const METRIKA_ID = 95726509;

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

// отслеживание полей форм
const tracked = new Set();
const FIELD_THRESHOLD = 3;

export function trackFieldStart(formId, fieldId, value) {
				if (!formId || !fieldId) return;

				const str = value == null ? '' : String(value);
				if (str.length < FIELD_THRESHOLD) return;

				const key = `${formId}_${fieldId}`;
				if (tracked.has(key)) return;

				tracked.add(key);
				const url = window.location.href.split('#')[0];
				sendMetrikaEvent('form_start_field', { form: formId, field: fieldId, url });
}

export function resetFormTracking(formId) {
				for (const key of [...tracked]) {
								if (key.startsWith(`${formId}_`)) tracked.delete(key);
				}
}