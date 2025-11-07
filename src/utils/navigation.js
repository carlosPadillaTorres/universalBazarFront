// Pequeña utilidad de navegación sin react-router
export function navigate(path) {
  // Si se ha registrado una función de navegación de react-router, usarla
  if (typeof routerNavigate === 'function') {
    try {
      routerNavigate(path)
      // También disparar el evento para mantener compatibilidad con listeners que usen onLocationChange
      window.dispatchEvent(new Event('locationchange'))
      return
    } catch (err) {
      // si falla, caer al fallback
      console.warn('routerNavigate failed, falling back to pushState', err)
    }
  }

  // Fallback: Cambia la URL y dispara un evento personalizado para que los listeners puedan reaccionar
  console.log('nagegando a', path)
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('locationchange'))
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

// Integración opcional con react-router
let routerNavigate = null

export function setRouterNavigate(fn) {
  routerNavigate = fn
}

export function clearRouterNavigate() {
  routerNavigate = null
}
