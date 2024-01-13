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
	game_hide_statistics: true,
	hud_ui_scale: 1,
	hud_cursor_sensitivity: 1,
	hud_chatbox_opacity: 1,
	hud_compass_opacity: 1,
	hud_crosshair_opacity: 1,
	hud_equipment_opacity: 1,
	hud_health_and_stamina_display_opacity: 1,
	hud_objective_status_opacity: 1,
	hud_indicator_opacity: 1,
	hud_auto_hide_ammo_display: true,
	hud_auto_hide_chatbox: true,
	hud_auto_hide_equipment_display: true,
	hud_auto_hide_health_and_stamina_displays: true,
	hud_show_ping_marker: true,
	hud_show_player_names: true,
	hud_highlight_interactable_objects: 0,
	hud_high_contrast_prompts: true,
	audio_master: 1,
	audio_sfx: 1,
	audio_music: 1,
	audio_communication: 1,
	audio_menu_ambience: 1,
	audio_dialogue: 1,
	audio_dialogue_subtitles: true,
	audio_voice_chat_mode: 0,
	audio_hide_voip_icons: true,
	audio_mute_voip_on_death: true,
	audio_ignore_window_focus: true,
	graphics_resolution: 17,
	graphics_window_mode: 3,
	graphics_render_resolution_scale: 1,
	graphics_gamma: 1,
	graphics_video_memory_usage_target: 1,
	graphics_global_graphics_quality: 1,
	graphics_object_quality: 1,
	graphics_texture_quality: 1,
	graphics_texture_filtering: 1,
	graphics_anti_aliasing: 1,
	graphics_lighting_quality: 1,
	graphics_shadow_quality: 1,
	graphics_effect_quality: 1,
	graphics_post_process_quality: 1,
	graphics_particle_quality: 1,
	graphics_perfomance_stats: 1,
	graphics_v_sync: false,
	graphics_max_fps: 9,
	graphics_depth_of_field: true,
	graphics_motion_blur: false,
	graphics_surface_format_optimization: false,
	graphics_toggle_gpu_tessellation: false,
	graphics_use_2_pass_scene_rendering: false,
	graphics_use_2_pass_lighting: false
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
	};

	const isSettingsChanged = computed(() => {
		if (!currentUser.value) return false;
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
