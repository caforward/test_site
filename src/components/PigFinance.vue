<template>
    <section>
        <div class="custom-container">
            <div class="flexContainer">
                <div class="textContainer">
                    <div class="heading-3 mb-2">Обращаем ваше внимание!</div>
                    <p class="text-body mb-6">
                        Обращаем Ваше внимание на то, что с даты уступки прав
                         требований по Вашему договору ООО ПКО «ФОРВАРД»  уже 
                         уменьшило процентную ставку <b>по каждому</b>  Договору Займа 
                         <b>до 0%</b> и отказалось от осуществление своих прав на взыскание 
                          процентов <b>по каждому</b> Договору Займа за период начиная с даты
                           цессионого договора и до даты фактического погашения 
                           задолженности в соответствии с п. 6 ст. 450.1 ГК РФ.
                           <br> 
                           Наши специалисты бесплатно Вас проконсультируют и 
                           расскажут, как исправить ситуацию.
                    </p>
                    <div><button><a href="tel:+78043334133">Связаться с нами</a></button></div>
                </div>
                <div class="imageContainer"><img src="/images/PigImg/1img.png" alt="there was a pig :(">
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'



export default defineComponent({
    data() {
        return {

        }
    }
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/base/variables.scss' as var;
@use '@/assets/scss/base/mixins.scss' as mixin;

section {
    // padding-top:;
    padding: 30px 0 100px;
    background-color: #F9FAFB;
}

.flexContainer {
    display: flex;
    justify-content: space-between;
    background: rgb(232, 239, 244);
    border-radius: 30px;

}

.textContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px;
    padding-top: 53px;
    padding-right: 0;
    width: 65%;
}

a {
    color: rgb(255, 255, 255);
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 30px;
}

button {
    color: rgb(255, 255, 255);
    font-family: "Montserrat", sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 30px;
    width: 212px;
    height: 50px;
    border-radius: 30px;
    background: rgb(32, 175, 206);
}

.imageContainer {
    margin-top: -25px
}

img {
    transform: rotate(2.01deg);
}

@media screen and (max-width: 1370px) and (min-width: 1025px) {
    button {
        width: 193px;
        height: 50px;
        font-size: 14px;
        font-weight: 500;
    }

    .textContainer {
        padding: 41px 0 42px 50px
    }

    .imageContainer {
        margin-top: 0;

        img {
            width: 447px;
            height: 447px;
        }
    }
}

@media screen and (max-width: 1024px) and (min-width: 641px) {
    button {
        width: 193px;
        height: 50px;
        font-size: 14px;
        font-weight: 500;
    }

    .textContainer {
        padding: 41px 0 40px 29px
    }

    .flexContainer {
        gap: 23px
    }

    .imageContainer {
        padding-top: 153px;
        padding-right: 31px;
        margin-top: 0;

        img {
            width: 227px;
            height: 227px;
        }
    }
}

@media screen and (max-width: 640.5px) {
    button {
        width: 193px;
        height: 50px;
        font-size: 14px;
        font-weight: 500;
    }

    .textContainer {
        width: 100%;
        padding: 15px 23px 30px 23px;
    }

    .flexContainer {
        gap: 23px
    }

    .imageContainer {
        display: none;

        img {
            display: none;
        }
    }
}
</style>