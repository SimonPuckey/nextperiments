// import Document, {
//   Html,
//   Head,
//   Main,
//   NextScript,
//   DocumentContext,
//   DocumentInitialProps,
// } from "next/document";
// import { ServerStyleSheet } from "styled-components";

// export default class MyDocument extends Document {
//   static async getInitialProps(
//     ctx: DocumentContext
//   ): Promise<DocumentInitialProps> {
//     const sheet = new ServerStyleSheet();
//     const originalRenderPage = ctx.renderPage;

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             sheet.collectStyles(<App {...props} />),
//         });

//       const initialProps = await Document.getInitialProps(ctx);

//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         ),
//       };
//     } finally {
//       sheet.seal();
//     }
//   }

//   render() {
//     // eslint-disable-next-line no-underscore-dangle
//     const nextProps = this.props.__NEXT_DATA__.props.initialProps;

//     return (
//       <Html lang="en">
//         <Head>
//           {/* example at next-pwa has a lot more stuff in it but doesnt look necessary */}
//           {/* may need more icons though for diff screens?? */}
//           <link rel="manifest" href="/manifest.json" />
//           <link rel="apple-touch-icon" href="/icon.png"></link>
//           <meta name="theme-color" content="#fff" />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }
