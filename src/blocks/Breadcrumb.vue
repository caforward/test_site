<template>
    <div class="breadcrumb">
        <a :href="mainPage.href" class="breadcrumb-link">
            {{ mainPage.name }}
        </a>
        <span class="breadcrumb__delimeter">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.96967 4.46967C7.26256 4.17678 7.73744 4.17678 8.03033 4.46967L12.8536 9.29289C13.2441 9.68342 13.2441 10.3166 12.8536 10.7071L8.03033 15.5303C7.73744 15.8232 7.26256 15.8232 6.96967 15.5303C6.67678 15.2374 6.67678 14.7626 6.96967 14.4697L11.4393 10L6.96967 5.53033C6.67678 5.23744 6.67678 4.76256 6.96967 4.46967Z"
                    fill="#0096D8" />
            </svg>
        </span>
        <template v-for="(matched, idx) in $route.matched" :key="idx" class="breadcrumb-link__wrapper">
            <template v-if="idx != $route.matched.length - 1">
                <a :href="matched.path" class="breadcrumb-link">
                    {{ matched.name }}
                </a>
                <span class="breadcrumb__delimeter">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M6.96967 4.46967C7.26256 4.17678 7.73744 4.17678 8.03033 4.46967L12.8536 9.29289C13.2441 9.68342 13.2441 10.3166 12.8536 10.7071L8.03033 15.5303C7.73744 15.8232 7.26256 15.8232 6.96967 15.5303C6.67678 15.2374 6.67678 14.7626 6.96967 14.4697L11.4393 10L6.96967 5.53033C6.67678 5.23744 6.67678 4.76256 6.96967 4.46967Z"
                            fill="#0096D8" />
                    </svg>
                </span>
            </template>
            
            <span v-else class="breadcrumb-link breadcrumb-link_current">
                {{ matched.name }}
            </span>
        </template>
    </div>
</template>

<script>
export default {
    name: "Breadcrumb",
    data() {
        return {
            mainPage: {
                name: 'Главная',
                href: '/'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 5px;

    &__delimeter {
        display: flex;
        align-items: center;
    }

    &-link {
        font-size: 14px;
        line-height: 143%;
        color: $gray-dark;

        &_current {
            color: #292d32;
        }
    }
}
</style>