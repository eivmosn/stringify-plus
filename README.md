## Install
```bash
pnpm install stringify-plus
```

## Usage
```typescript
import { stringify, parse } from 'stringify-plus'

interface Person {
    name: string
    age: number
    hobbies: string[]
    regex: RegExp
    greet: () => void
    amount: undefined
    married: boolean
    book: {
      title: string
      company: null
    }
}

const input: Person = {
    name: 'John',
    age: 22,
    hobbies: ['code', 'design'],
    regex: /[a-z]+/g,
    greet: ()=> console.log('Hello, world!'),
    amount: undefined,
    married: true,
    book: {
      title: 'Hi',
      company: null
    }
}

const output = stringify(input)

console.log(output)

const parsed = parse<Person>(output)

console.log(parsed)

```
