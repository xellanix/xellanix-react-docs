import { useCallback, useState } from "react";
import { CodeBlock } from "./components/CodeBlock/CodeBlock";

type MarkdownContent = {
    type: string;
    content: string | MarkdownContent[];
    siblings?: MarkdownContent[][];
};

const generateRandomString = (length: number): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";
    const lettersLength = letters.length;
    const charactersLength = characters.length;

    // Ensure the first character is a letter
    result += letters.charAt(Math.floor(Math.random() * lettersLength));

    // Generate the rest of the string
    for (let i = 1; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

const processMarkdown = (markdown: string) => {
    let i = 0;
    let result = "";

    let elements: MarkdownContent[] = [];
    const lastElement = () => elements[elements.length - 1];
    let codeBlockData: { [key: string]: string } = {};

    const getStrong = () => {
        const strong = markdown.substring(i + 2, markdown.indexOf("**", i + 2));
        i += 4 + strong.length;

        return {
            type: "strong",
            content: strong,
        };
    };

    const getLine = () => {
        let content: MarkdownContent[] = [];
        let str = "";

        while (markdown[i] && markdown[i] !== "\n") {
            if (
                (markdown[i] === "*" && markdown[i + 1] === "*") ||
                (markdown[i] === "_" && markdown[i + 1] === "_")
            ) {
                content.push({
                    type: "",
                    content: str.trimStart(),
                });
                str = "";

                content.push(getStrong());
            } else {
                str += markdown[i];
                i++;
                if (!markdown[i] || markdown[i] === "\n") {
                    content.push({
                        type: "",
                        content: str.trimEnd(),
                    });
                }
            }
        }

        if (content.length === 1) {
            if (content[0].type === "" && typeof content[0].content === "string")
                content[0].content = content[0].content.trimStart();
        }

        return content;
    };

    for (; i < markdown.length; i++) {
        const c = markdown[i];
        if (c === "#") {
            let level = 1;

            while (markdown[++i] === "#") level++;

            const content = getLine();

            if (level === 1) {
                elements.push({
                    type: "h2",
                    content,
                });
            } else if (level === 2) {
                if (!lastElement().siblings) lastElement().siblings = [];

                lastElement().siblings?.push([
                    {
                        type: "h3",
                        content,
                    },
                ]);
            } else if (level === 3) {
                if (!lastElement().siblings) lastElement().siblings = [[]];

                const siblings = lastElement().siblings;

                if (siblings) {
                    siblings[siblings.length - 1].push({
                        type: "h5",
                        content,
                    });
                }
            }
        } else if (c === "`" && markdown[i + 1] === "`" && markdown[i + 2] === "`") {
            i = markdown.indexOf("\n", i + 2) + 1;
            const content = markdown.substring(i, markdown.indexOf("```", i));

            if (!lastElement().siblings) lastElement().siblings = [[]];

            const siblings = lastElement().siblings;

            const currentName = generateRandomString(10);
            codeBlockData[currentName] = content.trim();

            if (siblings) {
                siblings[siblings.length - 1].push({
                    type: "CodeBlock",
                    content: `{${currentName}}`,
                });
            }

            i += content.length + 3;
        } else if (c === "-" && markdown[i + 1] === "-" && markdown[i + 2] === "-") {
            i += 2;
        } else if (c === "-") {
            i++;

            const content = getLine();
            if (!lastElement().siblings) lastElement().siblings = [[]];

            const siblings = lastElement().siblings;

            if (siblings) {
                const lastSibling = siblings[siblings.length - 1];
                if (lastSibling[lastSibling.length - 1].type === "ul") {
                    (lastSibling[lastSibling.length - 1].content as MarkdownContent[]).push({
                        type: "li",
                        content,
                    });
                } else {
                    lastSibling.push({
                        type: "ul",
                        content: [{ type: "li", content }],
                    });
                }
            }
        } else if (
            (c === "*" && markdown[i + 1] === "*") ||
            (c === "_" && markdown[i + 1] === "_")
        ) {
            if (!lastElement().siblings) lastElement().siblings = [[]];

            const siblings = lastElement().siblings;

            if (siblings) {
                siblings[siblings.length - 1].push(getStrong());
            }
        } else if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
            const line = getLine();

            if (!lastElement().siblings) lastElement().siblings = [[]];

            const siblings = lastElement().siblings;

            if (siblings) {
                siblings[siblings.length - 1].push({
                    type: "p",
                    content: line,
                });
            }
        }
    }

    const isStr = (value: any) => {
        return typeof value === "string";
    };

    const makeContent = (element: MarkdownContent, level = 0) => {
        const tab = "\t".repeat(level);
        result += `\n${tab}`;

        const isCodeBlock = element.type === "CodeBlock" ? ` formatAs="tsx"` : "";

        if (isStr(element.content)) {
            result += `<${element.type}${isCodeBlock}>${element.content}</${element.type}>`;
        } else {
            result += `<${element.type}${isCodeBlock}>`;
            for (const c of element.content) {
                if (c.type === "") result += c.content;
                else makeContent(c, level + 1);
            }
            result += `${element.type === "li" || element.type === "ul" ? `\n${tab}` : ""}</${
                element.type
            }>`;
        }
    };

    const makeSiblings = (element: MarkdownContent, level = 0) => {
        if (element.siblings) {
            for (const sibling of element.siblings) {
                const tab = "\t".repeat(level);
                result += `\n\n${tab}<div className="vertical-layout">`;
                for (const children of sibling) {
                    makeContent(children, level + 1);

                    makeSiblings(children, level + 1);
                }
                result += `\n${tab}</div>`;
            }
        }
    };

    for (const element of elements) {
        makeContent(element);

        makeSiblings(element);
    }

    let vars = "";
    for (const key in codeBlockData) {
        if (Object.prototype.hasOwnProperty.call(codeBlockData, key)) {
            const element = codeBlockData[key];
            vars += `const ${key} = ${JSON.stringify(element)};\n`;
        }
    }

    const final = `${vars}\n\n
export function CodeBlockDev() {
return (
<div className="vertical-layout vertical-gap2x">
${result}
</div>
);
}`;
    return final;
};

export function MarkdownToJSX() {
    const [result, setResult] = useState("");

    const markdownChanged = useCallback((ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        const elem = ev.currentTarget;
        if (!elem) return;

        const markdown = elem.value;
        const replaced = processMarkdown(markdown);

        setResult(replaced);
    }, []);

    return (
        <div className="vertical-layout vertical-gap2x">
            <h2>Markdown to JSX Format</h2>
            <div className="horizontal-layout" style={{ minHeight: "50dvh" }}>
                <textarea className="flex-hug" onChange={markdownChanged}></textarea>
                <CodeBlock formatAs="tsx" className="flex-fill">
                    {result}
                </CodeBlock>
            </div>
        </div>
    );
}
