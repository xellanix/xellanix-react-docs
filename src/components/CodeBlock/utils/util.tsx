export type ColorizeTag = { type: string; chars: string };

export const isNumeric = (c: string) => c >= "0" && c <= "9";
export const isAlpha = (c: string) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
export const isArithmeticOperator = (c: string) =>
    c === "+" || c === "-" || c === "*" || c === "/" || c === "=" || c === ">" || c === "<";
export const isLogicalOperator = (c: string) => c === "&" || c === "|" || c === "!";
export const isSpace = (c: string) => c === " " || c === "\t" || c === "\n";

export const getUntil = (code: string, startIndex: number, until: string, escape: string = ""): string => {
    let str = "";
    let i = startIndex;
    while (i < code.length) {
        if (code[i] === until[0] && (escape.length === 0 || code[i - 1] !== escape[0])) {
            if (until.length === 1) return str;

            for (let j = 1; j < until.length; j++) {
                const u = code[i + j];
                if (u !== until[j]) break;
                if (j === until.length - 1) return str;
            }
        }
        str += code[i];
        i++;
    }

    return str;
};
export const substrOf = (code: string, startIndex: number, pred: (c: string) => boolean) => {
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

export const getLine = (code: string, startIndex: number) => getUntil(code, startIndex, "\n", "\\");
export const getNumbers = (code: string, startIndex: number): string => {
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
    return str;
};
export const getBoundary = (code: string, startIndex: number) =>
    substrOf(code, startIndex, (c) => isAlpha(c) || isNumeric(c) || c === "_");
export const getSpaces = (code: string, startIndex: number) => substrOf(code, startIndex, isSpace);

export const getTag = (code: string, startIndex: number) => {
    let substr = "";
    let rootElem = "";
    let tag = 0;
    let isIn = false;

    for (let i = startIndex; i < code.length; i++) {
        const c = code[i];

        if (isSpace(c)) substr += c;
        else if (isNumeric(c) && (isSpace(code[i - 1]) || code[i - 1] === "<") && isIn) {
            console.log("null 1", c);
            return null;
        } else if (c === "=") {
            substr += c;
            i++;
            if (code[i] === "=" && isIn) {
                console.log("null 2");
                return null;
            }

            for (; i < code.length; i++) {
                const cc = code[i];

                substr += cc;

                if (isSpace(cc)) continue;
                else if (cc === '"' || cc === "'") {
                    const text = getUntil(code, i + 1, cc, "\\");
                    if (text.length > 0) {
                        substr += text;
                        i += text.length + 1;
                    }
                    substr += cc;
                    break;
                } else if (cc === "{") {
                    const inside = getInsideBrackets(code, i);
                    if (inside !== null && inside.length > 0) {
                        substr += inside;
                        i += inside.length;
                    }
                    break;
                } else if (cc === "}") break;
            }
        } else if (c === "<" && code[i + 1] === "!" && code[i + 2] === "-" && code[i + 3] === "-") {
            isIn = true;
            substr += "<!--";
            i += 3;
        } else if (c === "<" && tag === 0) {
            isIn = true;
            substr += c;
            while (isSpace(code[i + 1])) i++;

            if (code[i + 1] === ">") {
                rootElem = "";
                tag = 1;
            } else if (isAlpha(code[i + 1]) || code[i + 1] === "_") {
                rootElem = getBoundary(code, i + 1);
                tag = 1;
            }
        } else if (c === "<" && tag > 0) {
            isIn = true;
            substr += c;
            while (isSpace(code[i + 1])) i++;

            if (code[i + 1] === "/") {
                if (rootElem === getBoundary(code, i + 2)) {
                    const end = "/" + rootElem + ">";
                    substr += end;
                    i += end.length;
                }
                tag--;

                if (tag === 0) break;
            } else if (isAlpha(code[i + 1]) || code[i + 1] === "_") {
                tag++;
            }
        } else if (c === "/" && code[i + 1] === ">") {
            isIn = false;
            substr += c + ">";
            i++;
            tag--;

            if (tag === 0) break;
        } else if (c === ">") {
            isIn = false;
            substr += c;
        } else if (!isIn && c === "{") {
            substr += c;
            const inside = getInsideBrackets(code, i);
            if (inside !== null && inside.length > 0) {
                substr += inside;
                i += inside.length;
            }
        } else if (
            isIn &&
            !(
                isAlpha(c) ||
                isNumeric(c) ||
                c === "_" ||
                c === "<" ||
                c === ">" ||
                c === "/" ||
                c === "{" ||
                c === "}" ||
                c === "-"
            )
        ) {
            console.log("null 3", substr);
            return null;
        } else if (tag > 0) substr += c;
    }

    return substr;
};

export const getInsideBrackets = (code: string, startIndex: number) => {
    let brs = 1;
    let substr = "";

    for (let i = startIndex + 1; i < code.length; i++) {
        const c = code[i];

        if (c === "{") brs++;
        else if (c === "}") brs--;

        if (brs > 0) substr += c;
        else return substr;
    }

    return null;
};