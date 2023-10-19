# Next-Spa-Pwa

This project is a sandbox for building a NextJs app deployable as a Progressive Web Application

## NextJs

_The following is the nextjs readme that is part of the bootstrap. Customisations will follow. TODO: Need to separate this out..._

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Environment Variables

**Docker**

As using docker-compose to run multiple processes as containers, the server-side api url available at build time is different to the public api url available at runtime to the client.

## Next-PWA

[PWA](https://web.dev/learn/pwa/) plugin for NextJs, powered by [workbox](https://developer.chrome.com/docs/workbox/)

### Getting started

Follow the steps in [Next-PWA docs](https://github.com/shadowwalker/next-pwa)

**Diff**

- have tried to strip down [Head Meta tags](https://github.com/shadowwalker/next-pwa#step-3-add-head-meta-example) in `\_document.jsx` to only what is immediately needed
- have used `worker/index.js`

**Alternatives to Next-PWA**
Next-PWA has not been updated in a while and concerned wont work with NextJs 13 app router

- Forks of next-pwa
- [Next-With-Workbox](https://www.npmjs.com/package/next-with-workbox)

### Caching Strategy

The service worker generated in the `public` folder uses a `NetworkFirst` strategy. This may bot be suitable for production or all requests but leaving for now. In event need to revisit caching strategies in the future, useful info on service worker caching strategies is linked to from the [next-pwa docs](https://web.dev/service-worker-caching-and-http-caching/). There is also a lot of other useful info, often provided by the Google Workbox team:

- https://web.dev/runtime-caching-with-workbox
- https://developer.chrome.com/docs/workbox/modules/workbox-strategies/
- https://developer.chrome.com/docs/workbox/caching-strategies-overview/
- https://web.dev/service-worker-caching-and-http-caching/
- https://www.harrytheo.com/blog/2021/03/workbox-strategies-with-examples-and-use-cases/
