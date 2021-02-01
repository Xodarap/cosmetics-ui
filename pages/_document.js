import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="description" content="Upload a picture of yourself wearing makeup and a machine learning algorithm will evaluate its quality."/>
        <meta name="author" content="@Benthamite"/>
        <meta property="og:url"                content="https://2face2furious.com/"/>
        <meta property="og:title"              content="2Face2Furious" />
        <meta property="og:description"        content="Upload a picture of yourself wearing makeup and a machine learning algorithm will evaluate its quality." />
        <meta property="og:type"               content="website" />
        <meta property="og:image"              content="https://2face2furious.com/img/favicon.ico" />

        <link rel="icon" type="image/png" href="/img/favicon.ico"/> 
        <script dangerouslySetInnerHTML={{__html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-8TCGQ4ZX1B');`}}/>
        </Head>
        <body>
          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NCTD2FH"
          height="0" width="0" style={{display:"none", visibility: "hidden"}}></iframe></noscript>
          <div id="page-transition"></div>
          
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;
