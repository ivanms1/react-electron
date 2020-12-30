import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import { AppProvider } from './components/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AppProvider>
  );
}
