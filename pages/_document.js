import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta property="og:title" content="Lingerie brands catalog."/>
          <meta property="og:description" content="A list and catalog of lingerie brands assembled and lovely currated by scaredpanties."/>
          <meta property="og:image" content="https://blog.scaredpanties.com/content/images/2020/01/fb_preview.jpg"/>
          <meta property="og:url" content="https://catalog.scaredpanties.com"/>


          <meta name="twitter:title" content="Lingerie brands catalog."/>
          <meta name="twitter:description" content="A list and catalog of lingerie brands assembled and lovely currated by scaredpanties."/>
          <meta name="twitter:image" content="https://blog.scaredpanties.com/content/images/2020/01/fb_preview.jpg"/>
          <meta name="twitter:card" content="summary_image_scaredpanties"/>

          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="icon" type="image/x-icon" href="favicon.ico" />
          <meta
            name="description"
            content="A handpicked and lovely curated lingerie brands catalog by scaredpanties."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
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
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};