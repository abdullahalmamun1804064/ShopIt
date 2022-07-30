import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Login from './components/user/Login'
import Register from './components/user/Register';

import Header from './components/layout/Header';
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} />
        <Route path="/product/:id" component={ProductDetails} exact />

        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />

        <Footer />
      </div>
    </Router>
  );
}

export default App; 
