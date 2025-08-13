

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root";
import "../styles/tailwind.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Root />);
