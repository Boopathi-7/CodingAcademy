import React from "react"; // Import React for better compatibility
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css"; // Tailwind CSS or global styles
import App from "./App.jsx"; // Main App component
import { BuyProvider } from "./components/BuyContext.jsx";

// Render the root element
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BuyProvider>
    <App />
    </BuyProvider>
  </StrictMode>
);
