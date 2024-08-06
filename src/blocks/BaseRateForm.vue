<script setup>
import { onMounted, ref } from 'vue';
import { useFetchPost } from '@/composable/useFetch.js'

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

        let response = await fetch('rate.php', {
            method: 'POST',
            body: postData
        })

        if (response.ok) {
            console.log('received rate')
        } else {
            console.log('error', response.status)
        }
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
        <ul ref='starListWrapper' class="rate-list">
            <li ref="starList" v-for="star in starCount" :key="star" class="rate-list__star pi pi-star-fill"></li>
        </ul>
        <transition name="fade">
            <div v-if="rateClicked" class="rate__bottom">
                <transition name="fade-feedback">
                    <div v-if="choosedRate < 5">
                        <div class="rate-input__wrapper">
                            <label for="rate-message" class="rate-input__label">
                                Напишите что мы могли бы изменить
                            </label>
                            <textarea class="rate-input" name="" id="rate-message" v-model="messageRate"
                                placeholder="Ваши предложения для улучшения сайта"></textarea>
                        </div>
                    </div>
                </transition>
                <button class="rate__button button button_blue" type="submit" @click.prevent="sendRate">
                    Отправить оценку
                </button>
            </div>
        </transition>
    </form>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .4s ease, height .4s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-feedback-enter-active,
.fade-feedback-leave-active {
    transition: opacity .4s ease, height .4s;
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

    &__button {
        margin: 20px auto 0;
    }

    &-input {
        border: 1px solid $white-blue;
        border-radius: 5px;
        max-width: 400px;
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
            color: $black-gray;
            font-size: 36px;

            &:last-child {
                padding-right: 0;
            }

            &:hover {
                cursor: pointer;
            }

            &_active {
                color: $blue;
            }
        }
    }
}
</style>