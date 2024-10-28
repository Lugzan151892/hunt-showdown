import { defineStore } from 'pinia';
import { useAuthStore } from '~/pages/auth/store/authStore';
import api from '~/services/api';
import { useMainStore } from '~/store/mainStore';

const defaultSettings = (): { [key: string]: any } => ({
	game_control_sheme: 0,
	game_field_of_view: 110,
	game_lowered_state_field_of_view: 0,
	game_shoulder_aim_field_of_view: 0,
	game_shoulder_aim_input: 0,
	game_aim_down_sights_input: 0,
	game_sensitivity_default: 0.7,
	game_sensitivity_shoulder_aim: 0.6,
	game_sensitivity_aim_down_sights: 0.45,
	game_sensitivity_deadeye_scope: 0.4,
	game_sensitivity_marksman_scope: 0.35,
	game_sensitivity_sniper_scope: 0.25,
	game_sensitivity_aperture: 0.4,
	game_sprint: 0,
	game_crouch: 1,
	game_map: 1,
	game_keep_lowered_state: false,
	game_sprint_to_aim_transition: 1,
	game_auto_move: false,
	game_auto_interract: false,
	game_opt_out_from_rich_presence: false,
	game_show_additional_hint_banners: true,
	game_invert_camera_y_axis: false,
	game_hide_statistics: false,
	hud_ui_scale: 100,
	hud_cursor_sensitivity: 1,
	hud_chatbox_opacity: 100,
	hud_compass_opacity: 100,
	hud_crosshair_opacity: 100,
	hud_equipment_opacity: 100,
	hud_health_and_stamina_display_opacity: 100,
	hud_objective_status_opacity: 100,
	hud_indicator_opacity: 100,
	hud_auto_hide_ammo_display: false,
	hud_auto_hide_chatbox: true,
	hud_auto_hide_equipment_display: false,
	hud_auto_hide_health_and_stamina_displays: false,
	hud_show_ping_marker: true,
	hud_show_player_names: true,
	hud_highlight_interactable_objects: 2,
	hud_high_contrast_prompts: false,
	audio_master: 80,
	audio_sfx: 40,
	audio_music: 20,
	audio_communication: 20,
	audio_menu_ambience: 20,
	audio_dialogue: 20,
	audio_dialogue_subtitles: true,
	audio_voice_chat_mode: 1,
	audio_hide_voip_icons: false,
	audio_mute_voip_on_death: true,
	audio_ignore_window_focus: false,
	graphics_resolution: 17,
	graphics_window_mode: 3,
	graphics_render_resolution_scale: 100,
	graphics_gamma: 1.3,
	graphics_video_memory_usage_target: 1,
	graphics_global_graphics_quality: 3,
	graphics_object_quality: 0,
	graphics_texture_quality: 0,
	graphics_texture_filtering: 5,
	graphics_anti_aliasing: 1,
	graphics_lighting_quality: 0,
	graphics_shadow_quality: 1,
	graphics_effect_quality: 0,
	graphics_post_process_quality: 1,
	graphics_particle_quality: 0,
	graphics_perfomance_stats: 2,
	graphics_v_sync: false,
	graphics_max_fps: 9,
	graphics_depth_of_field: false,
	graphics_motion_blur: false,
	graphics_surface_format_optimization: false,
	graphics_toggle_gpu_tessellation: false,
	graphics_use_2_pass_scene_rendering: false,
	graphics_use_2_pass_lighting: false
});

