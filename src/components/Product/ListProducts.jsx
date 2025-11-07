import { Container, Row, Col, Card } from 'react-bootstrap';
import './ListProducts.css';

/**
 * Componente ListProducts
 * 
 * Muestra una lista de productos en formato de tarjetas (cards)
 * Diseño responsive con Bootstrap Grid
 * 
 * Props:
 * - products: array de productos a mostrar
 * - searchTerm: boolean que indica si se ha realizado una búsqueda
 */
const ListProducts = ({ products, searchTerm = false }) => {
    // Si no hay productos después de buscar
    if (searchTerm && products.length === 0) {
        return (
            <Container className="py-5 text-center">
                <h3>No se encontraron productos</h3>
                <p className="text-muted">Intenta con otro término de búsqueda</p>
            </Container>
        );
    }

    return (
        <Container className="products-container py-4">
            {/* Título de la sección */}
            <div className="section-header mb-4">
                <h2 className="section-title">
                    {searchTerm ? 'Resultados de búsqueda' : 'Todos los productos'}
                </h2>
                <p className="text-muted">{products.length} producto(s) encontrado(s)</p>
            </div>

            {/* Grid de productos */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {products.map(product => (
                    <Col key={product.id}>
                        <Card className="product-card h-100 shadow-sm">
                            {/* Imagen del producto */}
                            <Card.Img 
                                variant="top" 
                                src={product.image || 'https://via.placeholder.com/300x200?text=Sin+Imagen'} 
                                alt={product.name}
                                className="product-image"
                            />
                            
                            <Card.Body className="d-flex flex-column">
                                {/* Nombre del producto */}
                                <Card.Title className="product-title">
                                    {product.name}
                                </Card.Title>
                                
                                {/* Descripción */}
                                <Card.Text className="product-description text-muted">
                                    {product.description?.substring(0, 80)}
                                    {product.description?.length > 80 ? '...' : ''}
                                </Card.Text>
                                
                                {/* Footer con precio y categoría */}
                                <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="product-price">
                                            ${product.price?.toFixed(2)}
                                        </span>
                                        {product.category && (
                                            <span className="badge bg-secondary">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Rating si existe */}
                                    {product.rating && (
                                        <div className="product-rating">
                                            ⭐ {product.rating.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ListProducts;