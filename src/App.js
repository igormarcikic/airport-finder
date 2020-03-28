import React from 'react';
import Navigation from './layout/Navigation';
import ByRadiusHome from './AirportByRadius/ByRadiusHome';
import ByNameHome from './AirportByName/ByNameHome';
import styles from './App.module.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Provider from './context/Context';

const App = () => {
  return (
    <div className={styles.App}>
      <Provider>
        <Router basename="/airport-finder">
            <Navigation>
              <Switch>
                  <Route 
                    exact
                    path="/" 
                    component={ByRadiusHome}
                  />
                  <Route 
                    exact
                    path="/byname" 
                    component={ByNameHome}
                  />
              </Switch>
            </Navigation>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
