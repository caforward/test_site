/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,vue}"],
    theme: {
        extend: {
            screens: {
                'xs': '475px',
            }
        },
    },
    plugins: [require('tailwindcss-primeui')],

}

