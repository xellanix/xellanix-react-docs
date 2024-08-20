import { useId } from "react";
import "./CodeBlock.css";

const tag = `<button
    type="button"
    className="button accent"
    onClick={() => {
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
</button>`;

type CodeFormat = "plain-text" | "tsx" | "jsx";

const outsideTagBody = (code: string, index: number): boolean => {
    const before = code.substring(0, index);
    const gt = before.lastIndexOf(">");
    const lt = before.lastIndexOf("<");

    return lt < gt;
};

const isNumeric = (c: string) => c >= "0" && c <= "9";
const isAlpha = (c: string) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
const isArithmeticOperator = (c: string) =>
    c === "+" || c === "-" || c === "*" || c === "/" || c === "=" || c === ">" || c === "<";
const isLogicalOperator = (c: string) => c === "&" || c === "|" || c === "!";
const isSpace = (c: string) => c === " " || c === "\t" || c === "\n";

const getUntil = (code: string, startIndex: number, until: string): [string, number] => {
    let str = "";
    let i = startIndex;
    while (i < code.length) {
        if (code[i] === until[0]) {
            if (until.length === 1) return [str, i];

            for (let j = 1; j < until.length; j++) {
                const u = code[i + j];
                if (u !== until[j]) break;
                if (j === until.length - 1) return [str, i];
            }
        }
        str += code[i];
        i++;
    }

    return [str, i];
};
const substrOf = (code: string, startIndex: number, pred: (c: string) => boolean) => {
    let str = "";
    let i = startIndex;
    while (i < code.length) {
        if (pred(code[i])) {
            str += code[i];
        } else {
            break;
        }
        i++;
    }
    return str;
};

const getLine = (code: string, startIndex: number) => getUntil(code, startIndex, "\n");
const getNumbers = (code: string, startIndex: number): [string, number] => {
    let str = "";
    let i = startIndex;
    let hasDecimalPoint = false;

    while (i < code.length) {
        if (isNumeric(code[i])) {
            str += code[i];
        } else if (code[i] === "." && !hasDecimalPoint) {
            hasDecimalPoint = true;
            str += code[i];
        } else {
            break;
        }
        i++;
    }
    return [str, i];
};
const getBoundary = (code: string, startIndex: number) =>
    substrOf(code, startIndex, (c) => isAlpha(c) || isNumeric(c) || c === "_");
const getSpaces = (code: string, startIndex: number) => substrOf(code, startIndex, isSpace);

