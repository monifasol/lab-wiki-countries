import "./App.css";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";

function App() {

  return (
    
    <div className="App">

      <NavBar />

      <div className="container">
        <CountriesList />

        <Switch>
          <Route path={`/country-details/:alpha3Code`} component={CountryDetails} />
        </Switch>
      </div>

  </div>
  )
}
export default App;
