import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "./assets/fonts/fonts.css"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
