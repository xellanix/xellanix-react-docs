import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { PopupProvider } from "xellanix-react";

import "xellanix-react/style.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PopupProvider iconSrc="/icon.svg" iconText="Xellanix">
            <App />
        </PopupProvider>
    </StrictMode>
);
