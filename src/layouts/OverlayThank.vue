<script setup>
const visible = defineModel('visible')
const status = defineModel('status')
</script>

<template>
    <div v-if="visible" class="overlay overlay_thank">
        <span class="icon">
            <i class="pi pi-check" style="font-size: 4rem"></i>
        </span>
        <!-- <span v-if="status === ''" class="icon">
            <i class="pi pi-check" style="font-size: 4rem"></i>
        </span> -->

        <div class="overlay__text">
            Спасибо!
        </div>
        {{ status }}
        <div>
            <button class="button button_blue">
                Вернуться на страницу
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: #fff;
    border-radius: 30px;
    z-index: 1;

    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: $blue;
        border: 4px solid $blue;
        border-radius: 100%;
        width: 6rem;
        height: 6rem;

        &>.pi {
            &-check {
                margin-left: 4px;
            }
        }
    }

    &__text {
        font-size: 20px;
        font-weight: 500;
    }
}
</style>