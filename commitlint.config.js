module.exports = {
   extends: ['@commitlint/cli', '@commitlint/config-conventional'],
   rules: {
      'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert', 'build', 'ci']],
      'subject-case': [2, 'always', 'sentence-case'],
   },
};
