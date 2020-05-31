module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  overrides: [
    {
      files: ['docs/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
