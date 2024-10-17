import { it } from "vitest";
import { mount } from "@vue/test-utils";
import BaseForm from './BaseForm.vue'


it('base form validation', () => {
    // arrange (given)
    const wrapper = mount(BaseForm, {
        props: {
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'ФИО*',
                    required: true,
                },
            ]
        }
    })

    // act (when)


    // assert (then)
    // console.log(wrapper)
})

// it.todo('input date validation')