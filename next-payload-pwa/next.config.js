const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");

/*** COMPOSE configs ***/
/* Not easily extendable but seems to impl both payload and pwa configs - havent played with order of calls */
module.exports = async () => {
  /**
  * @type {import('next').NextConfig}
  * @type {import("next-pwa").PWAConfig}
  */
   const nextConfig = {
    reactStrictMode: true,
  }
  const pwaConfig = {
    // Config explained https://github.com/shadowwalker/next-pwa#configuration - put notes in jsdoc?
    // if dont need to run service worker caching in development
    disable: process.env.NODE_ENV === 'development',
    dest:'public'
  }
  const withPWA = require("next-pwa")(pwaConfig);
  const withPayloadConfig =  await withPayload(withPWA(nextConfig), {configPath: path.resolve(__dirname, "./payload/payload.config")});
  // Features are no longer experimental but Payload pkg not updated to reflect this
  const {experimental: {appDir, outputFileTracingIgnores, ...experimental}} = withPayloadConfig
  return {...withPayloadConfig, experimental}
}

/*** REDUCE configs ***/
/* Should be more easily extandable but doesnt work! - only last config fn in array takes effect */
/*
module.exports = (phase, { defaultConfig }) => {
   const nextConfig = {
    reactStrictMode: true,
  }
  const pwaConfig = {
          // Config explained https://github.com/shadowwalker/next-pwa#configuration - put notes in jsdoc?
    // if dont need to run service worker caching in development
    disable: process.env.NODE_ENV === 'development',
    dest:'public'
  }
  const withPWA = require("next-pwa")(pwaConfig);
  const plugins = [withPWA, withPayload ];
  return plugins.reduce(async (acc, next) => {
    if (next.name === 'withPayload') {
      // return next(acc,  {configPath: path.resolve(__dirname, "./payload/payload.config")});
    // Features are no longer experimental but pkg not updated
    const withPayloadConfig = await next(acc,  {configPath: path.resolve(__dirname, "./payload/payload.config")})
    const {experimental: {appDir, outputFileTracingIgnores, ...experimental}} = withPayloadConfig
    return {...withPayloadConfig, experimental}
    }
  
    return next(acc);
  }, {
    ...nextConfig,
  });
}
*/