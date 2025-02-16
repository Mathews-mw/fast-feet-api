module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				printWidth: 120,
				tabWidth: 2,
				useTabs: true,
				semi: true,
				arrowParens: 'always',
				trailingComma: 'es5',
				bracketSpacing: true,
				bracketLine: true,
				endOfLine: 'auto',
				arrowFunctionParens: 'always',
			},
		],
		camelcase: 'off',
		'no-undef': 'off',
		'prefer-const': 'off',
		'no-unused-vars': 0,
		'dot-notation': 'off',
		'no-useless-constructor': 'off',
		'no-trailing-spaces': 'error',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-namespace': 'off',
	},
	settings: {
		'import/parsers': {
			[require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
		},
	},
};
