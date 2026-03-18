# Movie DB

A pet project exploring how to build a React-like framework from scratch using vanilla TypeScript.

[Live Demo](https://cheery-travesseiro-81ba1d.netlify.app) · [The Movie DB API](https://developers.themoviedb.org/3)

## The "Framework"

- **Declarative UI** — Tagged template literals (`html`\`...\``)
- **Components** — Functions returning `DocumentFragment`
- **Event binding** — Data attributes (`data-on-click="handler"`)
- **State** — Pub/sub pattern for reactive updates

```ts
const MyComponent = ({ title }) => {
  const template = html`<button data-on-click="onClick">${title}</button>`;
  const onClick = () => console.log('clicked');
  return createElement(template, { onClick });
};
```

## Lighthouse

![Lighthouse scores](./lighthouse.png)

## Running locally

```sh
yarn && yarn start
```

