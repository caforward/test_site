<template>
    <div>
        <span v-for="(matched, idx) in this.$route.matched" :key="idx">
            <a :href="matched.path">
                {{ matched.name }}
            </a>
            <span v-if="idx != Object.keys(this.$route.matched).length - 1">
                /
            </span>
        </span>
    </div>
</template>

<script>
export default {
    name: "Breadcrumb",
    data () {
        console.log(this.$route)
        return{}
    }
}
</script>