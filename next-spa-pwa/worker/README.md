# Service Worker Override

## Reasoning

The approach was suggested in [next-pwa docs](https://github.com/shadowwalker/next-pwa#tips) as a strategy for disabling logging in dev when service worker is running

Perhaps it can be used more widely e.g. for changing caching strategy without updating generated worker js. Changing an auto-generated file is obviously risky and undesirable

## Behaviour

Not sure if any code in this `worker/index.js` will override corresponding settings in the generated `sw.js` & `public/worker-{id}.js`.
However it does seem to add code to the generated `public/worker-development.js`, that in turn does seem to override the generated worker js as far as logging is concerned.
