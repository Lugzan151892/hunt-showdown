import { defineStore } from 'pinia';
import api from '~/services/api';
import { useMainStore } from '~/store/mainStore';

const defaultSettings = () => ({
	game_control_sheme: 0,
	game_field_of_view: 1,
	game_lowered_state_field_of_view: 0,
	game_shoulder_aim_field_of_view: 0,
	game_shoulder_aim_input: 0,
	game_aim_down_sights_input: 0,
	game_sensitivity_default: 1,
	game_sensitivity_shoulder_aim: 1,
	game_sensitivity_aim_down_sights: 1,
	game_sensitivity_deadeye_scope: 1,
	game_sensitivity_marksman_scope: 1,
	game_sensitivity_sniper_scope: 1,
	game_sensitivity_aperture: 1,
	game_sprint: 0,
	game_crouch: 0,
	game_map: 0,
	game_keep_lowered_state: false,
	game_sprint_to_aim_transition: 0,
	game_auto_move: false,
	game_auto_interract: true,
	game_opt_out_from_rich_presence: true,
	game_show_additional_hint_banners: true,
	game_invert_camera_y_axis: true,
	game_hide_statistics: true
});

export const useHuntStore = defineStore('hunt', () => {
	const hunt = ref('Hunt Showdown');
	const mainStore = useMainStore();

	const settings = ref<{ [key: string]: any }>(defaultSettings());

	const saveUserSettings = async () => {
		try {
			const result = await api.put('/user/set', { ...mainStore.user, settings: settings.value });
			if (result.status === 200 && !result.error) {
				mainStore.user = result.user;
				Object.assign(settings.value, result.user.settings);
				mainStore.openModal('Настройки успешно сохранены');
			} else {
				mainStore.openModal(result.message, undefined, 'error');
			}
		} catch (e) {
			mainStore.openModal(e as string, undefined, 'error');
		}
	};

	const handleFillSettings = async () => {
		if (!currentUser.value) {
			settings.value = defaultSettings();
		} else {
			const token = localStorage.getItem('token');
			if (token) {
				try {
					const result = await api.get('/user/get', token);
					if (result.status === 200 && !result.error) {
						mainStore.user = result.user;
						Object.assign(settings.value, result.user.settings);
					} else mainStore.openModal(result.message, undefined, 'error');
				} catch (e) {
					mainStore.openModal(e as string, undefined, 'error');
				}
			} else {
				Object.assign(settings.value, mainStore.user?.settings);
			}
		}
	};

	const isSettingsChanged = computed(() => {
		if (!currentUser.value || !Object.values(currentUser.value.settings).length) return false;
		else {
			return Object.keys(settings.value).some((key) => settings.value[key] !== currentUser.value?.settings[key]);
		}
	});

	const currentUser = computed(() => mainStore.user);

	return {
		hunt,
		settings,
		saveUserSettings,
		handleFillSettings,
		currentUser,
		isSettingsChanged
	};
});
