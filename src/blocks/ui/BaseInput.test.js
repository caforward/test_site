import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import BaseInput from './BaseInput.vue'

document.body.innerHTML = `
  <div>
    <div id="app"></div>
  </div>
`

const options = {
    attachTo: document.getElementById('app')
}

// Base Input by default

describe('Base input', () => {
    const props = {
        name: 'test',
        type: 'text',
        placeholder: 'ФИО*',
        required: true,
        disabled: false
    }

    const wrapper = mount(BaseInput, { ...options, props })
    const inputInstance = wrapper.find('input')

    describe('render', () => {
        it('should render input', () => {
            expect(inputInstance.exists()).toBeTruthy()
        })

        it('should change value', async () => {
            await inputInstance.setValue('test')
            expect(inputInstance.element.value).toEqual('test')
        })
    })

    describe('attributes', () => {
        const inputAttr = {
            name: inputInstance.attributes('name'),
            placeholder: inputInstance.attributes('placeholder'),
            type: inputInstance.attributes('type'),
            disabled: inputInstance.isDisabled()
        }

        it('should be correct name attribute', () => {
            expect(inputAttr.name).toEqual(props.name)
        })

        it('should be correct type', () => {
            expect(inputAttr.type).toEqual(props.type)
        })

        it('should be correct disable attribute', () => {
            expect(inputAttr.disabled).toEqual(props.disabled)
        })

        it('should be correct placeholder', () => {
            expect(inputAttr.placeholder).toEqual(props.placeholder)
        })
    })

    describe('errors', () => {
        it('error text should be empty', () => {
            expect(wrapper.vm.errorText).toEqual('')
        })
    })
})

// Text Input

describe('Text input', () => {
    const props = {
        name: 'name',
        type: 'text',
        placeholder: 'ФИО*',
        required: true,
    }

    const wrapper = mount(BaseInput, { ...options, props })
    const inputInstance = wrapper.find('input')

    describe('render', () => {
        it('should render input', () => {
            expect(inputInstance.exists()).toBeTruthy()
        })
    })

    describe('attributes', () => {
        it('should be correct attributes', () => {
            const inputAttr = {
                name: inputInstance.attributes('name'),
                placeholder: inputInstance.attributes('placeholder'),
                type: inputInstance.attributes('type'),
                disabled: inputInstance.isDisabled()
            }

            expect(inputAttr.name).toEqual(props.name)
            expect(inputAttr.type).toEqual(props.type)
            expect(inputAttr.placeholder).toEqual(props.placeholder)
            expect(inputAttr.disabled).toBeFalsy()
        })
    })

    describe('errors', () => {
        it('should be hidden error element', () => {
            expect(wrapper.vm.showError).toBeFalsy()
        })

        it('should show error element', async () => {
            // await inputInstance.setValue('test')
            await inputInstance.trigger('blur')
            expect(wrapper.vm.showError).toBeTruthy()
        })

        it('should show error text', async () => {
            await inputInstance.trigger('blur')
            expect(wrapper.vm.showError).toBeTruthy()
            expect(wrapper.vm.errorText).toEqual('Заполните поле')
        })

        it('should hide error text', async () => {
            await inputInstance.setValue('two words')
            await inputInstance.trigger('blur')

            expect(wrapper.vm.showError).toBeTruthy()
            expect(wrapper.vm.errorText).toEqual('')
        })
    })

    describe('value', () => {
        it('should change value', async () => {
            await inputInstance.setValue('test')

            expect(inputInstance.element.value).toEqual('test')
        })

        it('should be correct value', async () => {
            await inputInstance.setValue('two words')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()

            await inputInstance.setValue('three words test')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()

            await inputInstance.setValue('two-words test')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()
        })

        it('should be incorrect value', async () => {
            await inputInstance.setValue('')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()

            await inputInstance.setValue('oneword')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()

            await inputInstance.setValue('123 123')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()

            await inputInstance.setValue('!&913*318 132=*$@(&')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()
        })
    })
})

// Phone Input

