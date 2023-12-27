import { defineStore } from 'pinia';

export const useHuntStore = defineStore('hunt', () => {
	const hunt = ref('Hunt Showdown');

	const settings = ref<{ [key: string]: any }>({
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
		game_keep_lowered_state: true,
		game_sprint_to_aim_transition: 0,
		game_auto_move: true,
		game_auto_interract: true,
		game_opt_out_from_rich_presence: true,
		game_show_additional_hint_banners: true,
		game_invert_camera_y_axis: true,
		game_hide_statistics: true
	});

	return {
		hunt,
		settings
	};
});
