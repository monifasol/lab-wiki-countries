import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import ErrorPage from "./components/ErrorPage";
import { Redirect } from "react-router";

function App() {

  return (
    
    <div className="App">

      <NavBar />

      <div className="container">
        <CountriesList />

        <Switch>
          <Route exact path={`/`} />    
          <Route exact path={`/:id`} component={CountryDetails} />
          <Route path='*' exact component={ErrorPage} />
          <Redirect from='*' to='/not-found' />
        </Switch>

      </div>

  </div>
  )
}
export default App;
