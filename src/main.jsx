import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import { setRouterNavigate, clearRouterNavigate } from './utils/navigation'

function RouterInit({ children }) {
  const navigate = useNavigate()
  // register react-router navigate so our navigation util can delegate to it
  // this keeps existing navigate(path) calls working
  StrictMode && null
  setRouterNavigate(navigate)

  // cleanup on unmount
  // Note: RouterInit will unmount only if BrowserRouter unmounts (rare)
  // but we provide clearRouterNavigate for completeness
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouterInit>
        <App />
      </RouterInit>
    </BrowserRouter>
  </StrictMode>,
)
