import type { Config } from 'release-it';

export default {
  git: {
    commit: true,
    tag: false,
    push: true,
    commitMessage: 'release: release v${version}',
  },
  github: {
    release: false
  },
  npm: {
    publish: true
  }
} satisfies Config;