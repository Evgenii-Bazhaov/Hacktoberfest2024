export const formValidation = ({ type, isRequired, value, dropdownoptions, options, optionLimit }) => {
    let reg
    switch (type) {
        case "input":
            if (isRequired && value === "") {
                return false
            }
            if (value === "") {
                return true
            }
            reg = /^[a-zA-Z]*$/
            return reg.test(value)

        case "email":
            if (value === "" && isRequired) {
                return false
            }
            if (value === "") {
                return true
            }
            reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
            return reg.test(value)
        case "dropdown":
            if (value === "" && isRequired) {
                return false
            }
            if (value === "" && !isRequired) {
                return true
            }
            const findDropdownOption = dropdownoptions.filter(op => op === value)
            if (findDropdownOption && findDropdownOption.length === 1) {
                return true
            }
            else {
                return false
            }
        case "option":
            if (value === "" && isRequired) {
                return false
            }
            if (value === "") {
                return true
            }
            let validAnswerCount = 0
            value.forEach(val => {
                const findOption = options.filter(op => op === val)
                if (findOption && findOption.length === 1) {
                    validAnswerCount++
                }
            })
            if (validAnswerCount === optionLimit) {
                return true
            }
            else {
                return false
            }
        case "phone":
            if (value === "" && isRequired) {
                return false
            }
            if (value === "") {
                return true
            }
            reg = /^[a-zA-Z]*$/
            return !reg.test(value)
        default: return null
    }
}