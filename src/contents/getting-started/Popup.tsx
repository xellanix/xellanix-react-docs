import { CodeBlock } from "../../components/CodeBlock/CodeBlock";

import { usePopup } from "xellanix-react";

const importCode = `import { PopupProvider, usePopup } from 'xellanix-react';`;
const exampleSetupCode = `import ReactDOM from 'react-dom';
import React from 'react';
import { PopupProvider } from 'xellanix-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <PopupProvider iconSrc='/vite.svg' iconText='Xellanix'>
            <App />
        </PopupProvider>
    </React.StrictMode>,
);`;
const exampleCode = `import React from 'react';
import { usePopup } from 'xellanix-react';

function App() {
    const popup = usePopup();

    const showPopup = () => {
        popup.setItem(
            <div className="vertical-layout flex-align-center text-align-center">
                <h2>Welcome to Xellanix!</h2>
                <p>This is a sample popup content.</p>
            </div>
        );
        popup.setIsOpen(true);
    };

    return (
        <div className="vertical-layout">
            <button className="button accent" onClick={showPopup}>Show Popup</button>
        </div>
    );
}

export default App;`;
const exampleCustomCode = `<PopupProvider iconSrc='/custom-icon.svg' iconText='Custom Popup'>
    <App />
</PopupProvider>`;

export function PopupDev() {
    const popup = usePopup();

    const showPopup = () => {
        popup.setItem(
            <div className="vertical-layout flex-align-center text-align-center">
                <h2>Welcome to Xellanix!</h2>
                <p>This is a sample popup content.</p>
            </div>
        );
        popup.setIsOpen(true);
    };

    return (
        <div className="vertical-layout vertical-gap2x page">
            <h2>Implementing and Using the Popup</h2>

            <div className="vertical-layout">
                <h3>Overview</h3>

                <p>
                    The <code className="code">Popup</code> component is a flexible UI element that
                    allows you to display modal content in your React application. It provides a
                    context-driven approach for managing the visibility and content of popups.
                </p>

                <h3>Importing the Popup Component</h3>

                <p>
                    To use the <code className="code">Popup</code> component, begin by importing the
                    <code className="code">PopupProvider</code> and{" "}
                    <code className="code">usePopup</code> functions:
                </p>

                <CodeBlock>{importCode}</CodeBlock>
            </div>

            <div className="vertical-layout">
                <h3>Setting Up the PopupProvider</h3>

                <p>
                    The <code className="code">PopupProvider</code> component should wrap your
                    entire application or the part where you want to use the popups. This setup
                    enables the use of the <code className="code">usePopup</code>
                    hook throughout your component tree.
                </p>

                <h5>
                    Example Setup in <code className="code">main.tsx</code>
                </h5>

                <CodeBlock title="main.tsx">{exampleSetupCode}</CodeBlock>
            </div>

            <div className="vertical-layout">
                <h3>Using the Popup Component</h3>

                <h5>
                    Accessing Popup Controls with <code className="code">usePopup</code>
                </h5>

                <p>
                    Within your application, use the <code className="code">usePopup</code> hook to
                    control the visibility and content of the popup.
                </p>

                <h5>
                    Example Usage in <code className="code">App.tsx</code>
                </h5>

                <CodeBlock title="App.tsx">{exampleCode}</CodeBlock>

                <div className="vertical-layout">
                    <h5>Result</h5>
                    <div className="vertical-layout">
                        <button className="button accent" onClick={showPopup}>
                            Show Popup
                        </button>
                    </div>
                </div>

                <h5>Key Concepts</h5>

                <ul>
                    <li>
                        <strong>usePopup</strong>: Returns an object with the following properties:
                    </li>
                    <ul>
                        <li>
                            <strong>item</strong>: The current content of the popup.
                        </li>
                        <li>
                            <strong>setItem</strong>: A function to set the content of the popup.
                        </li>
                        <li>
                            <strong>isOpen</strong>: A boolean indicating whether the popup is
                            currently open.
                        </li>
                        <li>
                            <strong>setIsOpen</strong>: A function to toggle the popup's visibility.
                        </li>
                    </ul>
                </ul>
            </div>

            <div className="vertical-layout">
                <h3>Customizing the Popup Component</h3>

                <p>
                    The <code className="code">Popup</code> component offers several customization
                    options through its props. The <code className="code">PopupProvider</code>{" "}
                    accepts two main props:
                </p>

                <ul>
                    <li>
                        <strong>iconSrc</strong>: The source of the icon image displayed in the
                        popup header.
                    </li>
                    <li>
                        <strong>iconText</strong>: The text accompanying the icon in the popup
                        header.
                    </li>
                </ul>

                <h5>Example Customization</h5>

                <CodeBlock title="main.tsx">{exampleCustomCode}</CodeBlock>
            </div>

            <div className="vertical-layout">
                <h3>Conclusion</h3>

                <p>
                    The <code className="code">Popup</code> component provides a powerful and
                    customizable way to manage modal dialogs in your React application. By
                    leveraging the <code className="code">PopupProvider</code> and{" "}
                    <code className="code">usePopup</code> hook, you can easily display and manage
                    popup content, creating a seamless user experience.
                </p>

                <div style={{ height: "5em" }}></div>
            </div>
        </div>
    );
}
