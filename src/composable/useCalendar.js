// функции для получения календарного времени

// Получение даты в стиле дд.мм.гггг
export function getDottedDate(dateInstance) {
    const date = new Date(dateInstance)

    let day = date.getDate()
    let month = date.getMonth() + 1
    const year = date.getFullYear()

    day = day < 10 ? `0${day}` : day
    month = month < 10 ? `0${month}` : month

    return `${day}.${month}.${year}`
}