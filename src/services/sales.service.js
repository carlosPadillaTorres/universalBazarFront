// Servicio para consumir la API de Sales (compras)
const DEFAULT_BASE = 'https://universalbazarback.onrender.com'
const BASE_URL = import.meta.env.VITE_SALES_API_BASE || DEFAULT_BASE

export class SalesService {
  async createSale(payload) {
    try {
      const res = await fetch(`${BASE_URL}/sales/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json().catch(() => null)

      if (res.status === 201 || res.ok) {
        return { success: true, data }
      }

      return { success: false, status: res.status, data }
    } catch (error) {
      console.error('Error creating sale:', error)
      throw error
    }
  }

  async listSales() {
    try {
      const res = await fetch(`${BASE_URL}/sales`, {
        headers: { 'Accept': 'application/json' }
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      console.log("data: ", data);
      
      return data
    } catch (error) {
      console.error('Error fetching sales:', error)
      throw error
    }
  }
}
