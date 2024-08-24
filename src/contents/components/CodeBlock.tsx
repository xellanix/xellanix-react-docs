import { CodeBlock } from "../../components/CodeBlock/CodeBlock";

const importCode = `import Slider, { useSlider, SliderInput } from 'xellanix-react';

/* The arrow function name should be 
using the function name color too */
const add = (a: number, b: number): number => {
    return a + b;
};

const obj = {
    name: "hello",
    value: 0
}

const arr = [1, 2, 3];

function addBy2(a: number): number {
    return add(a, 2);
}

// The 'onChange' (type interpretation) color should be
// the same as the function name color
// and the others should be the same as the numeric color
function Another (
{
    onChange,
    ...props,
}: {
    onChange?: (e: any) => void;
    [key: string]: any;
}) {
    return ...props;
}

function App(c, z: string = "hello", x?: number = 555) {
    const a = 0.501364;
    const b = false;

    const d = (e, j?: string = "bello", k: any, l) => {
        return e;
    };

    if (a !== b) {
        return a < b ? 'a' : 'b';
    }

    z.split("").toString();
    z.split("").string2 = "";

    return a > !c ? a + b : a >= c ?(a - b): a * b;
}

function Comp() {
    const myDiv = <div>hello</div>;
    const wrapper = <>wrapper</>;
    const inputtt = <input />;

    return (
        <button
            type="button"
            className="button accent"
            onClick={() => {
                const a = 5 < 5 && 5 > 5;
                return popup.setIsOpen((prev = false) => !prev);
            }}>
            Open Popup
            {children}
            Open Popup
            {children}
            <div>
                <div disable={true, false}>Div 1</div>
                <div>{children}</div>
                <div>
                    Div 2
                </div>
                <div>
                    {children}
                    Div 2
                </div>
            </div>
        </button>
    );
}
    
export default App;`;
const basicUsageExample = `import React from 'react';
import Slider, { useSlider, SliderInput } from 'path-to-your-component';

function App() {
    const sliderRef = useSlider();

    return (
        <div>
            <Slider
                sliderInputRef={sliderRef}
                min={0}
                max={100}
                increment={1}
                defaultValue={50}
                onChange={(value) => console.log('Current value:', value)}
                onDeferredChange={(value) => console.log('Deferred value:', value)}
            />
            <SliderInput sliderInputRef={sliderRef} />
        </div>
    );
}

export default App;`;
const propsExample = `<Slider
    min={10}
    max={200}
    increment={5}
    defaultValue={75}
    onChange={(value) => console.log('Slider value changed:', value)}
    onDeferredChange={(value) => console.log('Final slider value:', value)}
/>`;
const integration = `function App() {
    const sliderRef = useSlider();
    const [value, setValue] = React.useState(50);

    return (
        <div>
            <Slider
                sliderInputRef={sliderRef}
                min={0}
                max={100}
                increment={1}
                defaultValue={50}
                onChange={(value) => setValue(value)}
                onDeferredChange={(value) => console.log('Final slider value:', value)}
            />
            <SliderInput sliderInputRef={sliderRef} />
            <p>Selected Value: {value}</p>
        </div>
    );
}`;

export function CodeBlockDev() {
    return (
        <div className="vertical-layout vertical-gap2x">
            <h2>Implementing and Using the Slider</h2>
            <div className="vertical-layout">
                <h3>Overview</h3>
                <p>
                    This guide explains how to integrate and use the `Slider` component in your
                    React application. The `Slider` component allows users to select a numeric value
                    within a specified range by dragging a thumb along a track. This guide covers
                    the usage and customization of the component, including the optional
                    `SliderInput` component.
                </p>
            </div>
            <div className="vertical-layout">
                <h3>Importing the Slider Component</h3>
                <p>
                    Start by importing the `Slider`, `useSlider`, and `SliderInput` components into
                    your React file:
                </p>
                <CodeBlock formatAs="tsx">{importCode}</CodeBlock>
                <CodeBlock formatAs="tsx">true, false</CodeBlock>
            </div>
            <div className="vertical-layout">
                <h3>Basic Usage</h3>
                <p>To use the `Slider` component, follow these steps:</p>
                <h5>Example Code</h5>
                <CodeBlock formatAs="tsx">{basicUsageExample}</CodeBlock>
                <h5>Key Concepts</h5>- **useSlider**: A custom hook that returns a `SliderRef`
                object, used to control the `Slider` and sync it with other components. -
                **SliderInput** (Optional): This component allows users to enter a value directly,
                which is synced with the slider.
            </div>
            <div className="vertical-layout">
                <h3>Customizing the Slider Component</h3>
                You can customize the `Slider` component by passing different props to control its
                behavior:
                <h5>Available Props</h5>- **min**: Minimum value (e.g., `0`). - **max**: Maximum
                value (e.g., `100`). - **increment**: The amount by which the value should increase
                or decrease (e.g., `1`). - **defaultValue**: The initial value of the slider. -
                **onChange**: A callback function that triggers whenever the slider value changes. -
                **onDeferredChange**: A callback function that triggers when the slider value is
                finalized (e.g., on mouse release). - **style**: An optional prop to apply inline
                styles to the slider component.
                <h5>Example Usage</h5>
                <CodeBlock formatAs="tsx">{propsExample}</CodeBlock>
            </div>
            <div className="vertical-layout">
                <h3>Handling User Input with SliderInput</h3>
                The `SliderInput` component is optional and allows users to enter a value directly,
                which is then synced with the slider.
                <h5>Example Usage</h5>
                <CodeBlock formatAs="tsx">{`<SliderInput sliderInputRef={sliderRef} />`}</CodeBlock>
                <h5>Integration</h5>
                You can combine the `Slider` and `SliderInput` components to provide both slider and
                direct input capabilities:
                <CodeBlock formatAs="tsx">{integration}</CodeBlock>
            </div>
            <div className="vertical-layout">
                <h3>Conclusion</h3>
                You’ve now implemented and customized the `Slider` component in your React
                application. The `SliderInput` component is optional and provides an additional way
                for users to input values. For further customization or advanced usage, refer to the
                component’s documentation or seek support from the developer community.
            </div>
        </div>
    );
}