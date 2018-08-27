import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import React from 'react'


const resetStyles = `
* {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
  font-size: 100%;
}
body {
  min-height: 100vh;
  font-family: Montserrat, sans-serif;
  box-sizing: border-box;
  background-color: #eeeeee;
}
`

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()

    return { ...page, styleTags }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height" />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,900&amp;subset=cyrillic,cyrillic-ext"
            rel="stylesheet"
          />
          <style>{resetStyles}</style>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
