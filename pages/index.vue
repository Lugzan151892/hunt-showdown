<template>
    <div class="content">
        main page
    </div>
</template>

<script setup lang="ts">
    import { authStore } from '@/store/auth';
    const auth = authStore();
    const isAuth = computed(() => {
        return auth.isAuth;
    });

    const router = useRouter();

    onMounted(() => {
        if(!isAuth.value) {
            router.push({ name: 'login' })
        }
    })
</script>

<style lang="scss" scoped>
    .content {
    }
</style>