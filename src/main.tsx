import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { CatalogApp } from './components/CatalogApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CatalogApp />
  </StrictMode>,
)
