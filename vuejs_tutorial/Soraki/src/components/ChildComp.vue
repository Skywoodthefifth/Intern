<script setup>
//part 12
const props = defineProps({
    msg: String
})
//part 13
const emit = defineEmits(['response'])

emit('response', 'hello from child')
</script>

<template>
    <!-- part 11-->
    <h2>A Child Component!</h2>

    <!-- part 12-->
    <h2>{{ msg || 'No props passed yet' }}</h2>

    <!--part 14-->
    <slot>Fallback content</slot>
</template>