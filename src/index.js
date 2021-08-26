import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from "./router/index"
import Main from "./view/Main.jsx"
import Mine from "./view/Mine.jsx"
import Recommend from "./components/recommend"
import App from './App';
import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import reportWebVitals from './reportWebVitals';
const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <div style={{
        padding: "120px 20px 70px 20px"
      }}>
        <Switch>
          <Route path="/" component={App}>
          <Redirect from="/" to="/main"></Redirect>
            <Route component={Main} path="/main">
            </Route>
           
            {/* <Route component={Main} exact path="main">
            </Route> */}
            <Route component={Mine} exact path="/mine">
            </Route>

          </Route>
        </Switch>
      </div>
      <App></App>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
