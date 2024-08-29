import { colorizeTsx } from "./utils/tsx.util";
import { colorizeHtml } from "./utils/html.util";
import * as Comlink from "comlink";

Comlink.expose({
	colorize_tsx: (code: string) => colorizeTsx(code),
	colorize_html: (code: string) => colorizeHtml(code),
});
