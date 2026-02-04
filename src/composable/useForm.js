/*      collect data from inputs         */
import { getDottedDate } from "./useCalendar"
export const createFormData = (inputRefs) => {
    const formData = new FormData()

    inputRefs.forEach(inputRef => {
        const inputName = inputRef.inputName
        let value = inputRef.value

        if (value && inputRef.inputName === "paymentDate") {
            value = getDottedDate(value)
        }
		if (value && (inputRef.inputName === "messageType" || inputRef.inputName === "paymentPeriod")) {
			// messageType и paymentPeriod - селекты, их value это { value: <value>, label: <label> }
			value = inputRef.value.label
		}

		console.log(`${inputName}`, value)

        if (value) {
            formData.append(inputName, value)
        }
    })

		// вывод formData ключей для дебага
		// for (let [key, val] of formData.entries()) {
		// 	if (val instanceof File) {
		// 		if (val.name && val.size > 0) {
		// 			console.log(`${key}: [File] ${val.name}, size: ${val.size} bytes`);
		// 		} else {
		// 			console.log(`${key}: [Файл не выбран или пуст]`)
		// 		}
		// 	} else {
		// 		console.log(`${key}: ${val}`);
		// 	}
		// }
    return formData

    // for debugging

    // formData.entries().forEach(key => {
    //     console.log(key)
    // })
}

/*      inputs validation       */

export const useInputValidation = (inputRefs) => {
    const invalidInputs = inputRefs.filter(inputRef => !inputRef.readyToSubmit)

    if (invalidInputs.length) {
        invalidInputs.forEach(inputRef => {
            inputRef.showErrorHandler()

            // for debugging
            // console.log(inputRef.inputName, inputRef.value, inputRef.readyToSubmit)
        })

        return false
    }

    return true
}
