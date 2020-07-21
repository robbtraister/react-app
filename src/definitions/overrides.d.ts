declare namespace JSX {
  interface HtmlExtensions extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
    amp?: string
  }

  interface IntrinsicElements {
    'amp-script': any
    html: React.DetailedHTMLProps<HtmlExtensions, HTMLHtmlElement>
    set: any
    'styled-components': any
  }
}
