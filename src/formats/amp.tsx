import React from 'react'
import { useLocation } from 'react-router-dom'

import { IFormatProps } from './html'

export const Amp = ({ children, description, style, title }: IFormatProps) => {
  const location = useLocation()
  const uri = `${location.pathname}${location.search}`

  return (
    <html amp="" lang="en">
      <head>
        <base href="/" />
        {title && <title>{title}</title>}
        <link rel="canonical" href={`https://localhost:8080${uri}`} />
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"></meta>
        {description && <meta name="description" content={description}></meta>}
        <script async src="https://cdn.ampproject.org/v0.js" />
        <script
          async
          custom-element="amp-script"
          src="https://cdn.ampproject.org/v0/amp-script-0.1.js"
        />
        <style
          amp-boilerplate=""
          dangerouslySetInnerHTML={{
            __html:
              'body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}'
          }}
        />
        <noscript>
          <style
            amp-boilerplate=""
            dangerouslySetInnerHTML={{
              __html:
                'body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}'
            }}
          />
        </noscript>
        {style && <style amp-custom="">{style}</style>}
      </head>
      <body>
        <amp-script
          layout="responsive"
          width="9"
          height="16"
          src="https://localhost:8080/dist/amp.js"
          sandbox="allow-forms">
          <input type="hidden" name="location" value={`${uri}`} />
          <div id="root"></div>
        </amp-script>
      </body>
    </html>
  )
}

export default Amp
