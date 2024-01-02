module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser'
	},
	extends: ['plugin:vue/vue3-recommended', '@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
	plugins: ['eslint-plugin-vue'],
	rules: {
		'vue/html-closing-bracket-newline': [
			'error',
			{
				singleline: 'never',
				multiline: 'always'
			}
		],
		'vue/html-indent': [
			'error',
			'tab',
			{
				baseIndent: 1,
				closeBracket: 0,
				alignAttributesVertically: true,
				ignores: []
			}
		],
		'prettier/prettier': ['error', { endOfLine: 'auto' }]
	}
};
