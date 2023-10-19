const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");
const { defaultConfig } = require("next/dist/server/config-shared");
const { experimentalOverrides } = require("next/dist/server/require-hook");
const withPWA = require("next-pwa")({
  // if dont need to run service worker caching in development
  disable: process.env.NODE_ENV === 'development',
  dest:'public'
    // Config explained https://github.com/shadowwalker/next-pwa#configuration - put notes in jsdoc?
});

// TODO could wrap this config merging up as a package?
module.exports = async (_phase, { defaultConfig }) => {
  // Config must be JS file but can add type checking using JSDoc as below
  /**
   * @type {import('next').NextConfig}
   */
  // const x0 = path.resolve(__dirname, "./src/payload/payload.config");
  // console.log('x0', x0)
  const payloadConfig = await withPayload({reactStrictMode: true,},
    {
      // The second argument to `withPayload`
      // allows you to specify paths to your Payload dependencies
      // and configure the admin route to your Payload CMS.
      // Point to your Payload config (Required)
      configPath: path.resolve(__dirname, "./src/payload/payload.config"),
      // Point to custom Payload CSS (optional)
      // cssPath: path.resolve(__dirname, "./css/my-custom-payload-styles.css"),
      // Point to your exported, initialized Payload instance (optional, default shown below`)
      // payloadPath: path.resolve(process.cwd(), "./src/payload/payloadClient.ts"),
      // Set a custom Payload admin route (optional, default is `/admin`)
      // NOTE: Read the "Set a custom admin route" section in the payload/next-payload README.
      // adminRoute: "/admin",
    }
  );

  // Modifying WithPayload config so up to date with NextJs version
  const {experimental: {appDir, outputFileTracingIgnores, ...experimental}} = payloadConfig
  const payloadConfigMod = {...payloadConfig, experimental}

  const pwaConfig = withPWA();

  // const nextConfig = {
  //   reactStrictMode: true,
  // }

  // return {...payloadConfigMod, ...pwaConfig, ...nextConfig}
  return {...payloadConfigMod, ...pwaConfig}
}