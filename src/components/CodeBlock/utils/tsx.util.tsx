import {
    getBoundary,
    getSpaces,
    isSpace,
    isNumeric,
    getNumbers,
    getUntil,
    getLine,
    isArithmeticOperator,
    isLogicalOperator,
    getTag,
    ColorizeTag,
} from "./util";
import { colorizeHtml } from "./html.util";

export const colorizeTsx = (code: string) => {
    let chars = "";
    let type = "";
    let reset = "";
    let isFuncParams = -1;
    let isArrowParams = false;
    let ternaryOperator = false;

    const constructed: ColorizeTag[] = [];

    let i = 0;

    const addNode = () => {
        constructed.push({
            type: type,
            chars: chars,
        });
    };

    const set = (currentType: string, char: string) => {
        if (type === currentType || type === "") chars += char;
        else {
            addNode();
            chars = char;
        }
        type = currentType;
    };

    const setI = (currentType: string, char: string) => {
        set(currentType, char);
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

        const hasInclude = (tp: string) => {
            chars = chars.substring(0, chars.length - reset.length);
            if (chars.length === 0) type = "";
            set(tp, reset);
            reset = "";
        };

        if (types.includes(reset)) {
            if (reset === "function") isFuncParams = 0;

            hasInclude("ty");
        } else if (keywords.includes(reset)) {
            hasInclude("kw");
        } else if (numerics.includes(reset)) {
            hasInclude("nm");
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
        if (isNumeric(c)) setI("nm", c + getNumbers(code, i + 1));
        else if (code[i - 1] === brackets[0]) {
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

    let now = Date.now();
    while (Date.now() - now < 500) {}

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
        } else if (c === `"` || c === "'" || c === "`") {
            const text = getUntil(code, i + 1, c, "\\");
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
                const line = getLine(code, i + 2);
                setI("cm", "//" + line);
            } else {
                // multi line comment
                const comments = getUntil(code, i + 2, "*/");
                setI("cm", "/*" + comments + "*/");
            }
        } else if (isArithmeticOperator(c) || isLogicalOperator(c)) {
            if (reset.length > 0) {
                setKeyword("op", c);

                if (reset.length === 0) continue;
            }

            if (c === "<") {
                const tag = getTag(code, i);

                if (tag !== null) {
                    set("", "");
                    const nodes = colorizeHtml(tag);
                    constructed.push(...nodes);
                    i += tag.length - 1;
                    continue;
                }
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
            const numbers = c + code[i + 1] + getNumbers(code, i + 2);
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
                if (isNumeric(c)) setI("nm", c + getNumbers(code, i + 1));
                else if (isArrowFunc() || isFuncParams > 0) setParameter(c);
                else setFuncName();
            } else if (type === "bc") processInBrackets(c, "()");
            else if (type === "pm") {
                if (c === ".") setVariable(c, true);
                else if (c === "," || c === ";") setKeyword("vr", c);
                else if (isNumeric(c)) setI("nm", c + getNumbers(code, i + 1));
                else setParameter(c);
            } else if (type === "nm") setAnyOrVar(isNumeric(c) || c === ".", "nm", c);
            else if (type === "op") {
                if (isNumeric(c)) setI("nm", c + getNumbers(code, i + 1));
                else if (c === ".") setVariable(c, true);
                else if (isArrowFunc(true) || isFuncParams > 0) setParameter(c);
                else setBVar();
            } else if (type === "sq") processInBrackets(c, "[]");
            else setBVar();
        }
    }
    if (reset.length > 0) {
        setKeyword("", "");

        if (reset.length > 0) {
            addNode();
        }
    } else addNode();

    return constructed;
};
