import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { navigate } from '../../utils/navigation'
import { SalesService } from '../../services/sales.service'

const SalesList = () => {
  const [sales, setSales] = useState([])

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const svc = new SalesService()
        const remote = await svc.listSales()
        if (remote && Array.isArray(remote)) {
          setSales(remote)
          return
        }
      } catch (err) {
        // fallback to localStorage
      }

      const s = JSON.parse(localStorage.getItem('ub_sales') || '[]')
      setSales(s)
    }

    fetchSales()
  }, [])

  const removeSale = (saleId) => {
    const filtered = sales.filter(s => s.saleId !== saleId)
    setSales(filtered)
    localStorage.setItem('ub_sales', JSON.stringify(filtered))
  }

  if (!sales || sales.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h3>No hay compras registradas</h3>
        <p className="text-muted">Realiza una compra desde la vista de detalle para que aparezca aquí.</p>
        <Button variant="primary" onClick={() => navigate('/')}>Ir al inicio</Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Compras registradas</h2>
        <Button variant="outline-primary" onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
      <Row className="g-3">
        {sales.map(sale => (
          <Col xs={12} md={6} lg={4} key={sale.saleId}>
            <Card className="p-3">
              <h5>{sale.product.title}</h5>
              <p className="mb-1">Precio: ${Number(sale.product.price).toFixed(2)}</p>
              <p className="mb-1">Total: ${Number(sale.totalPrice).toFixed(2)}</p>
              <p className="mb-1 text-muted">Fecha: {new Date(sale.createdAt).toLocaleString()}</p>
              <div className="d-flex justify-content-between">
                <Button size="sm" variant="secondary" onClick={() => navigate(`/item/${sale.product.productId}`)}>Ver producto</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

//<Button size="sm" variant="danger" onClick={() => removeSale(sale.saleId)}>Eliminar</Button>
export default SalesList
