// format value: 100000 to 100 000
// or: 10000 to 10 000

export function useValueFormat(number) {
    return new Intl.NumberFormat('ru-RU').format(number)
}