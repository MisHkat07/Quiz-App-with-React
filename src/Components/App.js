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

function App() {
  return (
    <Router>
  <AuthProvider>
            <Layout>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/login" component={LogIn}/>
          <Route exact path="/quiz" component={Quiz}/>
          <Route exact path="/result" component={Result}/>
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
