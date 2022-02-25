import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/App.css';
import Layout from './Layout';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import Quiz from './Pages/Quiz';
import Result from './Pages/Result';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <Router>
  <AuthProvider>
            <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <PublicRoute exact path="/signup" component={SignUp}/>
          <PublicRoute exact path="/login" component={LogIn}/>
          <PrivateRoute exact path="/quiz/:id" component={Quiz}/>
          <PrivateRoute exact path="/result/:id" component={Result}/>
        <Home />
        <SignUp />
        <LogIn />
        <Quiz />
        <Result />
      </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  );
}
export default App;
