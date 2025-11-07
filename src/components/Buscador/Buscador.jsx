import { useEffect, useState } from "react"
import { Container, Alert } from "react-bootstrap"
import { ProductsService } from "../../services/products.service"
import SearchBar from "../SearchBar/SearchBar"
import ListProducts from "../Product/ListProducts"
import "./Buscador.css"


const Buscador = () => {
  // Instancia del servicio de productos
  const prodObject = new ProductsService()
  
  // Estado para almacenar todos los productos
  const [allProducts, setAllProducts] = useState([])
  
  // Estado para los productos filtrados (los que se mostrarán)
  const [filteredProducts, setFilteredProducts] = useState([])
  
  // Estado para saber si se ha realizado una búsqueda
  const [hasSearched, setHasSearched] = useState(false)
  
  // Estado para manejar la carga
  const [loading, setLoading] = useState(true)

  const [ alertError, setAlertError ] = useState(false);

  // Efecto que se ejecuta al montar el componente para cargar todos los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await prodObject.getAllProducts()
        setAllProducts(products)
  console.log('Productos cargados en Buscador:', products && products.length ? products.slice(0,3) : products)
        setLoading(false)
      } catch (error) {
        setAlertError(true);
        console.error("Error cargando productos:", error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  /**
   * Función que maneja la búsqueda
   * Filtra los productos por nombre según el término de búsqueda
   */
  const handleSearch = (searchTerm) => {
    setHasSearched(true)
    
    // Convertir el término de búsqueda a minúsculas para comparación
    const term = searchTerm.toLowerCase()
    
    // Filtrar productos que contengan el término en su nombre
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(term)
    )
    
    setFilteredProducts(filtered)
  }

  return (
    <div className="buscador-page">
      {/* Header con logo y título */}
      <Container className="header-section text-center py-4">
        <img 
          src="/logo_bazar_padilla.png" 
          alt="Bazar Universal Logo" 
          className="app-logo mb-3"
        />
        <h1 className="app-title">Bazar Universal</h1>
        <p className="app-subtitle">Encuentra todo lo que necesitas</p>
      </Container>

      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {alertError && (
        <Alert key={alertError} variant="danger">
          Error cargando productos. Por favor, inténtalo de nuevo más tarde.
        </Alert>
      )}

      {/* Lista de productos */}
      {loading ? (
        <Container className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </Container>
      ) : (
        // Si ya se realizó una búsqueda mostramos los filtrados, si no mostramos todos los productos
        hasSearched ? (
          <ListProducts products={filteredProducts} searchTerm={true} />
        ) : (
          <ListProducts products={allProducts} searchTerm={false} />
        )
      )}
    </div>
  )
}

export default Buscador
