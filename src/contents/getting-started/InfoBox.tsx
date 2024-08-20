import { CodeBlock } from "../../components/CodeBlock/CodeBlock";

import { InfoBox, InfoStatus } from "xellanix-react";

const importCode = `import { InfoBox, InfoStatus } from 'xellanix-react';`;
const exampleCode = `import React from 'react';
import { InfoBox, InfoStatus } from 'xellanix-react';

function App() {
    return (
        <div className="vertical-layout">
            <InfoBox status={InfoStatus.Info}>
                This is an informational message.
            </InfoBox>
            <InfoBox status={InfoStatus.Warning}>
                This is a warning message.
            </InfoBox>
            <InfoBox status={InfoStatus.Success}>
                This is a success message.
            </InfoBox>
            <InfoBox status={InfoStatus.Error}>
                This is an error message.
            </InfoBox>
        </div>
    );
}

export default App;`;
const exampleUsageCode = `<InfoBox status={InfoStatus.Success}>
    Your operation was successful!
</InfoBox>`;
const integrationCode = `function App() {
    return (
        <div className="vertical-layout">
            <InfoBox status={InfoStatus.Warning}>
                Please double-check your input.
            </InfoBox>
        </div>
    );
}`;

export function InfoBoxDev() {
    return (
        <div className="vertical-layout vertical-gap2x page">
            <h2>Implementing and Using the InfoBox</h2>

            <div className="vertical-layout">
                <h3>Overview</h3>

                <p>
                    The <code className="code">InfoBox</code> component is a flexible UI element
                    designed to display various types of information, such as informational
                    messages, warnings, success confirmations, or error alerts. This guide will
                    explain how to integrate and use the <code className="code">InfoBox</code>{" "}
                    component in your React application.
                </p>
            </div>

            <div className="vertical-layout">
                <h3>Importing the InfoBox Component</h3>

                <p>
                    To use the <code className="code">InfoBox</code> component in your project,
                    start by importing it:
                </p>

                <CodeBlock>{importCode}</CodeBlock>
            </div>

            <div className="vertical-layout">
                <h3>Basic Usage</h3>

                <p>
                    The <code className="code">InfoBox</code> component requires two main props:{" "}
                    <code className="code">status</code> and <code className="code">children</code>.
                    The <code className="code">status</code> prop determines the type of message
                    (information, warning, success, or error), while the{" "}
                    <code className="code">children</code> prop contains the message content.
                </p>

                <h5>Example Code</h5>

                <CodeBlock>{exampleCode}</CodeBlock>

                <div className="vertical-layout">
                    <h5>Result</h5>
                    <div className="vertical-layout">
                        <InfoBox status={InfoStatus.Info}>
                            This is an informational message.
                        </InfoBox>
                        <InfoBox status={InfoStatus.Warning}>This is a warning message.</InfoBox>
                        <InfoBox status={InfoStatus.Success}>This is a success message.</InfoBox>
                        <InfoBox status={InfoStatus.Error}>This is an error message.</InfoBox>
                    </div>
                </div>

                <h5>Key Concepts</h5>

                <ul>
                    <li>
                        <strong>status</strong>: Determines the type of message to display.
                        Acceptable values are <code className="code">InfoStatus.Info</code>,{" "}
                        <code className="code">InfoStatus.Warning</code>,{" "}
                        <code className="code">InfoStatus.Success</code>, and{" "}
                        <code className="code">InfoStatus.Error</code>.
                    </li>
                    <li>
                        <strong>children</strong>: The content of the message that will be displayed
                        inside the <code className="code">InfoBox</code>.
                    </li>
                </ul>
            </div>

            <div className="vertical-layout">
                <h3>Customizing the InfoBox Component</h3>

                <p>
                    The <code className="code">InfoBox</code> component allows for customization
                    through its <code className="code">status</code> prop, which controls the visual
                    appearance and iconography according to the message type.
                </p>

                <h5>Available Statuses</h5>

                <ul>
                    <li>
                        <strong>InfoStatus.Info</strong>: Displays an informational message.
                    </li>
                    <li>
                        <strong>InfoStatus.Warning</strong>: Displays a warning message.
                    </li>
                    <li>
                        <strong>InfoStatus.Success</strong>: Displays a success message.
                    </li>
                    <li>
                        <strong>InfoStatus.Error</strong>: Displays an error message.
                    </li>
                </ul>

                <h5>Example Usage</h5>

                <CodeBlock>{exampleUsageCode}</CodeBlock>

                <div className="vertical-layout">
                    <h5>Result</h5>
                    <InfoBox status={InfoStatus.Success}>Your operation was successful!</InfoBox>
                </div>
            </div>

            <div className="vertical-layout">
                <h3>Visual Representation</h3>

                <p>
                    The <code className="code">InfoBox</code> component visually adapts to the
                    provided <code className="code">status</code>. Each status type has a distinct
                    background color and icon:
                </p>

                <ul>
                    <li>
                        <strong>Info</strong>: Neutral colors, typically blue or grey, with an
                        informational icon.
                    </li>
                    <li>
                        <strong>Warning</strong>: Yellow or orange colors with a warning icon.
                    </li>
                    <li>
                        <strong>Success</strong>: Green colors with a checkmark icon.
                    </li>
                    <li>
                        <strong>Error</strong>: Red colors with an error icon.
                    </li>
                </ul>

                <h5>Integration</h5>

                <p>
                    You can easily integrate <code className="code">InfoBox</code> into any part of
                    your application where user feedback or status messages are required:
                </p>

                <CodeBlock>{integrationCode}</CodeBlock>

                <div className="vertical-layout">
                    <h5>Result</h5>
                    <div className="vertical-layout">
                        <InfoBox status={InfoStatus.Warning}>
                            Please double-check your input.
                        </InfoBox>
                    </div>
                </div>
            </div>

            <div className="vertical-layout">
                <h3>Conclusion</h3>

                <p>
                    The <code className="code">InfoBox</code> component is a versatile tool for
                    displaying status messages in your React application. By setting the appropriate{" "}
                    <code className="code">status</code>, you can ensure that users receive clear
                    and consistent feedback in various scenarios.
                </p>

                <div style={{ height: "5em" }}></div>
            </div>
        </div>
    );
}
