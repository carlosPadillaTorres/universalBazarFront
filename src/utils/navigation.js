// Pequeña utilidad de navegación sin react-router
export function navigate(path) {
    console.log("nagegando a",path);
    
  // Cambia la URL y dispara un evento personalizado para que los listeners puedan reaccionar
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('locationchange'));
}

export function onLocationChange(handler) {
  const cb = () => handler(window.location);
  window.addEventListener('popstate', cb);
  window.addEventListener('locationchange', cb);
  // Devolver función para remover listeners
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener('locationchange', cb);
  };
}

export function getSearchParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
