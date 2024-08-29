import { CodeBlock } from "../../components/CodeBlock/CodeBlock";

const KllHpLygBf = "import { CodeBlock } from 'path-to-your-component';";
const XT927stDFj =
    "import React from 'react';\nimport { CodeBlock } from './components/CodeBlock/CodeBlock';\n\nfunction App() {\n    return (\n        <div>\n            <CodeBlock formatAs=\"tsx\" title=\"Example Code\">\n{`import React from 'react';\n\nfunction App() {\n    return <h1>Hello, world!</h1>;\n}\n\nexport default App;`}\n            </CodeBlock>\n        </div>\n    );\n}\n\nexport default App;";
const tipxS0eVfZ =
    '<CodeBlock formatAs="html" title="HTML Example">\n{`<div class="container">\n    <h1>Hello, world!</h1>\n</div>`}\n</CodeBlock>';
const bykC8l6CEG =
    '<p>\n    You can use the <code className="code">Array.map()</code> method to iterate over arrays.\n</p>';
const Xx16E5bNwy =
    '<CodeBlock formatAs="js" title="JavaScript Example">\n{`const sum = (a, b) => a + b;\n\nconsole.log(sum(2, 3));`}\n</CodeBlock>';

export function CodeBlockDev() {
    return (
        <div className="vertical-layout vertical-gap2x">
            <h2>Implementing and Using the CodeBlock</h2>

            <div className="vertical-layout">
                <h3>Overview</h3>
                <p>
                    The `CodeBlock` component allows developers to display formatted code snippets
                    with syntax highlighting for various programming languages. It also includes a
                    convenient "Copy" button to easily copy the code to the clipboard.
                </p>
            </div>

            <div className="vertical-layout">
                <h3>Importing the CodeBlock Component</h3>
                <p>To use the `CodeBlock` component, import it into your React project:</p>
                <CodeBlock formatAs="tsx">{KllHpLygBf}</CodeBlock>
            </div>

            <div className="vertical-layout">
                <h3>Using the CodeBlock Component</h3>
                <p>
                    The `CodeBlock` component is versatile and supports several code formats. You
                    can customize the display and behavior of the code block using the available
                    props.
                </p>
                <h5>Basic Example</h5>
                <p>Here’s a basic implementation of the `CodeBlock` component:</p>
                <CodeBlock formatAs="tsx">{XT927stDFj}</CodeBlock>
                <h5>Key Props</h5>
                <ul>
                    <li>
                        <strong>formatAs</strong> (optional): Defines the syntax highlighting format
                        for the code block. Accepts `"plain-text"`, `"tsx"`, `"jsx"`, `"html"`,
                        `"ts"`, or `"js"`. The default is `"plain-text"`.
                    </li>
                    <li>
                        <strong>title</strong> (optional): The title displayed above the code block,
                        typically used to indicate the code format or language. The default is
                        `"tsx"`.
                    </li>
                    <li>
                        <strong>children</strong>: The code content to be displayed within the
                        block. It should be passed as a string.
                    </li>
                </ul>
                <h5>Copying Code</h5>
                <p>
                    The `CodeBlock` component includes a "Copy" button that enables users to easily
                    copy the displayed code to the clipboard. When the code is copied successfully,
                    the button text changes to "Copied" for a short duration.
                </p>
                <h5>Customization Example</h5>
                <p>
                    Here’s an example of a `CodeBlock` component with HTML syntax highlighting and a
                    custom title:
                </p>
                <CodeBlock formatAs="tsx">{tipxS0eVfZ}</CodeBlock>
                <h5>Inline Code</h5>
                <p>
                    If you want to display inline code directly within a text or paragraph, use the
                    following approach:
                </p>
                <CodeBlock formatAs="tsx">{bykC8l6CEG}</CodeBlock>
                <p>
                    This method is ideal for displaying small code snippets within text without the
                    need for a full code block.
                </p>
            </div>

            <div className="vertical-layout">
                <h3>Handling Different Code Formats</h3>
                <p>
                    The `CodeBlock` component supports syntax highlighting for various formats,
                    including:
                </p>
                <ul>
                    <li>
                        <strong>plain-text</strong>: Displays code as plain text without any
                        formatting.
                    </li>
                    <li>
                        <strong>html</strong>: Highlights HTML code with appropriate colors and
                        structure.
                    </li>
                    <li>
                        <strong>tsx</strong>/<strong>jsx</strong>: Highlights TypeScript or
                        JavaScript code with JSX syntax.
                    </li>
                    <li>
                        <strong>ts</strong>/<strong>js</strong>: Highlights TypeScript or JavaScript
                        code.
                    </li>
                </ul>
                <h5>Advanced Usage</h5>
                <p>
                    The `CodeBlock` component dynamically renders syntax highlighting based on the
                    selected format. This ensures that your code snippets are displayed clearly and
                    correctly, regardless of the programming language.
                </p>
                <h5>Example with JavaScript Code</h5>
                <CodeBlock formatAs="tsx">{Xx16E5bNwy}</CodeBlock>
            </div>

            <div className="vertical-layout">
                <h3>Conclusion</h3>
                <p>
                    The `CodeBlock` component is a powerful tool for displaying code snippets with
                    syntax highlighting in your React application. It supports multiple formats,
                    includes a handy copy feature, and is easy to integrate and customize according
                    to your needs.
                </p>
            </div>
        </div>
    );
}
