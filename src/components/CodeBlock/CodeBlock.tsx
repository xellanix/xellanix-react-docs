import { memo, useEffect, useId, useState } from "react";
import colorizeWorker from "./ColorizeWorkers?worker";
import * as Comlink from "comlink";

import "./CodeBlock.css";
import { ColorizeTag } from "./utils/util";

type CodeFormat = "plain-text" | "tsx" | "jsx" | "html" | "ts" | "js";

const copyCode = (code: string) => (ev: React.MouseEvent<HTMLButtonElement>) => {
    const elem = ev.currentTarget;

    navigator.clipboard
        .writeText(code)
        .then(() => {
            if (!elem) return;

            elem.innerText = "Copied";
            setTimeout(() => (elem.innerText = "Copy"), 1000);
        })
        .catch(() => {
            if (!elem) return;

            elem.innerText = "Failed";
            setTimeout(() => (elem.innerText = "Copy"), 1000);
        });
};

export const CodeBlock = memo(function CodeBlock({
    formatAs = "plain-text",
    title = "tsx",
    children = "",
    className = "",
    id,
}: {
    formatAs?: CodeFormat;
    title?: string;
    children?: string;
    className?: string;
    id?: string;
}) {
    const _thisId = useId();

    return (
        <div
            id={id ?? `xcb-${_thisId}`}
            className={`xellanix-code-block vertical-layout flex-no-gap ${className}`}>
            <div className="horizontal-layout flex-align-middle">
                <label htmlFor={id ?? `xcb-${_thisId}`} className="flex-fill">
                    {title}
                </label>
                <button
                    type="button"
                    className="button icon no-border"
                    onClick={copyCode(children)}>
                    Copy
                </button>
            </div>
            <pre className="xellanix-code-block-pre">
                <div>
                    <code>
                        <ColoredCodeBlock type={formatAs} code={children} />
                    </code>
                </div>
            </pre>
        </div>
    );
});

type WorkersType = {
    colorize_tsx: (code: string) => Promise<ColorizeTag[]>;
    colorize_html: (code: string) => Promise<ColorizeTag[]>;
};

const switchType = async (
    type: CodeFormat = "plain-text",
    code: string = "",
    signal?: AbortSignal
) => {
    return new Promise<string | React.ReactNode[]>(async (resolve, reject) => {
        if (type === "plain-text") return resolve(code);
        else {
            let norm = type;
            if (norm === "ts" || norm === "js" || norm === "jsx") norm = "tsx";

            const worker = new colorizeWorker();
            const workerAPI = Comlink.wrap<WorkersType>(worker);

            const handleAbort = () => {
                worker.terminate();
                reject(new Error("OperationAborted"));
            };
    
            if (signal) signal.addEventListener("abort", handleAbort);

            try {
                const tags = await workerAPI[("colorize_" + norm) as keyof WorkersType](code);

                const elements: React.ReactNode[] = [];
                for (let index = 0; index < tags.length; index++) {
                    if (signal?.aborted) break;

                    const element = tags[index];
                    elements.push(
                        <span key={index} className={element.type}>
                            {element.chars}
                        </span>
                    );
                }

                resolve(elements);
            } catch (error) {
                reject(error);
            } finally {
                if (signal) signal.removeEventListener("abort", handleAbort);
                worker.terminate();
            }
        }
    });
};

const ColoredCodeBlock = memo(function ColoredCodeBlock({
    code = "",
    type = "plain-text",
}: {
    code?: string;
    type?: CodeFormat;
}) {
    const [nodes, setNodes] = useState<React.ReactNode[] | string>(code);

    useEffect(() => {
        setNodes(code);

        // Create a new AbortController for each effect run
        const controller = new AbortController();

        // Call the switchType function with the AbortSignal
        switchType(type, code, controller.signal)
            .then((result) => {
                if (!controller.signal.aborted) {
                    setNodes(result);
                }
            })
            .catch((error) => {
                if (error.message === "OperationAborted") {
                    console.log("ColoredCodeBlock Operation aborted");
                } else {
                    console.error("Error during switchType:", error);
                }
            });

        // Cleanup function to abort the operation if the component unmounts or dependencies change
        return () => {
            controller.abort();
        };
    }, [code, type]);

    return <>{nodes}</>;
});
