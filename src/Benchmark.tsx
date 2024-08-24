import { CodeBlock } from "./components/CodeBlock/CodeBlock";

const benchmark = `function App() {
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

export function BenchmarkDev() {
    return (
        <div className="vertical-layout vertical-gap2x">
            <h2>Benchmark</h2>
            <CodeBlock formatAs="tsx">{benchmark}</CodeBlock>
        </div>
    );
}