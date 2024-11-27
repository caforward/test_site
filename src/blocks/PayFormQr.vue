<script setup>
import { onMounted, ref } from 'vue';

const formRef = ref(null)
const terminalKey = ref('1731918302262') 
//1731918302262 //8Uf4k*np7J81AiFo //1731918302237DEMO
function collectFormData() {
    const form = formRef.value

    Object.defineProperty(form.receipt, 'value', {
        get: function () {
            return JSON.stringify({
                Email: form.email.value,
                Phone: form.phone.value,
                EmailCompany: "dolg.info@caforward.ru",
                Taxation: 'osn',
                Items: [
                    {
                        Name: form.description.value || 'Оплата',
                        Price: form.amount.value + '00',
                        Quantity: 1.0,
                        Amount: form.amount.value + '00',
                        PaymentMethod: 'credit_payment',
                        PaymentObject: 'service',
                        Tax: 'none',
                    },
                ],
            });
        },
    });
}

function createPaymentData() {
    return {
        terminalKey: terminalKey.value,
        paymentItems: [
            {
                container: document.getElementById("tinkoffWidgetContainer1"),
                paymentInfo: function () {
                    return {
                        paymentData: document.forms.TinkoffPayForm,
                    };
                },
            },
        ],
        paymentSystems: { TinkoffFps: {} },
    };
}

onMounted(() => {
    collectFormData()
    const widgetParameters = createPaymentData()
    initPayments(widgetParameters)
})
</script>

<template>
    <div>
        <form ref="formRef" name="TinkoffPayForm">
            <input class="tinkoffPayRow" type="hidden" name="terminalkey" :value="terminalKey" />
            <input class="tinkoffPayRow" type="hidden" name="language" value="ru" />
            <input class="tinkoffPayRow" type="hidden" name="receipt" value="">
            
            <input class="tinkoffPayRow" type="text" placeholder="Сумма заказа" name="amount" value="111" required
            min="10.00" /> 
            <input class="tinkoffPayRow" type="text" placeholder="Номер заказа" name="order" />
            <input class="tinkoffPayRow" type="text" placeholder="Описание заказа" name="description" />
            <input class="tinkoffPayRow" type="text" placeholder="ФИО плательщика" name="name" />
            <input class="tinkoffPayRow" type="text" placeholder="E-mail" name="email" />
            <input class="tinkoffPayRow" type="text" placeholder="Контактный телефон" name="phone" />
        </form>
        <div id="tinkoffWidgetContainer1"></div>
    </div>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    background-color: #f0f0f0;
    padding: 10px 15px;
}

button {
    padding: 10px;
    background-color: rgb(0, 186, 219);
    color: white;
}
</style>