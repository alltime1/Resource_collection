import Main from "../view/Main.jsx"
import Mine from "../view/Mine.jsx"
import {Route,Switch, withRouter } from 'react-router-dom';
function routers() {
  return (
    <Switch>
        <Route component={Main} exact path="/">
        </Route>
        <Route component={Main} exact path="/main">
        </Route>
        <Route component={Mine} exact path="/mine">
        </Route>
    </Switch>
  )
}
export default withRouter(routers) 