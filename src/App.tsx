import { useCallback, useRef, useState } from "react";
import "./App.css";
import GroupedContentList, {
    GroupedContent,
} from "./components/GroupedContentList/GroupedContentList";
import { Breadcrumbs } from "./components/Breadcrumbs/Breadcrumbs";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";
import { BenchmarkDev } from "./Benchmark";

import { Welcome } from "./contents/getting-started/Welcome";
import { InfoBoxDev } from "./contents/getting-started/InfoBox";
import { PopupDev } from "./contents/getting-started/Popup";
import { SliderDev } from "./contents/getting-started/Slider";
import { ToggleSwitchDev } from "./contents/getting-started/ToggleSwitch";
import { CodeBlockDev } from "./contents/components/CodeBlock";

let groupList: GroupedContent[] = [
    {
        name: "Getting Started",
        items: [
            { name: "Welcome", content: <Welcome /> },
            { name: "Using info box", content: <InfoBoxDev /> },
            { name: "Using popup", content: <PopupDev /> },
            { name: "Using slider", content: <SliderDev /> },
            { name: "Using toggle switch", content: <ToggleSwitchDev /> },
        ],
    },
    /* {
        name: "Components",
        items: [
            { name: "InfoBox", content: "InfoBox" },
            { name: "PopupProvider", content: "PopupProvider" },
            { name: "Slider", content: "Slider" },
            { name: "SliderInput", content: "SliderInput" },
            { name: "ToggleSwitch", content: "ToggleSwitch" },
        ],
    },
    {
        name: "Types and Enums",
        items: [{ name: "InfoStatus", content: "InfoStatus" }],
    },
    {
        name: "Hooks",
        items: [
            { name: "usePopup", content: "usePopup" },
            { name: "useSlider", content: "useSlider" },
        ],
    }, */
];

if (import.meta.env.DEV)
    groupList.push({
        name: "Development",
        items: [
            { name: "CodeBlock", content: <CodeBlockDev /> },
            { name: "Benchmark", content: <BenchmarkDev /> },
        ],
    });

window.addEventListener("keydown", (ev) => {
    // custom control f for search
    if (ev.ctrlKey && ev.key === "k") {
        ev.preventDefault();
        const searchBox = document.getElementById("search-box-wrapper");
        searchBox?.querySelector("input")?.focus();
    }
});

const defaultSelected = (() => {
    const currentUrl = new URL(window.location.href);
    const groupIndex = parseInt(currentUrl.searchParams.get("groupIndex") ?? "0", 10);
    const itemIndex = parseInt(currentUrl.searchParams.get("itemIndex") ?? "0", 10);
    return [groupIndex, itemIndex];
})();

const getItemContent = (groupIndex?: number, itemIndex?: number) =>
    groupList[groupIndex ?? defaultSelected[0]].items[itemIndex ?? defaultSelected[1]].content;

const createCrumbs = (groupIndex?: number, itemIndex?: number) => {
    const group = groupList[groupIndex ?? defaultSelected[0]];
    const itemName = group.items[itemIndex ?? defaultSelected[1]].name;

    return [group.name, itemName];
};

export default function App() {
    const [content, setContent] = useState<React.ReactNode>(getItemContent());
    const [crumbs, setCrumbs] = useState<string[]>(createCrumbs());

    const contentRef = useRef<HTMLDivElement>(null);

    const onSelectionChange = useCallback((groupIndex: number, itemIndex: number) => {
        setContent(getItemContent(groupIndex, itemIndex));
        setCrumbs(createCrumbs(groupIndex, itemIndex));

        // scroll to top
        contentRef.current?.scrollTo(0, 0);

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("groupIndex", `${groupIndex}`);
        currentUrl.searchParams.set("itemIndex", `${itemIndex}`);
        history.replaceState({}, "", currentUrl.toString());
    }, []);

    const toggleSide = useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        const elem = ev.currentTarget;
        const parent = elem.previousElementSibling! as HTMLDivElement;

        const now = parent.classList.toggle("on-open");
        (elem.children[0].children[3] as SVGPathElement).setAttribute(
            "d",
            now ? "M15 10l-2 2l2 2" : "M14 10l2 2l-2 2"
        );
    }, []);

    console.log("App() render");

    return (
        <div className="horizontal-layout" style={{ height: "100%", position: "relative" }}>
            <div id="left-side" className="vertical-layout flex-hug">
                <div className="vertical-layout flex-hug">
                    <div className="horizontal-layout flex-no-gap">
                        <div className="icon-landscape">
                            <a href="./" tabIndex={-1}>
                                <img src="/icon.svg" alt="Xellanix Icon" />
                                <h4>Xellanix</h4>
                            </a>
                        </div>
                        <ThemeSelector optionStyle="icon-only" />
                    </div>
                    <div id="search-box-wrapper" className="vertical-layout flex-align-middle">
                        <div className="search-box-icon">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="var(--separator-color)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>
                        </div>
                        <input type="text" name="search-box" id="search-box" placeholder="Search" />
                        <div className="search-box-key vertical-layout flex-align-middle">
                            Ctrl + K
                        </div>
                    </div>
                </div>

                <div className="vertical-layout flex-fill scrollable">
                    <GroupedContentList
                        list={groupList}
                        defaultValue={defaultSelected}
                        onSelectionChange={onSelectionChange}
                    />
                </div>
            </div>
            <button id="left-side-expander" className="button icon no-border" onClick={toggleSide}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                    <path d="M9 4v16" />
                    <path d="M14 10l2 2l-2 2" />
                </svg>
            </button>

            <div id="right-side" className="vertical-layout flex-fill">
                <Breadcrumbs crumbs={crumbs} />
                <div ref={contentRef} className="wrapper-only scrollable">
                    {content}
                </div>
            </div>
        </div>
    );
}