describe('Phone input', () => {
    const props = {
        name: 'tel',
        type: 'tel',
        placeholder: 'Номер телефона*',
        required: true
    }

    const wrapper = mount(BaseInput, { ...options, props })
    const inputInstance = wrapper.find('input')

    describe('render', () => {
        it('should render input', () => {
            expect(inputInstance.exists()).toBeTruthy()
        })
    })

    describe('attributes', () => {
        it('should be correct attributes', () => {
            const inputAttr = {
                name: inputInstance.attributes('name'),
                placeholder: inputInstance.attributes('placeholder'),
                type: inputInstance.attributes('type'),
                disabled: inputInstance.isDisabled()
            }

            expect(inputAttr.name).toEqual(props.name)
            expect(inputAttr.type).toEqual(props.type)
            expect(inputAttr.placeholder).toEqual(props.placeholder)
            expect(inputAttr.disabled).toBeFalsy()
        })
    })

    describe('errors', () => {
        it('should be hidden error element', () => {
            expect(wrapper.vm.showError).toBeFalsy()
        })

        it('should show error element', async () => {
            // await inputInstance.setValue('test')
            await inputInstance.trigger('blur')
            expect(wrapper.vm.showError).toBeTruthy()
        })

        it('should show error text', async () => {
            await inputInstance.trigger('blur')
            expect(wrapper.vm.showError).toBeTruthy()
            expect(wrapper.vm.errorText).toEqual('Заполните поле')
        })

        it('should hide error text', async () => {
            await inputInstance.setValue('1111111111')
            await inputInstance.trigger('blur')

            expect(wrapper.vm.showError).toBeTruthy()
            expect(wrapper.vm.errorText).toEqual('')
        })
    })

    describe('value', () => {
        it('should change value', async () => {
            await inputInstance.setValue('1111111111')

            expect(inputInstance.element.value).toEqual('+7 111 111-11-11')
        })

        it('should be correct value', async () => {
            await inputInstance.setValue('1111111111')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()

            await inputInstance.setValue('9998887766')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()

            await inputInstance.setValue('111test 111test11@+)#11')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()
        })

        it('should be incorrect value', async () => {
            await inputInstance.setValue('')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()

            await inputInstance.setValue('text')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()

            await inputInstance.setValue('123 123')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()

            await inputInstance.setValue('!&913*318 132=*$@(&')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()
        })
    })
})

// Number Input

describe('Number input', () => {
    const props = {
        name: 'count',
        type: 'number',
        placeholder: 'Количество',
        value: 150000,
        required: true
    }

    const wrapper = mount(BaseInput, { ...options, props })
    const inputInstance = wrapper.find('input')

    describe('render', () => {
        it('should render input', () => {
            expect(inputInstance.exists()).toBeTruthy()
        })
    })

    describe('attributes', () => {
        it('should be correct attributes', () => {
            const inputAttr = {
                name: inputInstance.attributes('name'),
                type: inputInstance.attributes('type'),
                placeholder: inputInstance.attributes('placeholder'),
                disabled: inputInstance.isDisabled()
            }

            expect(inputAttr.name).toEqual(props.name)
            expect(inputAttr.placeholder).toEqual(props.placeholder)
            expect(inputAttr.disabled).toBeFalsy()

            // here is 'text' type because 
            // primevue render number input using text input
            expect(inputAttr.type).toEqual('text')
        })
    })

    describe('errors', () => {
        it('should be hidden error element', () => {
            expect(wrapper.vm.showError).toBeFalsy()
        })

        it('should show error element', async () => {
            // await inputInstance.setValue('test')
            await inputInstance.trigger('blur')
            expect(wrapper.vm.showError).toBeTruthy()
        })

        it('should show error text', async () => {
            await inputInstance.trigger('blur')
            expect(wrapper.vm.showError).toBeTruthy()
            expect(wrapper.vm.errorText).toEqual('Заполните поле')
        })

        it('should hide error text', async () => {
            await inputInstance.setValue('1111111111')
            await inputInstance.trigger('blur')

            expect(wrapper.vm.showError).toBeTruthy()
            expect(wrapper.vm.errorText).toEqual('')
        })
    })

    describe('value', () => {
        it('should change value', async () => {
            await inputInstance.setValue('123')

            expect(inputInstance.element.value).toEqual('123')
        })

        it('should be correct value', async () => {
            await inputInstance.setValue('11,11')
            await inputInstance.trigger('blur')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()

            await inputInstance.setValue('9998887766')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()

            await inputInstance.setValue('111test 111test11@+)#11')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()
        })

        it('should be incorrect value', async () => {
            await inputInstance.setValue('')
            await inputInstance.trigger('blur')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()

            await inputInstance.setValue('text')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()

            await inputInstance.setValue('!&* =*$@(&')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()
        })
    })
})

// Textarea

