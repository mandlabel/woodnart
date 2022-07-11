import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from './Nav'
import { Products } from './components/Products'
import { SignUp } from './components/SignUp'
import { SignIn } from './components/SignIn'
import { SignOut } from './components/SignOut'
import { Upload } from './components/Upload'
import { Cart } from './components/Cart'
import { EditProduct } from './components/EditProduct'

import { ProfileProvider } from "./context/profileContext";
import { CartProvider } from "./context/cartContext";
import './bg.css'
function App() {
  return (
    <div className="App">
      <div className="bg">
      <ProfileProvider>
        <CartProvider>
          <Router forceRefresh={true}>
            <Nav />
            <Switch>
              <Route exact path="/" component={Products} />
              <Route path="/cart" component={Cart} />  
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signout" component={SignOut} />
              <Route path="/upload" component={Upload} />     
              <Route path="/update/:id" component={EditProduct} />  
            </Switch>
          </Router>
          </CartProvider>
      </ProfileProvider>
      </div>
      </div>
  )
}

export default App
