<script setup>
import ActionTile from "@/components/MainPage/ActionTiles/ActionTile.vue";
import ModalForm from "@/layouts/ModalForm.vue";
import {ref} from "vue";

const isModalVisible = ref(false);
const modalDefaultOption = ref('')

function openModal(modalOption) {
    isModalVisible.value = true;
    modalDefaultOption.value = modalOption;
}

function scrollToPayment() {
    const payForm = document.getElementById("payment");
    payForm.scrollIntoView({behavior: "smooth"});
}
</script>

<template>
    <section class="tiles-section">
        <div class="custom-container">
            <div class="tiles-wrapper">
                <div class="tiles-group">
                    <ActionTile
                        class="group bg-[#ECFFE3] transition-shadow shadow-[0_2px_0_0_#CCE8BE] hover:shadow-[0_4px_0_0_#CCE8BE]"
                        image-path="actionTiles/coins.png"
                        title="Оплатить задолженность"
                        text="Не можете выплатить всю сумму долга? ПКО «Форвард» поможет вам полностью избавиться от долгов. Заключите договор с нами и получите скидку на свой долг."
                        @click="scrollToPayment"
                    />
                    <ActionTile
                        class="group bg-[#DDF5FF] transition-shadow shadow-[0_2px_0_0_#ABD6E9] hover:shadow-[0_4px_0_0_#ABD6E9]"
                        image-path="actionTiles/calendar.png"
                        promotion="Дополнительная скидка 5%"
                        title="Получить рассрочку"
                        text="В нашей компании имеются практики и опыт, которые позволяют нам быстро и эффективно разблокировать счета должника."
                        @click="openModal('installment')"
                    />
                </div>
                <div class="tiles-group">
                    <ActionTile
                        class="group bg-[#FFF3E3] transition-shadow shadow-[0_2px_0_0_#F6D9B3] hover:shadow-[0_4px_0_0_#F6D9B3]"
                        image-path="actionTiles/wallet.png"
                        title="Отозвать ИП"
                        text="Не можете выплатить всю сумму долга? ПКО «Форвард» поможет вам полностью избавиться от долгов. Заключите договор с нами и получите скидку на свой долг."
                        @click="openModal('cancel-ip')"
                    />
                    <ActionTile
                        class="group bg-[#F4E9FF] transition-shadow shadow-[0_2px_0_0_#E3CEF9] hover:shadow-[0_4px_0_0_#E3CEF9]"
                        image-path="actionTiles/safe.png"
                        title="Разблокировать счет"
                        text="В нашей компании имеются практики и опыт, которые позволяют нам быстро и эффективно разблокировать счета должника."
                        @click="openModal('account-unblock')"
                    />
                </div>

                <div>
                    <ActionTile
                        class="group bg-[#E2F0FF] transition-shadow shadow-[0_2px_0_0_#74A9E0] hover:shadow-[0_4px_0_0_#74A9E0]"
                        image-path="actionTiles/user.png"
                        title="Узнать номер вашего договора"
                        text="Не знаете номер своего договора? Оставьте свои контактные данные,  и наши специалисты со всем разберутся. "
                        @click="openModal('get-contract-id')"
                    />
                </div>
            </div>
        </div>
    </section>

    <ModalForm v-model="isModalVisible" :type="modalDefaultOption"/>
</template>

<style lang="scss" scoped>
.tiles {
    &-section {
        @apply
        xl:pt-20
        xl:pb-[95px]
        lg:pt-[60px]
        lg:pb-[30px]
        sm:pt-10
        sm:pb-5
        bg-gray-50 pt-[30px] pb-[15px];
    }

    &-wrapper {
        @apply
        lg:gap-[30px]
        flex flex-col gap-[10px];

        .tile {
            @apply
            flex items-center w-full;
        }

        .tiles-group {
            @apply
            lg:gap-[30px]
            sm:grid-cols-2
            grid gap-[10px];

            .tile {
                @apply
                sm:flex-col
                sm:items-start;
            }
        }
    }
}
</style>
