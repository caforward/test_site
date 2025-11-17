<template>
    <section>
        <div class="custom-container">
            <div class="heading-2 mb-6">
                Поможем каждому клиенту
            </div>
            <div class="flexContainer">

                <div v-if="!isLaptop" v-for="item in items" :key="item.id"
                    :style="{ backgroundColor: item.background }" class="ContentItems">
                    <div class="content">
                        <div class="imgContainer"><img :src=item.imageUrl alt="There was a img :( "></div>
                        <div class="textElements">
                            <div class="heading-3 mb-2">{{ item.textH3 }}</div>
                            <p class="text-body">{{ item.textParagr }}</p>
                        </div>
                    </div>
                    <div class="wrapButt">
                        <button :data-type="item.type" @click="redirectModalPage(item.id)" class="button">Подробнее</button>
                    </div>
                </div>

                <div v-if="isLaptop" v-for="item in items" :key="item.id" :style="{ backgroundColor: item.background }"
                    class="ContentItems">
                    <div class="imgContainer"><img :src=item.imageUrl alt="There was a img :( "></div>
                    <div class="content">
                        <div class="textElements">
                            <h3>{{ item.textH3 }}</h3>
                            <p>{{ item.textParagr }}</p>
                        </div>
                        <div class="wrapButt">
                            <button :data-type="item.type" @click="redirectModalPage(item.id)" class="button">Подробнее</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalForm v-model="modalVisible" :type="defaultOption" />
    </section>
</template>

<script>
import { defineComponent } from 'vue'
import ModalForm from '@/layouts/ModalForm.vue';

export default defineComponent({
    components: {
        ModalForm
    },
    data() {
        return {
            defaultOption: '',
            modalVisible: false,
            isLaptop: false,
            isMobile: false,
            items: [
                {
                    id: 1,
                    type: "debt-forgive",
                    imageUrl: '/images/HelpEverClient/1img.png',
                    textH3: "Прощение долга",
                    textParagr: "Наша компания поможет полностью избавиться от долгов. Что это значит? С помощью рассчитанного нами оптимального графика платежей Вы сможете быстро выплатить задолженность, и она не будет обременять Вас",
                    background: '#ecf6e7',
                }, {
                    id: 2,
                    type: "unblock-accounts",
                    imageUrl: '/images/HelpEverClient/2img.png',
                    textH3: "Разблокируем ваши счета",
                    textParagr: "Наша компания поможет быстро и эффективно разблокировать счета, благодаря чему Вы забудете о проблемах с приставами",
                    background: '#f0f1f9',
                }, {
                    id: 3,
                    type: "find-number",
                    imageUrl: '/images/HelpEverClient/3img.png',
                    textH3: "Узнать номер вашего договора",
                    textParagr: "Не знаете номер своего договора? Оставьте свои контактные данные, и наши специалисты со всем разберутся. Если Вы не можете разобраться в юридических сложностях, просто позвоните нам – в ООО ПКО «Форвард» работают юристы высокого класса, которые помогут даже в самой сложной ситуации. ",
                    background: '#EEF1F3',
                }

            ]
        }
    },
    mounted() {
        this.isLaptop = window.innerWidth <= 1024 && window.innerWidth >= 641
        window.addEventListener('resize', this.updateIsMobile)

        this.isMobile = window.innerWidth < 641;
        window.addEventListener('resize', this.updateIsMobileS)
    },
    methods: {
        redirectModalPage(id) {
            if (id === 1) {
                window.location.href = '/installment-plan#calculate'
            } else if (id === 2) {
                this.defaultOption = 'account-unblock';
                this.modalVisible = true
            } else if (id === 3) {
                this.defaultOption = '';// 'Узнать номер договора';
                this.modalVisible = true
            }
        },
        updateIsMobile() {
            this.isLaptop = window.innerWidth <= 1024 && window.innerWidth >= 641
        },
        updateIsMobileS() {
            this.isMobile = window.innerWidth < 641;
        },
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateIsMobile);
        window.removeEventListener('resize', this.updateIsMobileS);
    },
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    padding: 70px 0 50px;
    background-color: #F9FAFB;
}


.upText {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 32px;
}

.flexContainer {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    position: relative;
}

.ContentItems {
    border-radius: 30px;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

h3 {
    color: rgb(46, 46, 46);
    font-weight: 600;
    font-size: 28px;
    line-height: 30px;
    margin-bottom: 20px;
    height: auto;
}


.wrapButt {
    padding: 0 40px 60px 40px;

    button {
        @include mixin.buttonDetails;
        padding: 15px 0;
        margin-top: 15px;
    }

}

.textElements {
    padding: 25px 40px 0 40px;
    display: flex;
    align-items: baseline;
    flex-direction: column;
    justify-content: space-between;
}

.imgContainer {
    margin-top: 7px;
    display: flex;
    justify-content: center;
    margin-bottom: 35px;
}

@media screen and (max-width: 1370px) and (min-width: 1025px) {
    h3 {
        font-size: 24px;
        font-weight: 600;
    }

    .textElements {
        padding-left: 31px;
        padding-right: 32px;
    }

    .wrapButt {
        padding-left: 30px;
        padding-bottom: 49px;

        .button {
            font-size: 14px;
            width: 145px;
            height: 50px;
        }
    }

}

@media screen and (max-width: 1024px) and (min-width: 641px) {
    section {
        padding-top: 50px;
    }

    .upText {
        font-size: 28px;
        margin-bottom: 22px;
    }

    .flexContainer {
        flex-direction: column;
        gap: 10px;
    }

    .imgContainer {
        margin-top: 0;
        padding-top: 32px;
    }

    .ContentItems {
        flex-direction: row;
        align-items: flex-start;
        gap: 1px
    }

    .content {
        width: 58%;
    }

    .textElements {
        padding: 32px 30px 0 0;
    }

    h3 {
        font-size: 22px;
        font-weight: 600;
    }

    .wrapButt {
        padding: 0 0 41px 0;

        .button {
            font-size: 14px;
            width: 145px;
            height: 50px;
        }
    }

    .unhide-btn {
        color: rgb(0, 150, 216);
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        display: flex;
        align-items: baseline;
        gap: 5px;
        margin-bottom: 21px;
        margin-top: 21px;

    }

}

@media screen and (max-width: 640.5px) {
    section {
        padding-top: 50px;

    }

    .flexContainer {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }


    .upText {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 22px;
    }



    .imgContainer {
        margin-top: 0;
        padding-top: 32px;
        margin-bottom: 21px;

        img {
            min-width: 148px;
            min-height: 110px;
            max-width: 268px;
            max-height: 230px;
        }
    }



    .textElements {
        padding: 0 24px 0 22px;
    }

    h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 3px;
    }

    .wrapButt {
        padding: 0 0 22px 22px;

        .button {
            font-size: 14px;
            font-weight: 500;
            width: 145px;
            height: 50px;
            line-height: 30px;
        }
    }

    .unhide-btn {
        color: rgb(0, 150, 216);
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        display: flex;
        align-items: baseline;
        gap: 5px;
        margin-bottom: 11px;
        margin-top: 10px;
        padding-left: 22px;
    }
}
</style>