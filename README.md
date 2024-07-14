## Install
```bash
pnpm install stringify-plus
```

## Usage
```typescript
import { stringify, parse } from 'stringify-plus'

const input = {
  name: 'John',
  age: 22,
  hobbies: ['code', 'design'],
  regex: /[a-z]+/g,
  greet: () => console.log('Hello, world!'),
  amount: undefined,
  married: true,
  book: {
    title: 'Hi',
    company: null,
    author: (name) => {
      return `@${name}`
    },
  },
}

const output = stringify(input)

console.log(output)

const parsed = parse<typeof input>(output)

console.log(parsed)

```
