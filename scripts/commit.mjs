import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import ansis from 'ansis'

const msgPath = path.resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE
  = /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.log(`${ansis.red('Invalid commit message!')} Please follow: https://www.conventionalcommits.org/zh-hans/v1.0.0/`)
  process.exit(1)
}
