<template>
    <div class="form-block">
        <slot name="info"></slot>
        <form action="" class="form-block__form">
            <div class="form-block__inputs">
                <component v-for="(inputIter, idx) in inputs" :key="idx"
                    :is="inputIter.tagName ? inputIter.tagName : 'input'" class="input" :type=inputIter.type
                    :placeholder=inputIter.placeholder>
                </component>
            </div>
            <div class="form-block__bottom">
                <div class="form-block-meta">
                    <input id="personal-data-agree-checkbox" type="checkbox" class="checkbox form-block-meta__checkbox">
                    <label for="personal-data-agree-checkbox" class="form-block-meta__label">
                        Даю согласие на
                        <a href="#" class="link">обработку своих персональных данных</a>,
                        <a href="#" class="link">политика конфиденциальности</a>
                    </label>
                </div>
                <button class="button button_blue form-block__button">Отправить</button>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    name: 'FormBlock',
    props: {
        inputs: Array
    },
    data() {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>

.form-block {
    background-color: $black;
    border-radius: 20px;
    padding: 70px 85px 60px;
    color: #fff;
    display: flex;
    grid-gap: 40px;
    position: relative;
    z-index: 1;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: -1;
        height: 1px;
        aspect-ratio: 1 / 1;
        // background: radial-gradient(circle, $blue 0%, rgba(0,0,0,0) 70%);
        box-shadow: 100px 160px 300px 280px rgba(0, 150, 216, 0.85);
    }

    .form-block__form {
        flex: 1;
    }

    &__inputs {
        margin-bottom: 30px;
    }

    &__bottom {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
    }

    &__button {
        width: 200px;
        flex: none;
    }
    &-meta {
        display: flex;
        align-items: flex-start;

        &__checkbox {
            margin-right: 20px;
        }

        &__label {
            display: inline;
            font-weight: 400;
            font-size: 14px;
            line-height: 143%;

            .link {
                display: inline;
                color: $white;
                text-decoration: underline;
            }
        }
    }
}

.input {
    &:not(:last-child) {
        margin-bottom: 15px;
    }
}

textarea {
    height: 100px;
}
</style>
