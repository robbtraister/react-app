import React, { Suspense, lazy } from 'react'

const wrapImport = (
  importFn: () => Promise<{ default: React.ComponentType<any> }>
) => {
  const Component = lazy(importFn)

  const AsyncComponent = () => (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  )

  return AsyncComponent
}

const Home = wrapImport(() =>
  import(/* webpackChunkName: "pages/home" */ '~/app/pages/home')
)
const About = wrapImport(() =>
  import(/* webpackChunkName: "pages/about" */ '~/app/pages/about')
)

export const pages = {
  '/home': Home,
  '/about': About
}

export default pages
