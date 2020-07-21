import React from 'react'

export interface IFormatProps {
  children: React.ReactNode
  description?: string
  page?: string
  style?: string
  title?: string
}

export const Html = ({
  children,
  description,
  page,
  title
}: IFormatProps): React.ReactNode => (
  <html lang="en">
    <head>
      <base href="/" />
      {title && <title>{title}</title>}
      <meta charSet="utf-8" />
      {description && <meta name="description" content={description}></meta>}
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <link rel="stylesheet" href="dist/styles.css" />
      <script src="dist/html.js" defer />
      {/* <script src={`dist/pages/${page}.js`} defer /> */}
    </head>
    <body>
      <div id="root">{children}</div>
    </body>
  </html>
)

export default Html
