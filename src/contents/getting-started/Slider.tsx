import React from "react";
import { CodeBlock } from "../../components/CodeBlock/CodeBlock";

import { Slider, useSlider, SliderInput } from "xellanix-react";

const importCode = `import { Slider, useSlider, SliderInput } from 'xellanix-react';`;
const basicUsageExample = `import React from 'react';
import { Slider, useSlider, SliderInput } from 'xellanix-react';

function App() {
    const sliderRef = useSlider();

    return (
        <div className="horizontal-layout flex-align-middle">
            <Slider
                sliderInputRef={sliderRef}
                min={0}
                max={100}
                step={1}
                defaultValue={50}
                onChange={(value) => console.log('Current value:', value)}
                onDeferredChange={(value) => console.log('Deferred value:', value)}
                style={{
                    flex: "1 1 100px",
                }}
            />
            <SliderInput sliderInputRef={sliderRef} />
        </div>
    );
}

export default App;`;
const propsExample = `<Slider
    min={10}
    max={200}
    step={5}
    defaultValue={75}
    onChange={(value) => console.log('Slider value changed:', value)}
    onDeferredChange={(value) => console.log('Final slider value:', value)}
/>`;
const integration = `function App() {
    const sliderRef = useSlider();
    const [value, setValue] = React.useState(50);

    return (
        <div className="horizontal-layout flex-align-middle">
            <Slider
                sliderInputRef={sliderRef}
                min={0}
                max={100}
                step={1}
                defaultValue={50}
                onChange={(value) => setValue(value)}
                onDeferredChange={(value) => console.log('Final slider value:', value)}
                style={{
                    flex: "1 1 100px",
                }}
            />
            <SliderInput sliderInputRef={sliderRef} />
            <p>Selected Value: {value}</p>
        </div>
    );
}`;

export function SliderDev() {
    const firstSlider = useSlider();
    const thirdSlider = useSlider();
    const [value, setValue] = React.useState(50);

    return (
        <div className="vertical-layout vertical-gap2x page">
            <h2>Implementing and Using the Slider</h2>
            <div className="vertical-layout">
                <h3>Overview</h3>
                <p>
                    This guide explains how to integrate and use the{" "}
                    <code className="code">Slider</code> component in your React application. The{" "}
                    <code className="code">Slider</code> component allows users to select a numeric
                    value within a specified range by dragging a thumb along a track. This guide
                    covers the usage and customization of the component, including the optional
                    <code className="code">SliderInput</code> component.
                </p>
            </div>
            <div className="vertical-layout">
                <h3>Importing the Slider Component</h3>
                <p>
                    Start by importing the <code className="code">Slider</code>,{" "}
                    <code className="code">useSlider</code>, and{" "}
                    <code className="code">SliderInput</code> components into your React file:
                </p>
                <CodeBlock>{importCode}</CodeBlock>
            </div>
            <div className="vertical-layout">
                <h3>Basic Usage</h3>
                <p>
                    To use the <code className="code">Slider</code> component, follow these steps:
                </p>
                <h5>Example Code</h5>
                <CodeBlock>{basicUsageExample}</CodeBlock>
                <div className="vertical-layout">
                    <h5>Result</h5>
                    <div className="horizontal-layout flex-align-middle">
                        <Slider
                            sliderInputRef={firstSlider}
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={50}
                            onChange={(value) => console.log("Current value:", value)}
                            onDeferredChange={(value) => console.log("Deferred value:", value)}
                            style={{
                                flex: "1 1 100px",
                            }}
                        />
                        <SliderInput sliderInputRef={firstSlider} defaultValue={50} />
                    </div>
                </div>
                <h5>Key Concepts</h5>
                <ul>
                    <li>
                        <strong>useSlider</strong>: A custom hook that returns a{" "}
                        <code className="code">SliderRef</code> object, used to control the{" "}
                        <code className="code">Slider</code> and sync it with other components.
                    </li>
                    <li>
                        <strong>SliderInput</strong> (Optional): This component allows users to
                        enter a value directly, which is synced with the slider.
                    </li>
                </ul>
            </div>
            <div className="vertical-layout">
                <h3>Customizing the Slider Component</h3>
                <p>
                    You can customize the <code className="code">Slider</code> component by passing
                    different props to control its behavior:
                </p>
                <h5>Available Props</h5>
                <ul>
                    <li>
                        <strong>min</strong>: Minimum value (e.g., <code className="code">0</code>).
                    </li>
                    <li>
                        <strong>max</strong>: Maximum value (e.g., <code className="code">100</code>
                        ).
                    </li>
                    <li>
                        <strong>step</strong>: The amount by which the value should increase or
                        decrease (e.g., <code className="code">1</code>).
                    </li>
                    <li>
                        <strong>defaultValue</strong>: The initial value of the slider.
                    </li>
                    <li>
                        <strong>onChange</strong>: A callback function that triggers whenever the
                        slider value changes.
                    </li>
                    <li>
                        <strong>onDeferredChange</strong>: A callback function that triggers when
                        the slider value is finalized (e.g., on mouse release).
                    </li>
                    <li>
                        <strong>style</strong>: An optional prop to apply inline styles to the
                        slider component.
                    </li>
                </ul>
                <h5>Example Usage</h5>
                <CodeBlock>{propsExample}</CodeBlock>
                <div className="vertical-layout">
                    <h5>Result</h5>
                    <Slider
                        min={10}
                        max={200}
                        step={5}
                        defaultValue={75}
                        onChange={(value) => console.log("Slider value changed:", value)}
                        onDeferredChange={(value) => console.log("Final slider value:", value)}
                    />
                </div>
            </div>
            <div className="vertical-layout">
                <h3>Handling User Input with SliderInput</h3>
                <p>
                    The <code className="code">SliderInput</code> component is optional and allows
                    users to enter a value directly, which is then synced with the slider.
                </p>
                <h5>Example Usage</h5>
                <CodeBlock>{`<SliderInput sliderInputRef={sliderRef} />`}</CodeBlock>
                <h5>Integration</h5>
                <p>
                    You can combine the <code className="code">Slider</code> and{" "}
                    <code className="code">SliderInput</code>
                    components to provide both slider and direct input capabilities:
                </p>
                <CodeBlock>{integration}</CodeBlock>
                <div className="vertical-layout">
                    <h5>Result</h5>
                    <div className="horizontal-layout flex-align-middle">
                        <Slider
                            sliderInputRef={thirdSlider}
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={50}
                            onChange={(value) => setValue(value)}
                            onDeferredChange={(value) => console.log("Final slider value:", value)}
                            style={{
                                flex: "1 1 100px",
                            }}
                        />
                        <SliderInput sliderInputRef={thirdSlider} defaultValue={50} />
                        <p>Selected Value: {value}</p>
                    </div>
                </div>
            </div>
            <div className="vertical-layout">
                <h3>Conclusion</h3>
                <p>
                    You’ve now implemented and customized the <code className="code">Slider</code>{" "}
                    component in your React application. The{" "}
                    <code className="code">SliderInput</code> component is optional and provides an
                    additional way for users to input values. For further customization or advanced
                    usage, refer to the component’s documentation or seek support from the developer
                    community.
                </p>
                <div style={{ height: "5em" }}></div>
            </div>
        </div>
    );
}
