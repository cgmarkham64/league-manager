import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Players from "../Pages/Players/Players";
import Leagues from "../Pages/Leagues/Leagues";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Sign-Up/Sign-Up";
import ContactUs from "../Pages/Contact-Us/Contact-Us";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login} />
        <Route path="/players" component={Players}/>
        <Route path="/leagues" component={Leagues}/>
        <Route path="/register" component={SignUp} />
        <Route path="/contact-us" component={ContactUs} />
        {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
        <Route component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;