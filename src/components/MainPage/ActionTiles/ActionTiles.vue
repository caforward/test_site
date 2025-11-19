<script setup>
import ActionTile from "@/components/MainPage/ActionTiles/ActionTile.vue";
</script>

<template>
    <section class="pt-20 pb-24 bg-gray-50">
        <div class="custom-container">
            <div class="flex flex-col gap-[30px]">
                <div class="grid grid-cols-2 gap-[30px]">
                    <ActionTile
                        class="group bg-[#ECFFE3] transition-shadow shadow-[0_2px_0_0_#CCE8BE] hover:shadow-[0_4px_0_0_#CCE8BE]"
                        image-path="actionTiles/coins.png"
                        title="Оплатить задолженность"
                        text="Не можете выплатить всю сумму долга? ПКО «Форвард» поможет вам полностью избавиться от долгов. Заключите договор с нами и получите скидку на свой долг."
                    />
                    <ActionTile
                        class="group bg-[#DDF5FF] transition-shadow shadow-[0_2px_0_0_#ABD6E9] hover:shadow-[0_4px_0_0_#ABD6E9]"
                        image-path="actionTiles/calendar.png"
                        promotion="Дополнительная скидка 5%"
                        title="Получить рассрочку"
                        text="В нашей компании имеются практики и опыт, которые позволяют нам быстро и эффективно разблокировать счета должника."
                    />
                </div>
                <div class="grid grid-cols-2 gap-[30px]">
                    <ActionTile
                        class="group bg-[#FFF3E3] transition-shadow shadow-[0_2px_0_0_#F6D9B3] hover:shadow-[0_4px_0_0_#F6D9B3]"
                        image-path="actionTiles/wallet.png"
                        title="Отозвать ИП"
                        text="Не можете выплатить всю сумму долга? ПКО «Форвард» поможет вам полностью избавиться от долгов. Заключите договор с нами и получите скидку на свой долг."
                    />
                    <ActionTile
                        class="group bg-[#F4E9FF] transition-shadow shadow-[0_2px_0_0_#E3CEF9] hover:shadow-[0_4px_0_0_#E3CEF9]"
                        image-path="actionTiles/safe.png"
                        title="Разблокировать счет"
                        text="В нашей компании имеются практики и опыт, которые позволяют нам быстро и эффективно разблокировать счета должника."
                    />
                </div>

                <div class="grid h-full">
                    <ActionTile
                        class="group bg-[#E2F0FF] transition-shadow shadow-[0_2px_0_0_#74A9E0] hover:shadow-[0_4px_0_0_#74A9E0]"
                        image-path="actionTiles/user.png"
                        title="Узнать номер вашего договора"
                        text="Не знаете номер своего договора? Оставьте свои контактные данные,  и наши специалисты со всем разберутся. "
                    />
                </div>
            </div>
        </div>
    </section>
</template>