module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(?:SITE-(\w+):\s)(\w+)(.+)/,
      headerCorrespondence: ['task', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed) => {
          const { type, scope, subject } = parsed;
          if (type === null && scope === null && subject === null) {
            return [false, "commit must be in format 'SITE-{task}: {subject}'"];
          }
          return [true, ''];
        },
        task: (parsed) => {
          const { task } = parsed;
          if (!task) {
            return [false, "commit must be in format 'SITE-{task}: {subject}'"];
          }
          return [true, ''];
        },
      },
    },
  ],
  rules: {
    'header-match-team-pattern': [2, 'always'],
    task: [2, 'always'],
    'subject-case': [2, 'always', 'sentence-case'],
  },
};
