import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Error from './components/Error';

function App() {
  return (
    <Routes onUpdate={() => window.scrollTo(0, 0)}>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

export default App;
