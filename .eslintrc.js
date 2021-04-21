module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'import/extensions': 'off', // Seems to be an issue in Foundry
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'comma-dangle': 'off', // Let prettier handle this
  },
  globals: {
    $: 'readonly',
    ActorSheet: 'readonly',
    Actor: 'readonly',
    Actors: 'readonly',
    ChatMessage: 'readonly',
    Handlebars: 'readonly',
    Hooks: 'readonly',
    Roll: 'readonly',
    RollTable: 'readonly',
    game: 'readonly',
    CONFIG: 'readonly',
    mergeObject: 'readonly',
  },
};
