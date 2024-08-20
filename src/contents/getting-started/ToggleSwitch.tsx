import { useState } from "react";
import { CodeBlock } from "../../components/CodeBlock/CodeBlock";
import { ToggleSwitch } from "xellanix-react";

const importCode = `import ToggleSwitch from 'path-to-your-component';`;
const exampleCode = `import React, { useState } from 'react';
import ToggleSwitch from './components/ToggleSwitch/ToggleSwitch';

function App() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = (value: boolean) => {
        setIsToggled(value);
        console.log('Toggle Switch is now:', value ? 'ON' : 'OFF');
    };

    return (
        <div>
            <ToggleSwitch 
                label="Enable Feature" 
                onChange={handleToggle} 
                defaultValue={isToggled} 
            />
        </div>
    );
}

export default App;`;
const exampleUsageCode = `<ToggleSwitch 
    label="Activate Mode" 
    labelPosition="before" 
    defaultValue={true} 
    onChange={(value) => console.log('Switch toggled to:', value)} 
/>`;
const integrationCode = `<ToggleSwitch 
    label="Dark Mode" 
    className="red-toggle-switch" 
    defaultValue={false} 
    onChange={(value) => console.log('Dark Mode:', value ? 'Enabled' : 'Disabled')} 
/>`;
const cssCode = `.red-toggle-switch {
    --accent-color: #f00;
}`;

export function ToggleSwitchDev() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = (value: boolean) => {
        setIsToggled(value);
        console.log("Toggle Switch is now:", value ? "ON" : "OFF");
    };

    return (
        <div className="vertical-layout vertical-gap2x page">
            <h2>Implementing and Using the ToggleSwitch</h2>

            <div className="vertical-layout">
                <h3>Overview</h3>

                <p>
                    The <code className="code">ToggleSwitch</code> component provides a customizable
                    switch that users can toggle between on and off states. It is designed to be
                    lightweight, accessible, and easy to integrate into your React applications.
                </p>
            </div>

            <div className="vertical-layout">
                <h3>Importing the ToggleSwitch Component</h3>

                <p>
                    To use the <code className="code">ToggleSwitch</code> component, start by
                    importing it into your React project:
                </p>

                <CodeBlock>{importCode}</CodeBlock>
            </div>

            <div className="vertical-layout">
                <h3>Using the ToggleSwitch Component</h3>

                <p>
                    The <code className="code">ToggleSwitch</code> component is highly customizable
                    and supports various props to control its behavior and appearance.
                </p>

                <h5>Basic Example</h5>

                <p>
                    Here's a basic implementation of the <code className="code">ToggleSwitch</code>{" "}
                    component within a React component:
                </p>

                <CodeBlock>{exampleCode}</CodeBlock>

                <div className="vertical-layout">
                    <h5>Result</h5>
                    <div className="vertical-layout">
                        <ToggleSwitch
                            label="Enable Feature"
                            onChange={handleToggle}
                            defaultValue={isToggled}
                        />
                    </div>
                </div>

                <h5>Key Props</h5>

                <ul>
                    <li>
                        <strong>label</strong> (optional): A string that labels the toggle switch.
                        It can be placed before or after the switch using the{" "}
                        <code className="code">labelPosition</code> prop.
                    </li>
                    <li>
                        <strong>labelPosition</strong> (optional): Determines the position of the
                        label relative to the switch. Accepts <code className="code">"before"</code>{" "}
                        or <code className="code">"after"</code>. The default is{" "}
                        <code className="code">"after"</code>.
                    </li>
                    <li>
                        <strong>defaultValue</strong> (optional): A boolean indicating the initial
                        state of the switch. The default is <code className="code">false</code>.
                    </li>
                    <li>
                        <strong>onChange</strong> (optional): A callback function that is triggered
                        whenever the switch is toggled. It receives the current state (
                        <code className="code">true</code> for on,{" "}
                        <code className="code">false</code> for off) as an argument.
                    </li>
                </ul>

                <h5>Customization Example</h5>

                <p>
                    Here’s an example of a <code className="code">ToggleSwitch</code> component with
                    a label positioned before the switch and an initial state set to{" "}
                    <code className="code">on</code>:
                </p>

                <CodeBlock>{exampleUsageCode}</CodeBlock>

                <div className="vertical-layout">
                    <h5>Result</h5>
                    <div className="vertical-layout">
                        <ToggleSwitch
                            label="Activate Mode"
                            labelPosition="before"
                            defaultValue={true}
                            onChange={(value) => console.log("Switch toggled to:", value)}
                        />
                    </div>
                </div>
            </div>

            <div className="vertical-layout">
                <h3>Handling Toggle Events</h3>

                <p>
                    The <code className="code">ToggleSwitch</code> component provides two main event
                    handlers:
                </p>
                <ul>
                    <li>
                        <strong>onClick</strong>: Triggers when the user clicks on the switch.
                    </li>
                    <li>
                        <strong>onKeyDown</strong>: Allows the switch to be toggled via keyboard
                        using the <code className="code">Enter</code> key, enhancing accessibility.
                    </li>
                </ul>

                <h5>Advanced Usage</h5>

                <p>
                    You can override default behaviors or styles by passing additional props or
                    classes to the <code className="code">ToggleSwitch</code>. The component’s root
                    element is a <code className="code">div</code>, and any standard{" "}
                    <code className="code">HTMLDivElement</code> attributes can be applied.
                </p>

                <h5>Example with Custom Styles</h5>

                <CodeBlock>{integrationCode}</CodeBlock>
                <CodeBlock title="css">{cssCode}</CodeBlock>

                <div className="vertical-layout">
                    <h5>Result</h5>
                    <div className="vertical-layout">
                        <ToggleSwitch
                            label="Dark Mode"
                            className="red-toggle-switch"
                            defaultValue={false}
                            onChange={(value) =>
                                console.log("Dark Mode:", value ? "Enabled" : "Disabled")
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="vertical-layout">
                <h3>Accessibility</h3>

                <p>
                    The <code className="code">ToggleSwitch</code> component is keyboard accessible,
                    allowing users to toggle the switch using the{" "}
                    <code className="code">Enter</code> key. The{" "}
                    <code className="code">tabIndex</code> is set by default, ensuring that the
                    switch is part of the tab order on the page.
                </p>
            </div>

            <div className="vertical-layout">
                <h3>Conclusion</h3>

                <p>
                    The <code className="code">ToggleSwitch</code> component is a versatile and
                    user-friendly UI element that you can easily integrate into your React
                    application. With customizable labels, event handling, and accessibility
                    features, it provides a seamless way to add toggle functionality to your UI.
                </p>

                <div style={{ height: "5em" }}></div>
            </div>
        </div>
    );
}
