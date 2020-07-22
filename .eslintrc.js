module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: ['docs/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
