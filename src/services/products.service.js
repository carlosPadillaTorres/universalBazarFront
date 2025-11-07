const BASE_URL = 'https://universalbazarback.onrender.com';

export class ProductsService {
  async getAllProducts() {
    console.log("En getAllProds");
    
    try {
      const response = await fetch(`${BASE_URL}/products/sales`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Esperar a que se resuelva la promesa de .json() para obtener los datos reales
      const data = await response.json();
      console.log("Data recibida en getAllProducts:", data);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id) {
    if (!Number.isInteger(Number(id))) {
      throw new Error('Invalid ID format. ID must be a number.');
    }

    try {
      const response = await fetch(`${BASE_URL}/products/byId/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }

  async getProductByName(name) {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid name format. Name must be a non-empty string.');
    }

    try {
      const response = await fetch(`${BASE_URL}/products/byName/${name}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product by name:', error);
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      const response = await fetch(`${BASE_URL}/products/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating product');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id, updateData) {
    if (!Number.isInteger(Number(id))) {
      throw new Error('Invalid ID format. ID must be a number.');
    }

    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating product');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id) {
    if (!Number.isInteger(Number(id))) {
      throw new Error('Invalid ID format. ID must be a number.');
    }

    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}