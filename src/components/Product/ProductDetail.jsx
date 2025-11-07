import { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Alert, Carousel, Card, Spinner } from 'react-bootstrap'
import { ProductsService } from '../../services/products.service'
import { navigate } from '../../utils/navigation'
import { SalesService } from '../../services/sales.service'

const ProductDetail = ({ id }) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [registering, setRegistering] = useState(false)

  useEffect(() => {
    const svc = new ProductsService()
    const fetchProduct = async () => {
      try {
        const data = await svc.getProductById(id)
        setProduct(data)
      } catch (err) {
        console.error('Error cargando detalle:', err)
        setError('No se pudo cargar el producto')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const registerPurchase = async () => {
    // Intentar registrar la compra en la API; si no se puede, almacenar en localStorage
    setError(null)
    setSuccessMsg(null)
    setRegistering(true)
    const salePayload = {
      product: {
        productId: product.id || product._id,
        title: product.name || product.title || product.nombre,
        price: Number(product.price || product.cost || 0)
      },
      quantity: 1,
      buyer: { name: 'Anónimo', email: 'anonymous@example.com' },
      totalPrice: Number(product.price || product.cost || 0)
    }

    try {
      const svc = new SalesService()
      const res = await svc.createSale(salePayload)
      if (res && res.success) {
        // Guardar snapshot localmente también
        const sale = {
          saleId: res.data?.data?.saleId || Date.now(),
          productId: salePayload.product.productId,
          name: salePayload.product.title,
          price: salePayload.product.price,
          date: new Date().toISOString(),
          qty: salePayload.quantity
        }
        const existing = JSON.parse(localStorage.getItem('ub_sales') || '[]')
        existing.unshift(sale)
        localStorage.setItem('ub_sales', JSON.stringify(existing))
        setSuccessMsg('Compra registrada correctamente')
        setTimeout(() => navigate('/sales'), 900)
      } else {
        // Fallback: guardar en localStorage y notificar
        const sale = {
          saleId: Date.now(),
          productId: salePayload.product.productId,
          name: salePayload.product.title,
          price: salePayload.product.price,
          date: new Date().toISOString(),
          qty: salePayload.quantity
        }
        const existing = JSON.parse(localStorage.getItem('ub_sales') || '[]')
        existing.unshift(sale)
        localStorage.setItem('ub_sales', JSON.stringify(existing))
        setSuccessMsg('Compra registrada localmente (API no disponible o error)')
        setTimeout(() => navigate('/sales'), 900)
      }
    } catch (err) {
      console.error('Error registrando compra:', err)
      // Guardar localmente como fallback
      const sale = {
        saleId: Date.now(),
        productId: product.id || product._id,
        name: product.name || product.title || product.nombre,
        price: Number(product.price || product.cost || 0),
        date: new Date().toISOString(),
        qty: 1
      }
      const existing = JSON.parse(localStorage.getItem('ub_sales') || '[]')
      existing.unshift(sale)
      localStorage.setItem('ub_sales', JSON.stringify(existing))
      setError('No fue posible guardar en la API; la compra se guardó localmente')
      setTimeout(() => navigate('/sales'), 900)
    } finally {
      setRegistering(false)
    }
  }

  if (loading) return (
    <Container className="py-5 text-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    </Container>
  )
  if (error) return <Container className="py-5 text-center"><Alert variant="danger">{error}</Alert></Container>

  const images = product.images || product.pictures || (product.image ? [product.image] : [])

  return (
    <Container className="py-4">
      <Row>
        <Col xs={12} md={6}>
          {images && images.length > 0 ? (
            <Carousel>
              {images.map((src, i) => (
                <Carousel.Item key={i}>
                  <img className="d-block w-100" src={src} alt={`img-${i}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Card className="p-3 text-center">Sin imágenes</Card>
          )}
        </Col>
        <Col xs={12} md={6}>
          <h2>{product.name || product.title || product.nombre}</h2>
          <h4 className="text-primary">${(product.price || product.cost || 0).toFixed ? (product.price || product.cost || 0).toFixed(2) : (product.price || product.cost || 0)}</h4>
          <p className="text-muted">{product.description || product.descripcion}</p>

          <div className="mb-3">
            <strong>Marca:</strong> {product.brand || product.marca || 'N/A'}
          </div>
          <div className="mb-3">
            <strong>Stock:</strong> {product.stock ?? product.quantity ?? 'N/A'}
          </div>
          <div className="mb-3">
            <strong>Categoria:</strong> {product.category || 'N/A'}
          </div>

          <div className="d-flex gap-2">
            <Button variant="success" onClick={registerPurchase} disabled={registering}>
              {registering ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Registrando...
                </>
              ) : 'Registrar compra'}
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>Volver</Button>
          </div>

          {successMsg && <Alert className="mt-3" variant="success">{successMsg}</Alert>}
          {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail
