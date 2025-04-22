/**
 * 애플리케이션의 진입점
 * React DOM을 사용하여 App 컴포넌트를 렌더링합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App"

// React 18의 createRoot API를 사용하여 애플리케이션을 렌더링합니다.
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
