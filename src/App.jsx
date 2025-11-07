import Buscador from "./components/Buscador/Buscador"
import { useEffect, useState } from 'react'
import ProductDetail from './components/Product/ProductDetail'
import SalesList from './components/Sales/SalesList'
import { onLocationChange } from './utils/navigation'

const App = () => {
  const [location, setLocation] = useState(window.location)

  useEffect(() => {
    const unsubscribe = onLocationChange((loc) => setLocation(loc))
    // handle initial
    setLocation(window.location)
    return unsubscribe
  }, [])

  // Simple router (sin react-router)
  const pathname = location.pathname

  // /item/:id
  const itemMatch = pathname.match(/^\/item\/(\d+)$/)

  if (itemMatch) {
    const id = itemMatch[1]
    return <ProductDetail id={id} />
  }

  if (pathname === '/sales') {
    return <SalesList />
  }

  // Default: home (Buscador) — also covers / and /items
  return <Buscador />
}

export default App
