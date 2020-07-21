import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import './index.scss'

export const App = ({
  pages
}: {
  pages: Record<string, React.ComponentType<{}>>
}) => (
  <Switch>
    {Object.entries(pages).map(([path, component]) => (
      <Route key={path} path={path} component={component} />
    ))}
    <Route path="/" render={() => <Redirect to="/home" />} />
  </Switch>
)

export default App
