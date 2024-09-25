import { render } from '@testing-library/vue'

import BaseButton from './BaseButton.vue'

test('render test button', () => {
    const { debug } = render(BaseButton)

    debug()
})