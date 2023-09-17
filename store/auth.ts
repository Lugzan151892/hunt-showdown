import { defineStore } from "pinia";

export const authStore = defineStore("auth", () => {
    const isAuth = ref(false);

    return {
        isAuth
    }
});
