type ComponentData = {
    name: string;
    description: React.ReactNode;
    revealLink: string;
};
const components: ComponentData[] = [
    {
        name: "InfoBox",
        description: (
            <>
                Displays informational messages with different statuses like{" "}
                <code className="code">info</code>, <code className="code">warning</code>,{" "}
                <code className="code">success</code>, and <code className="code">error</code>.
            </>
        ),
        revealLink: "./?groupIndex=0&itemIndex=1",
    },
    {
        name: "Popup",
        description:
            "A versatile popup component that can be used to display modal content with customizable behavior.",
        revealLink: "./?groupIndex=0&itemIndex=2",
    },
    {
        name: "Slider",
        description: "An interactive slider component that allows users to select a value within a defined range.",
        revealLink: "./?groupIndex=0&itemIndex=3",
    },
    {
        name: "SliderInput",
        description: <>An optional companion to the <code className="code">Slider</code> component, enabling value adjustments via text input.</>,
        revealLink: "./?groupIndex=0&itemIndex=3",
    },
    {
        name: "ToggleSwitch",
        description: "A simple on/off switch component with optional labeling and keyboard accessibility.",
        revealLink: "./?groupIndex=0&itemIndex=4",
    },
];

export function Welcome() {
    return (
        <div className="vertical-layout vertical-gap2x page">
            <h2>Welcome to Xellanix-React</h2>

            <p>
                <strong>Xellanix-React</strong> is your go-to npm package for finding and using
                custom components in your React.js projects. Designed to simplify the creation of a
                polished user interface, Xellanix-React offers a consistent and unified set of
                components and styles, ensuring that your projects maintain a cohesive look and
                feel. Originally developed by Xellanix, this package was created to standardize
                components and styles across multiple projects. In addition to custom components,
                Xellanix-React also enhances the styling of default HTML elements.
            </p>

            <div className="vertical-layout">
                <h3>Features</h3>
                <ul>
                    <li>
                        <strong>Custom Components</strong>: A collection of reusable components
                        tailored for React.js, ready to integrate into your project.
                    </li>
                    <li>
                        <strong>Uniform Styling</strong>: Consistent styles across all components,
                        ensuring a cohesive design system throughout your project.
                    </li>
                    <li>
                        <strong>Enhanced HTML Elements</strong>: Styled default HTML elements to
                        give your web applications a modern look with minimal effort.
                    </li>
                    <li>
                        <strong>Accessibility</strong>: Components are designed with accessibility
                        in mind, ensuring a better experience for all users.
                    </li>
                    <li>
                        <strong>Customization Options</strong>: While maintaining a consistent base
                        style, components offer flexibility for customization to fit your specific
                        needs.
                    </li>
                </ul>
            </div>

            <div className="vertical-layout">
                <h3>Available Components</h3>
                Below is a list of the components currently available in Xellanix-React:
                <ul>
                    {components.map((component) => (
                        <li key={component.name}>
                            <a href={component.revealLink}>
                                <strong>{component.name}</strong>
                            </a>
                            : {component.description}
                        </li>
                    ))}
                </ul>
                <div style={{ height: "5em" }}></div>
            </div>
        </div>
    );
}
