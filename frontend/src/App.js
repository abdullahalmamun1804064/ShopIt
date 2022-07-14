import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";


import Header from './components/layout/Header';
import ProductDeatils from "./components/product/ProductDetails";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDeatils />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
