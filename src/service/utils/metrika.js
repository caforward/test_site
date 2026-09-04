const METRIKA_ID = 95726509;

export const sendMetrikaEvent = (eventName, params = {}) => {
				if (typeof window.ym !== 'undefined') {
								window.ym(METRIKA_ID, 'reachGoal', eventName, params);
				} else {
								console.warn('Метрика не загружена, событие не отправлено', eventName, params);
				}
}