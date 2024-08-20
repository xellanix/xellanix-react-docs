// IMPORT SECTION
// node_modules
import { memo, useCallback, useEffect, useRef } from "react";
// local components
// assets
// local assets
// styles
import "./ThemeSelector.css";

type ThemeOptionStyle = "icon-only" | "text-inline" | "text-overlay";

const ThemeSelector = memo(function ThemeSelector({
    optionStyle = "text-overlay",
}: {
    optionStyle?: ThemeOptionStyle;
}) {
    const selectorRef = useRef<HTMLDivElement>(null);

    const applyTheme = useCallback((isDarkMode: boolean) => {
        (selectorRef.current?.children[isDarkMode ? 2 : 0] as HTMLInputElement).checked = true;

        if (isDarkMode) {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
        }
    }, []);

    useEffect(() => {
        applyTheme(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }, []);

    const selectorChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        applyTheme(e.target.value === "darktheme");
    }, []);

    return (
        <div ref={selectorRef} id="theme-selector" className={`${optionStyle}`} onChange={selectorChanged}>
            <input
                type="radio"
                name="theme-selector"
                value="lighttheme"
                id="light-option"
                className="theme-option-radio"
                tabIndex={-1}
            />
            <label htmlFor="light-option" className="theme-option">
                <div className="theme-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                        <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                    </svg>
                </div>
                {optionStyle !== "icon-only" && <span>Light</span>}
            </label>
            <input
                type="radio"
                name="theme-selector"
                value="darktheme"
                id="dark-option"
                className="theme-option-radio"
                tabIndex={-1}
            />
            <label htmlFor="dark-option" className="theme-option">
                <div className="theme-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                    </svg>
                </div>
                {optionStyle !== "icon-only" && <span>Dark</span>}
            </label>
        </div>
    );
});

export default ThemeSelector;
