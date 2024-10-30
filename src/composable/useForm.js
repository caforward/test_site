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

        if (value === undefined) {
            console.log(inputRef)
        }

        formData.append(inputName, value)
    })

    // for (let key of formData.entries()) {
    //     console.log(`${key[0]}: ${key[1]}`)
    // }
    // formData.entries().forEach(key => {
    //     console.log(key)
    // })

    return formData
}

/*      form validation         */

export const useFormValidation = (inputRefs, consentRef) => {
    const hasInvalidInputs = useInputValidation(inputRefs)

    if (consentRef.value === null) {
        consentRef.value = false
    }

    if (hasInvalidInputs || !consentRef.value) {
        return false
    }

    return true
}

/*      inputs validation       */

export const useInputValidation = (inputRefs) => {
    const invalidInputs = inputRefs.filter(inputRef => !inputRef.readyToSubmit)

    if (invalidInputs.length) {
        invalidInputs.forEach(inputRef => {
            inputRef.showErrorHandler()

            // for debugging
            // console.log(inputRef.inputName)
        })

        return true
    }

    return false
}