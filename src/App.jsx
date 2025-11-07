import Buscador from "./components/Buscador/Buscador"
import { Routes, Route, Navigate } from 'react-router-dom'
import ProductDetail from './components/Product/ProductDetail'
import SalesList from './components/Sales/SalesList'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Buscador />} />
      <Route path="/items" element={<Buscador />} />
      <Route path="/item/:id" element={<ProductDetail />} />
      <Route path="/sales" element={<SalesList />} />
      {/* fallback to home for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
