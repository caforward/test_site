import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const colors = {
    // white
    white: '#fff',

    // black
    black: '#2e2e2e',
    blackAccent: '#292929',
    blackGray: '#4c5866',

    // gray
    gray: '#EAECEE',
    grayAccent: '#989898',

    // blue
    blue: '#0096d8',
}

export default definePreset(Aura, {
    components: {
        inputtext: {
            background: 'transparent',
            borderColor: colors.gray,
            paddingX: '20',
            paddingY: '12',
            hover: {
                borderColor: colors.grayAccent,
            },
            focus: {
                borderColor: colors.blue,
            },
        },
        datepicker: {
            date: {
                selected: {
                    background: colors.blue,
                },
                hover: {
                    background: colors.grayAccent,
                    color: colors.white,
                }
            },
        },
        select: {
            paddingX: '20',
            paddingY: '12',
            borderColor: colors.gray,
            color: colors.blackAccent,
            hover: {
                borderColor: colors.grayAccent,
            },
            focus: {
                borderColor: colors.blue,
            },
            disabled: {
                background: 'transparent',
            },
            option: {
                focusBackground: colors.gray,
                selected: {
                    background: colors.blue,
                    color: colors.white,
                    focusBackground: colors.blue,
                    focusColor: colors.white,
                }
            },
        },
        textarea: {
            borderColor: colors.gray,
            paddingX: '20',
            paddingY: '12',
            hover: {
                borderColor: colors.grayAccent,
            },
            focus: {
                borderColor: colors.blue,
            }
        },
        checkbox: {
            width: '25',
            height: '25',
            borderRadius: '100%',
            checked: {
                background: colors.blue,
                hoverBackground: colors.blue,
                borderColor: colors.blue,
                hoverBorderColor: colors.blue,
            }
        },
        radiobutton: {
            // borderColor: colors.blue,
            hoverBorderColor: colors.blue,
            icon: {
                checked: {
                    color: colors.blue,
                    hoverColor: colors.blue,
                }
            },
            checked: {
                background: colors.white,
                borderColor: colors.blue,
                hoverBackground: colors.white,
                hoverBorderColor: colors.blue
            }
        }
    }
})