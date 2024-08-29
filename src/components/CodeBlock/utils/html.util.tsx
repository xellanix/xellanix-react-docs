import { getUntil, isSpace, getSpaces, getInsideBrackets, ColorizeTag } from "./util";
import { colorizeTsx } from "./tsx.util";

export const colorizeHtml = (code: string) => {
    let chars = "";
    let type = "";
    let cage = 0;

    const constructed: ColorizeTag[] = [];

    let i = 0;

    const set = (currentType: string, char: string) => {
        if (type === currentType || type === "") {
            chars += char;
        } else {
            constructed.push({
                type: type,
                chars: chars,
            })
            chars = char;
        }
        type = currentType;
    };

    const processCode = () => {
        let inside = getInsideBrackets(code, i);
        if (inside !== null) {
            inside = "{" + inside + "}";

            const j = i + inside.length;
            set("", "");
            constructed.push(...colorizeTsx(inside));

            i = j - 1;
        } else set("bc", code[i]);
    };

    for (; i < code.length; i++) {
        const c = code[i];

        if (
            c === "<" ||
            (code[i - 1] === "<" && c === "/") ||
            c === ">" ||
            (c === "/" && code[i + 1] === ">")
        ) {
            set("tc", c);

            if (c === "<" && code[i + 1] !== "/") cage++;
            else if (c === ">" && cage > 0) cage--;
        } else if (c === "{" || c === "}") {
            if (c === "{") processCode();
            else set("bc", c);
        } else if (c === `"` || c === `'` || c === "`") {
            const text = getUntil(code, i + 1, c, "\\");
            set("qt", c);
            i++;
            if (text.length > 0) {
                set("st", text);
                i += text.length;
            }
            set("qt", c);
        } else if (c === "=") set("op", c);
        else if (isSpace(c)) {
            const nc = c + getSpaces(code, i + 1);
            i += nc.length - 1;

            if (type === "ch") set("ch", nc);
            else set("ws", nc);
        } else {
            const isel = code[i - 1] === "<" || code[i - 1] === "/";

            if ((type === "tc" && isel) || type === "el") set("el", c);
            else if ((type === "tc" && !isel) || type === "ch") set("ch", c);
            else if (type === "pr") set("pr", c);
            else if (type === "ws") {
                if (cage > 0) set("pr", c);
                else set("ch", c);
            }
        }
    }

    constructed.push({
        type: type,
        chars: chars,
    })
    return constructed;
};