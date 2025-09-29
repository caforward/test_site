<script setup>
import { onMounted, ref } from 'vue';
// import { useFetchPost } from '@/composable/useFetch.js'

const emits = defineEmits(['close'])
const starCount = 5
const choosedRate = ref(null)
const messageRate = ref('')
const rateClicked = ref(false)

const starListWrapper = ref(null)
const starList = ref(null)

function removeHighlightStar() {
    starList.value.forEach(star => {
        star.classList.remove('rate-list__star_active')
    })
}

function highlightStar(e) {
    const starIdx = starList.value.indexOf(e.target)

    removeHighlightStar()

    for (let i = 0; i <= starIdx; i++) {
        starList.value[i].classList.add('rate-list__star_active')
    }

    if (rateClicked) {
        choosedRate.value = starIdx + 1
    }
}

function reconnectHighlightStarListeners() {
    starListWrapper.value.removeEventListener('mouseover', highlightStar)
    starListWrapper.value.removeEventListener('mouseleave', removeHighlightStar)

    rateClicked.value = true
    starListWrapper.value.addEventListener('click', highlightStar)
}

async function sendRate() {
    if (choosedRate.value) {
        const postData = new FormData()

        postData.append('rate', choosedRate.value)
        postData.append('message', messageRate.value)

        let response = await fetch('/backend/public/rate.php', {
            method: 'POST',
            body: postData
        })

        // if (response.ok) {
        //     console.log('received rate')
        // } else {
        //     console.log('error', response.status)
        // }

        emits('close')
    }
}

onMounted(() => {
    starListWrapper.value.addEventListener('mouseover', highlightStar)
    starListWrapper.value.addEventListener('mouseleave', removeHighlightStar)

    starListWrapper.value.addEventListener('click', reconnectHighlightStarListeners)
})

</script>

<template>
    <form class="rate form form_gray">
        <span>
            Пожалуйста, оцените качество работы сайта
        </span>
        <!-- rate stars -->
        <ul ref='starListWrapper' class="rate-list">
            <li ref="starList" v-for="star in starCount" :key="star" class="rate-list__star pi pi-star-fill"></li>
        </ul>

        <div class="rate__bottom">
            <!-- user input field if rate less than 5 -->
            <transition name="fade-feedback">
                <div v-if="rateClicked && choosedRate < 5">
                    <div class="rate-input__wrapper">
                        <label for="rate-message" class="rate-input__label">
                            Напишите что мы могли бы изменить
                        </label>
                        <textarea class="rate-input" name="" id="rate-message" v-model="messageRate"
                            placeholder="Ваши предложения для улучшения сайта"></textarea>
                    </div>
                </div>
            </transition>

            <div class="rate__buttons">
                <button class="button button_blue" @click.prevent="emits('close')">
                    Вернуться на сайт
                </button>

                <!-- if user pick the rate then show send button -->
                <transition name="fade">
                    <button v-if="rateClicked" type="submit" class="rate__button button button_blue"
                        @click.prevent="sendRate">
                        Отправить оценку
                    </button>
                </transition>
            </div>
        </div>
    </form>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease, height .3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-feedback-enter-active,
.fade-feedback-leave-active {
    transition: opacity .3s ease, height .3s;
    height: 169px;
    overflow: hidden;
}

.fade-feedback-enter-from,
.fade-feedback-leave-to {
    opacity: 0;
    height: 0;
    overflow: hidden;
}

.rate {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    transition: gap 1s;

    &__bottom {
        width: 100%;
        gap: 10px;
    }

    &__buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
    }

    &-input {
        border: 1px solid var.$white-blue;
        border-radius: 5px;
        height: 140px;
        padding: 10px;
        resize: none;

        &__wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            font-size: 16px;
            gap: 10px;
        }
    }

    &-list {
        display: flex;

        &__star {
            padding: 0;
            padding-right: 10px;
            color: var.$black-gray;
            font-size: 36px;

            &:last-child {
                padding-right: 0;
            }

            &:hover {
                cursor: pointer;
            }

            &_active {
                color: var.$blue;
            }
        }
    }
}
</style>