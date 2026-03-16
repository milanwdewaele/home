# Milan Dewaele — Portfolio

Win95 brutalist SvelteKit portfolio.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Projecten toevoegen

In `src/routes/+page.svelte`, zoek:

```js
const projects = []; // add { title, desc, url, tags[] } objects here
```

Voorbeeld:

```js
const projects = [
  {
    title: 'tinebot',
    desc: 'Discord bot voor PROG1.',
    url: 'https://github.com/milanwdewaele/tinebot',
    tags: ['JavaScript', 'Discord', 'Node.js']
  }
];
```
