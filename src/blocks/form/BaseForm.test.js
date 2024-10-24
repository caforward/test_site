// 
// Tests for form
// 

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import BaseForm from './BaseForm.vue'

document.body.innerHTML = `
  <div>
    <div id="app"></div>
  </div>
`
const options = {
    attachTo: document.getElementById('app')
}

describe('base form validation', () => {
    const props = {
        inputs: [
            {
                name: 'name',
                type: 'text',
                placeholder: 'ФИО*',
                required: true,
            },
            {
                name: 'tel',
                type: 'tel',
                placeholder: 'Номер телефона*',
                required: true
            },
            {
                name: 'email',
                type: 'email',
                placeholder: 'E-mail*',
            },
            {
                name: 'messageType',
                type: 'select',
                placeholder: 'Тема обращения*',
                required: true,
                value: "",
                options: [
                    {
                        name: "Прошу перезвонить",
                        code: "callback"
                    },
                    {
                        name: "Узнать номер договора",
                        code: "getContractNumber"
                    },
                    {
                        name: "Разблокировать счет",
                        code: "unblockAccaunt"
                    },
                    {
                        name: "Рассрочка",
                        code: "installment"
                    },
                    {
                        name: "Другое",
                        code: "other"
                    },
                ],
            },
        ]
    }

    const wrapper = mount(BaseForm, { ...options, props })
    const formInstance = wrapper.find('form')

    it('should create form', () => {
        expect(formInstance.exists()).toBeTruthy()
    })

    it('should create inputs and consent checkbox', () => {
        const formInputs = formInstance.findAll('.t-input')

        formInputs.forEach((input, index) => {
            let inputType = input.attributes('type')

            if (!inputType) {
                inputType = input.attributes('data-pc-name')
            }

            expect(inputType).toEqual(props.inputs[index].type)
        })
    })

    describe('test cases', () => {
        const formInputWrappers = formInstance.findAllComponents('.input__wrapper')
        const formInputs = formInstance.findAllComponents('.t-input')

        const clickFirstSelectOption = async (select) => {
            await select.trigger('click')
            const selectMenu = document.querySelector('.p-select-overlay')
            const selectMenuItem = selectMenu.querySelector('.p-select-option')

            await selectMenuItem.click()
            await select.trigger('blur')

            console.log(select.find('.p-select-label').text())
        }

        it('case 1: valid data', async () => {
            await formInputs.forEach(input => {
                let inputName = input.attributes('name')

                if (!inputName) {
                    inputName = input.attributes('data-pc-name')
                }

                switch (inputName) {
                    case 'name':
                        input.setValue('test test')
                        break;
                    case 'tel':
                        input.setValue('1111111111')
                        break;
                    case 'email':
                        input.setValue('test')
                        break;
                    case 'messageType':
                        clickFirstSelectOption(input)
                        break;
                }

                if (inputName === 'select ') console.log(input.find('.p-select-label').text())
            })

            formInputWrappers.forEach(input => {
                if (input.vm.type === 'select') {
                    console.log(input.find('.p-select-label').text(), '---')
                } else {
                    // console.log(input.vm.modelValue)
                }
            })
        })
    })
})