const colorize = (code: string) => {
    let chars = "";
    let type = "";
    let reset = "";
    let brackets = 0;

    const constructed: React.ReactNode[] = [];

    let i = 0;

    const set = (currentType: string, char: string, index?: number) => {
        if (type === currentType || type === "") {
            chars += char;
        } else {
            constructed.push(
                <span key={index ?? i} className={type}>
                    {chars}
                </span>
            );
            chars = char;
        }
        type = currentType;
    };

    const setVariable = (c: string) => {
        set("vr", c);
        reset += c;
    };

    const setKeyword = (currentType: string, c: string, clear: boolean = true) => {
        const types = ["let", "const", "var", "function", "class", "interface", "type", "enum"];
        const keywords = ["return", "export", "default", "import", "new", "delete", "from", "as"];
        const numerics = ["true", "false"];

        if (types.includes(reset)) {
            chars = chars.substring(0, chars.length - reset.length);
            set("ty", reset, i - 1);
            reset = "";
        } else if (keywords.includes(reset)) {
            chars = chars.substring(0, chars.length - reset.length);
            set("kw", reset, i - 1);
            reset = "";
        } else if (numerics.includes(reset)) {
            chars = chars.substring(0, chars.length - reset.length);
            set("nm", reset, i - 1);
            reset = "";
        }
        if (clear) reset = "";
        set(currentType, c);
    };

    for (; i < code.length; i++) {
        const c = code[i];

        if (c === "<" || (code[i - 1] === "<" && c === "/")) {
            set("tc", c);
        } else if (c === ">") {
            if (code[i - 1] === "=") {
                set("op", c);
            } else {
                set("tc", c);
            }
        } else if (c === "{" || c === "}") {
            if (c === "{") {
                brackets++;
                set("bc", c);
            } else {
                brackets--;
                if (reset.length > 0) setKeyword("bc", c);
                else set("bc", c);
            }
        } else if (c === "(" || c === ")") {
            if (c !== "(" && reset.length > 0) {
                setKeyword("bc", c, false);

                if (reset.length === 0) continue;
            }

            if (brackets > 0 && c === "(" && reset.length > 0) {
                chars = chars.substring(0, chars.length - reset.length);
                set("fn", reset, i - 1);
                set("bc", c);
                reset = "";
            } else if (c === "(" || reset.length === 0) {
                set("bc", c);
            }
        } else if (c === `"` || c === `'`) {
            set("qt", c);
        } else if (c === "=" || c === "-" || c === "+" || c === "*" || c === "/" || c === "!") {
            set("op", c);
        } else if (c === " " || c === "\t" || c === "\n") {
            if (type === "ch") set("ch", c);
            else if (type === "st") set("st", c);
            else if (reset.length > 0) {
                setKeyword("ws", c);
            } else set("ws", c);
        } else {
            const isel = code[i - 1] === "<" || code[i - 1] === "/";
            if (type === "tc" && isel) {
                set("el", c);
            } else if (type === "tc" && !isel) {
                set("ch", c);
            } else if (type === "qt") {
                set("st", c);
            } else if (type === "vr") {
                if (c === ".") {
                    setVariable(c);
                    reset = "";
                } else if (c === ",") {
                    setKeyword("vr", c);
                } else setVariable(c);
            } else if (type === "pr") {
                set("pr", c);
            } else if (type === "el") {
                set("el", c);
            } else if (type === "ch") {
                set("ch", c);
            } else if (type === "st") {
                set("st", c);
            } else if (type === "ws") {
                if (brackets === 0 && !outsideTagBody(code, i)) {
                    set("pr", c);
                } else if (brackets > 0) {
                    setVariable(c);
                } else {
                    set("ch", c);
                }
            } else if (type === "op") {
                if (code[i - 1] === "!") {
                    setVariable(c);
                }
            } else if (type === "bc") {
                if (code[i - 1] === "(") set("pm", c);
                else {
                    setVariable(c);
                }
            } else if (type === "pm") {
                set("pm", c);
            } else setVariable(c);
        }
    }

    constructed.push(
        <span key={i} className={type}>
            {chars}
        </span>
    );
    return constructed;
};

