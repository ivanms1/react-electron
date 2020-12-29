import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Hello = () => {
  return (
    <div>
      <h1>Todo App</h1>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
