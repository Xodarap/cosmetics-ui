import React from "react";
import Document, { Head, Main, NextScript, Html } from "next/document";
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../src/createEmotionCache'; // You'll need to create this file

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="description" content="Upload a picture of yourself wearing makeup and a machine learning algorithm will evaluate its quality."/>
          <meta name="author" content="@Benthamite"/>
          <meta property="og:url" content="https://2face2furious.com/"/>
          <meta property="og:title" content="2Face2Furious" />
          <meta property="og:description" content="Upload a picture of yourself wearing makeup and a machine learning algorithm will evaluate its quality." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://2face2furious.com/img/favicon.ico" />
          
          <title>2Face2Furious</title>
          <link rel="icon" type="image/png" href="/img/favicon.ico"/> 
          
          {/* Emotion insertion point for MUI styles */}
          <meta name="emotion-insertion-point" content="" />
          
          {/* Emotion styles */}
          {this.props.emotionStyleTags}
          
          <script dangerouslySetInnerHTML={{__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8TCGQ4ZX1B');`}}/>
        </Head>
        <body>
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NCTD2FH"
              height="0" width="0" style={{display:"none", visibility: "hidden"}}>
            </iframe>
          </noscript>
          <div id="page-transition"></div>
          
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};

export default MyDocument;