const colorizeTsx = (code: string) => {
    let chars = "";
    let type = "";
    let reset = "";
    let isFuncParams = -1;
    let isArrowParams = false;
    let ternaryOperator = false;

    const constructed: React.ReactNode[] = [];

    let i = 0;

    const addNode = (index?: number) =>
        constructed.push(
            <span key={index ?? i} className={type}>
                {chars}
            </span>
        );

    const set = (currentType: string, char: string, index?: number) => {
        if (type === currentType || type === "") chars += char;
        else {
            addNode(index);
            chars = char;
        }
        type = currentType;
    };

    const setI = (currentType: string, char: string, index?: number) => {
        set(currentType, char, index);
        i += char.length - 1;
    };

    const setVariable = (c: string, clear: boolean = false) => {
        set("vr", c);
        if (!clear) reset += c;
        else reset = "";
    };

    const setBoundary = (currentType: string, word: string) => {
        setI(currentType, word);
    };

    const setBVar = (clear: boolean = false) => {
        const word = getBoundary(code, i);
        setBoundary("vr", word);
        if (!clear) reset += word;
        else reset = "";
    };

    const setFuncName = () => {
        const b = getBoundary(code, i);
        let next = i + b.length;
        const spaces = getSpaces(code, next);
        next += spaces.length;

        if (code[next] === "(") {
            setBoundary("fn", b);
            reset += b;
        } else {
            setBoundary("vr", b);
            reset += b;
        }

        if (spaces.length > 0) {
            i++;
            processSpaces(spaces);
        }
    };

    const setParameter = (c: string) => {
        set("pm", c);
        reset += c;
    };

    const setKeyword = (currentType: string, c: string, clear: boolean = true) => {
        const types = [
            "let",
            "const",
            "var",
            "function",
            "void",
            "class",
            "interface",
            "type",
            "enum",
            "number",
            "string",
            "boolean",
            "any",
            "unknown",
        ];
        const keywords = [
            "return",
            "export",
            "default",
            "import",
            "new",
            "delete",
            "from",
            "as",
            "if",
            "else",
            "for",
            "while",
            "do",
            "in",
            "switch",
        ];
        const numerics = ["true", "false"];

        if (types.includes(reset)) {
            if (reset === "function") isFuncParams = 0;

            chars = chars.substring(0, chars.length - reset.length);
            set("ty", reset, i - 1);
            reset = "";
        } else if (keywords.includes(reset)) {
            chars = chars.substring(0, chars.length - reset.length);
            set("kw", reset, i - 1);
            reset = "";
        } else if (numerics.includes(reset)) {
            chars = chars.substring(0, chars.length - reset.length);
            set("nm", reset, i - 1);
            reset = "";
        }
        if (clear) reset = "";
        set(currentType, c);
    };

    const setAnyOrVar = (condition: boolean, currentType: string, c: string) => {
        if (condition) set(currentType, c);
        else setVariable(c);
    };

    const getReturn = (start: number) => {
        let brs = 0;
        for (let j = start; j < code.length; j++) {
            if (isSpace(code[j])) continue;
            else if (code[j] === "(" || code[j] === "{" || code[j] === "[") brs++;
            else if (code[j] === ")" || code[j] === "}" || code[j] === "]") brs--;
            else if (brs === 0) {
                return getBoundary(code, j).length + j;
            }

            if (brs === 0) {
                return j + 1;
            }
        }

        return null;
    };

    const isArrowFunc = (isInArrowParams: boolean = isArrowParams) => {
        if (!isInArrowParams) return false;

        let isArrowFunc = false;
        let isStillOpen = true;

        let j = i + 1;
        const cc = () => code[j];

        for (; j < code.length; j++) {
            if (cc() === ")") {
                isStillOpen = false;
                continue;
            }

            if (isSpace(cc()) || isStillOpen) {
                continue;
            }

            if (!isStillOpen) {
                if (cc() === ":") {
                    const returnindex = getReturn(j + 1);
                    if (returnindex) {
                        j = returnindex + 1;
                    } else {
                        isArrowFunc = false;
                        break;
                    }
                }
            }

            isArrowFunc = cc() === "=" && code[j + 1] === ">";
            break;
        }

        isArrowParams = isArrowFunc;

        return isArrowFunc;
    };

    const isSpreadOperator = () => code[i] === "." && code[i + 1] === "." && code[i + 2] === ".";
    const isLeadedDecimal = () => code[i] === "." && isNumeric(code[i + 1]);

    const processInBrackets = (c: string, brackets: string) => {
        if (code[i - 1] === brackets[0]) {
            if (isArrowFunc(true) || isFuncParams > 0) setParameter(c);
            else setVariable(c);
        } else if (code[i - 1] === brackets[1] && c === ".") setVariable(c, true);
        else setVariable(c);
    };
    const processSpaces = (allSpaces: string) => {
        if (type === "ch") setI("ch", allSpaces);
        else if (type === "st") setI("st", allSpaces);
        else if (reset.length > 0) {
            setKeyword("ws", allSpaces);
            i += allSpaces.length - 1;
        } else {
            setI("ws", allSpaces);
        }
    };

    for (; i < code.length; i++) {
        const c = code[i];

        if (c === "{" || c === "}") {
            if (c === "{") set("bc", c);
            else {
                if (reset.length > 0) setKeyword("bc", c);
                else set("bc", c);
            }
        } else if (c === "(" || c === ")") {
            if (c === "(") {
                if (isFuncParams >= 0) isFuncParams++;

                set("bc", c);
            } else {
                if (isFuncParams > 0) {
                    isFuncParams--;
                    if (isFuncParams === 0) isFuncParams = -1;
                }

                isArrowParams = false;

                if (reset.length > 0) setKeyword("bc", c, false);
                else set("bc", c);
            }
        } else if (c === `"` || c === "'") {
            const [text] = getUntil(code, i + 1, c);
            set("qt", c);
            i++;
            if (text.length > 0) {
                setI("st", text);
                i++;
            }
            set("qt", c);
        } else if (c === "[" || c === "]") {
            if (reset.length > 0) setKeyword("sq", c, false);
            else set("sq", c);
        } else if (c === "/" && (code[i + 1] === "/" || code[i + 1] === "*")) {
            if (code[i + 1] === "/") {
                // single line comment
                const [line] = getLine(code, i + 2);
                setI("cm", "//" + line);
            } else {
                // multi line comment
                const [comments] = getUntil(code, i + 2, "*/");
                setI("cm", "/*" + comments + "*/");
            }
        } else if (isArithmeticOperator(c) || isLogicalOperator(c)) {
            if (reset.length > 0) {
                setKeyword("op", c);

                if (reset.length === 0) continue;
            }

            set("op", c);
        } else if (c === "?") {
            if (code[i + 1] !== "?") ternaryOperator = true;

            set("op", c);
        } else if (c === ":") {
            if (ternaryOperator) {
                if (code[i - 1] === "?") setVariable(c, true);
                else set("op", c);
                ternaryOperator = false;
            } else setVariable(c, true);
        } else if (isSpace(c)) processSpaces(c + getSpaces(code, i + 1));
        else if (isSpreadOperator()) setI("op", "...");
        else if (isLeadedDecimal()) {
            reset = "";
            const numbers = c + code[i + 1] + getNumbers(code, i + 2)[0];
            setI("nm", numbers);
        } else {
            if (type === "qt") setVariable(c);
            else if (type === "vr") {
                if (c === ".") setVariable(c, true);
                else if (c === "," || c === ";") setKeyword("vr", c);
                else if (code[i - 1] === ",") {
                    if (isArrowFunc() || isFuncParams > 0) setParameter(c);
                } else if (code[i - 1] === ".") setFuncName();
                else setBVar();
            } else if (type === "st") set("st", c);
            else if (type === "ws") {
                if (isNumeric(c)) setI("nm", c + getNumbers(code, i + 1)[0]);
                else if (isArrowFunc() || isFuncParams > 0) setParameter(c);
                else setFuncName();
            } else if (type === "bc") processInBrackets(c, "()");
            else if (type === "pm") {
                if (c === ".") setVariable(c, true);
                else if (c === "," || c === ";") setKeyword("vr", c);
                else if (isNumeric(c)) setI("nm", c + getNumbers(code, i + 1)[0]);
                else setParameter(c);
            } else if (type === "nm") setAnyOrVar(isNumeric(c) || c === ".", "nm", c);
            else if (type === "op") {
                if (isNumeric(c)) setI("nm", c + getNumbers(code, i + 1)[0]);
                else if (c === ".") setVariable(c, true);
                else if (isArrowFunc(true) || isFuncParams > 0) setParameter(c);
                else setBVar();
            } else if (type === "sq") processInBrackets(c, "[]");
            else setBVar();
        }
    }

    addNode();
    return constructed;
};

export function CodeBlock({
    formatAs = "plain-text",
    title = "tsx",
    children = tag,
}: {
    formatAs?: CodeFormat;
    title?: string;
    children?: string;
}) {
    const _thisId = useId();

    return (
        <div id={`xcb-${_thisId}`} className="xellanix-code-block vertical-layout flex-no-gap">
            <div
                className="horizontal-layout flex-align-middle">
                <label htmlFor={`xcb-${_thisId}`} className="flex-fill">
                    {title}
                </label>
                <button type="button" className="button icon no-border">
                    Copy
                </button>
            </div>
            <pre className="xellanix-code-block-pre">
                <div>
                    <code>
                        {formatAs === "plain-text"
                            ? children
                            : formatAs === "tsx"
                            ? colorizeTsx(children)
                            : formatAs === "jsx"
                            ? colorize(children)
                            : ""}
                    </code>
                </div>
            </pre>
        </div>
    );
}

/*

*/
