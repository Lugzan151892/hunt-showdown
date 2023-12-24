import { defineStore } from 'pinia';

export const useHuntStore = defineStore('hunt', () => {
	const hunt = ref('Hunt Showdown');

	return {
		hunt
	};
});