export const useHuntStore = defineStore('huntStore', {
	state() {
		const mainStore = useMainStore();
		const authStore = useAuthStore();
		return {
			mainStore,
			authStore,
			settings: defaultSettings()
		};
	},
	getters: {
		isSettingsChanged(): boolean {
			if (!this.mainStore.user || !this.mainStore.user.hunt_settings) {
				return false;
			}

			return Object.keys(this.settings).some((key) => this.settings[key] !== this.mainStore.user!.hunt_settings[key]);
		},

		isNotRecommendedSettings(): boolean {
			const defaultData = defaultSettings();
			return Object.keys(this.settings).some((key) => this.settings[key] !== defaultData[key]);
		},

		isUserHasSettings(): boolean {
			return !this.mainStore.user || !!Object.values(this.mainStore.user?.hunt_settings || {}).length;
		}
	},
	actions: {
		async saveUserSettings() {
			try {
				this.mainStore.loadingStart();
				const result = await api.put<any, any>('/user/set', { ...this.mainStore.user, hunt_settings: this.settings });
				if (result.success) {
					await this.handleFillSettings();
					this.mainStore.openModal('Настройки успешно сохранены');
				} else {
					this.mainStore.openModal(result.errorMessage, undefined, 'error');
				}
			} catch (e) {
				this.mainStore.openModal('Something went wrong, try again', undefined, 'error');
			} finally {
				this.mainStore.loadingStop();
			}
		},

		async handleFillSettings() {
			try {
				this.mainStore.loadingStart();
				await this.authStore.loadUser();

				if (this.mainStore.user && !this.mainStore.user?.hunt_settings) {
					this.mainStore.user.hunt_settings = defaultSettings();
				}

				Object.assign(this.settings, this.mainStore.user?.hunt_settings || {});
			} catch (e) {
				this.mainStore.openModal('Something went wrong, try again', undefined, 'error');
			} finally {
				this.mainStore.loadingStop();
			}
		},

		fillDefaultSettings() {
			Object.assign(this.settings, defaultSettings());
		}
	}
});

// export const useHuntStore = defineStore('hunt', () => {
// 	const hunt = ref('Hunt Showdown');
// 	const mainStore = useMainStore();
// 	const authStore = useAuthStore();

// 	const settings = ref<{ [key: string]: any }>(defaultSettings());

// 	const saveUserSettings = async () => {
// 		try {
// 			mainStore.loadingStart();
// 			const result = await api.put<any, any>('/user/set', { ...mainStore.user, hunt_settings: settings.value });
// 			if (result.success) {
// 				await handleFillSettings();
// 				mainStore.openModal('Настройки успешно сохранены');
// 			} else {
// 				mainStore.openModal(result.errorMessage, undefined, 'error');
// 			}
// 			mainStore.loadingStop();
// 		} catch (e) {
// 			mainStore.openModal('Something went wrong, try again', undefined, 'error');
// 		}
// 	};

// 	const handleFillSettings = async () => {
// 		const token = localStorage.getItem('token');
// 		if (token) {
// 			try {
// 				mainStore.loadingStart();
// 				await authStore.loadUser();

// 				if (mainStore.user && !mainStore.user?.hunt_settings) {
// 					mainStore.user.hunt_settings = defaultSettings();
// 				}

// 				Object.assign(settings.value, mainStore.user?.hunt_settings || {});
// 			} catch (e) {
// 				mainStore.openModal('Something went wrong, try again', undefined, 'error');
// 			} finally {
// 				mainStore.loadingStop();
// 			}
// 		} else {
// 			Object.assign(settings.value, mainStore.user?.hunt_settings);
// 		}
// 	};

// 	const fillDefaultSettings = () => {
// 		Object.assign(settings.value, defaultSettings());
// 	};

// 	const isSettingsChanged = computed(() => {
// 		if (!mainStore.user || !mainStore.user.hunt_settings) {
// 			return false;
// 		}

// 		return Object.keys(settings.value).some((key) => settings.value[key] !== mainStore.user!.hunt_settings[key]);
// 	});

// 	const isNotRecommendedSettings = computed(() => {
// 		const defaultData = defaultSettings();
// 		return Object.keys(settings.value).some((key) => settings.value[key] !== defaultData[key]);
// 	});

// 	const isUserHasSettings = computed(() => {
// 		if (!mainStore.user) return false;
// 		else return !!Object.values(mainStore.user?.hunt_settings || {}).length;
// 	});

// 	return {
// 		hunt,
// 		settings,
// 		saveUserSettings,
// 		handleFillSettings,
// 		isSettingsChanged,
// 		isNotRecommendedSettings,
// 		fillDefaultSettings,
// 		isUserHasSettings
// 	};
// });