describe('Textarea', () => {
    const props = {
        name: 'message',
        type: 'textarea',
        placeholder: 'Введите сообщение',
        required: true
    }

    const wrapper = mount(BaseInput, { ...options, props })
    const inputInstance = wrapper.find('textarea')

    describe('render', () => {
        it('should render input', () => {
            expect(inputInstance.exists()).toBeTruthy()
        })
    })

    describe('attributes', () => {
        it('should be correct attributes', () => {
            const inputAttr = {
                name: inputInstance.attributes('name'),
                type: inputInstance.attributes('type'),
                placeholder: inputInstance.attributes('placeholder'),
                disabled: inputInstance.isDisabled()
            }

            expect(inputAttr.name).toEqual(props.name)
            expect(inputAttr.type).toEqual('textarea')
            expect(inputAttr.placeholder).toEqual(props.placeholder)
            expect(inputAttr.disabled).toBeFalsy()
        })
    })

    describe('errors', () => {
        it('should be hidden error element', () => {
            expect(wrapper.vm.showError).toBeFalsy()
        })

        it('should show error element', async () => {
            // await inputInstance.setValue('test')
            await inputInstance.trigger('blur')
            expect(wrapper.vm.showError).toBeTruthy()
        })

        it('should show error text', async () => {
            await inputInstance.trigger('blur')
            expect(wrapper.vm.showError).toBeTruthy()
            expect(wrapper.vm.errorText).toEqual('Заполните поле')
        })

        it('should hide error text', async () => {
            await inputInstance.setValue('1111111111')
            await inputInstance.trigger('blur')

            expect(wrapper.vm.showError).toBeTruthy()
            expect(wrapper.vm.errorText).toEqual('')
        })
    })

    describe('value', () => {
        it('should change value', async () => {
            await inputInstance.setValue('123')

            expect(inputInstance.element.value).toEqual('123')
        })

        it('should be correct value', async () => {
            await inputInstance.setValue('text')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()

            await inputInstance.setValue('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facere ut autem, dolores odio alias minima quo nostrum amet distinctio aliquid, totam illo veniam fugiat unde quisquam dolorem animi blanditiis!')
            expect(wrapper.vm.readyToSubmit).toBeTruthy()
        })

        it('should be incorrect value', async () => {
            await inputInstance.setValue('')
            expect(wrapper.vm.readyToSubmit).toBeFalsy()
        })
    })
})

// DatePicker

// describe('DatePicker input', () => {
//     const props = {
//         name: 'inputDate',
//         type: 'date',
//         value: new Date(),
//         placeholder: 'Дата',
//         required: true
//     }

//     const wrapper = mount(BaseInput, { ...options, props })
//     const inputInstance = wrapper.find('input')

//     describe('render', () => {
//         it('should render input', () => {
//             expect(inputInstance.exists()).toBeTruthy()
//         })
//     })

//     describe('attributes', () => {
//         it('should be correct attributes', () => {
//             const inputAttr = {
//                 name: inputInstance.attributes('name'),
//                 type: inputInstance.attributes('type'),
//                 placeholder: inputInstance.attributes('placeholder'),
//                 disabled: inputInstance.isDisabled()
//             }

//             expect(inputAttr.name).toEqual(props.name)
//             expect(inputAttr.type).toEqual('textarea')
//             expect(inputAttr.placeholder).toEqual(props.placeholder)
//             expect(inputAttr.disabled).toBeFalsy()
//         })
//     })

//     describe('errors', () => {
//         it('should be hidden error element', () => {
//             expect(wrapper.vm.showError).toBeFalsy()
//         })

//         it('should show error element', async () => {
//             // await inputInstance.setValue('test')
//             await inputInstance.trigger('blur')
//             expect(wrapper.vm.showError).toBeTruthy()
//         })

//         it('should show error text', async () => {
//             await inputInstance.trigger('blur')
//             expect(wrapper.vm.showError).toBeTruthy()
//             expect(wrapper.vm.errorText).toEqual('Заполните поле')
//         })

//         it('should hide error text', async () => {
//             await inputInstance.setValue('1111111111')
//             await inputInstance.trigger('blur')

//             expect(wrapper.vm.showError).toBeTruthy()
//             expect(wrapper.vm.errorText).toEqual('')
//         })
//     })

//     describe('value', () => {
//         it('should change value', async () => {
//             await inputInstance.setValue('123')

//             expect(inputInstance.element.value).toEqual('123')
//         })

//         it('should be correct value', async () => {
//             await inputInstance.setValue('text')
//             expect(wrapper.vm.readyToSubmit).toBeTruthy()

//             await inputInstance.setValue('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis facere ut autem, dolores odio alias minima quo nostrum amet distinctio aliquid, totam illo veniam fugiat unde quisquam dolorem animi blanditiis!')
//             expect(wrapper.vm.readyToSubmit).toBeTruthy()
//         })

//         it('should be incorrect value', async () => {
//             await inputInstance.setValue('')
//             expect(wrapper.vm.readyToSubmit).toBeFalsy()
//         })
//     })
// })

// Select

// describe('Select', () => {
//     const props = {
//         name: 'selector',
//         type: 'select',
//         placeholder: 'Выберите опцию',
//         value: { name: 'option 1' },
//         options: [
//             { name: 'option 1' },
//             { name: 'option 2' },
//             { name: 'option 3' },
//             { name: 'option 4' },
//         ],
//         required: true
//     }

//     const wrapper = mount(BaseInput, { ...options, props })
//     console.log(wrapper)
//     const inputInstance = wrapper.find('input')

//     describe('render', () => {
//         it('should render input', () => {
//             expect(inputInstance.exists()).toBeTruthy()
//         })
//     })
// })
