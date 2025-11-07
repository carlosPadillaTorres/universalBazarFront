import React, { useEffect, useState } from 'react'
import { ProductsService } from '../../services/products.service';

const ListProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const prodObject = new ProductsService();
                const data = await prodObject.getAllProducts();
                setProducts(data);
                setLoading(false);
                
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // El array vacío significa que solo se ejecutará una vez al montar el componente

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/* Aquí puedes renderizar tus productos */}
            {products.map(product => (
                <div key={product.id}>
                    {product.name} - ${product.price}
                </div>
            ))}
        </div>
    );
}

export default ListProducts