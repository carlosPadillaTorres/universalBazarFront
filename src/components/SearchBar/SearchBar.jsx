import { useState } from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import './SearchBar.css';

/**
 * Componente SearchBar
 * 
 * Este es el buscador principal de la aplicación.
 * Maneja el input de búsqueda y dispara la función de búsqueda cuando el usuario presiona el botón.
 * 
 * Props:
 * - onSearch: función que se ejecuta cuando se presiona el botón buscar, recibe el término de búsqueda
 */
const SearchBar = ({ onSearch }) => {
  // Estado local para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene que la página se recargue
    
    // Solo ejecuta la búsqueda si hay texto
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  // Función que maneja los cambios en el input
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container className="search-bar-container my-4">
      <Form onSubmit={handleSubmit}>
        {/* InputGroup permite agrupar el input con el botón */}
        <InputGroup size="lg" className="shadow-sm">
          <Form.Control
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleChange}
            aria-label="Campo de búsqueda"
            className="search-input"
          />
          <Button 
            variant="primary" 
            type="submit"
            className="search-button"
          >
            🔍 Buscar
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default SearchBar;
