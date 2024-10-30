/*      collect data from inputs         */

export const createFormData = (inputRefs) => {
    const formData = new FormData()

    inputRefs.forEach(inputRef => {
        const inputName = inputRef.inputName
        let value = null

        if (inputName === 'messageType') {
            value = inputRef.value.name
        } else {
            value = inputRef.value
        }

        if (value) {
            formData.append(inputName, value)
        }
    })

    return formData
    
    // for debugging
    
    // for (let key of formData.entries()) {
    //     console.log(`${key[0]}: ${key[1]}`)
    // }
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
            console.log(inputRef.inputName)
        })

        return false
    }

    return true
}