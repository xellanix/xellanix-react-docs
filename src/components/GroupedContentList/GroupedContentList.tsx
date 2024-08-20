import { useCallback, useId } from "react";
import "./GroupedContentList.css";

type GroupedContentItem = {
    name: string;
    content: any;
};

export type GroupedContent = {
    name: string;
    items: GroupedContentItem[];
};

export default function GroupedContentList({
    list,
    defaultValue,
    onSelectionChange,
}: {
    list: GroupedContent[];
    defaultValue?: number[];
    onSelectionChange: (groupIndex: number, itemIndex: number) => void;
}) {
    const listId = useId();

    const changeContent = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;

        const parts = raw.split("-");
        const groupIndex = parseInt(parts[0], 10);
        const itemIndex = parseInt(parts[1], 10);

        onSelectionChange(groupIndex, itemIndex);
    }, []);

    return (
        <div className="xellanix-grouped-content-list vertical-layout" onChange={changeContent}>
            {list.map((group, groupIndex) => (
                <div key={group.name}>
                    <h6>{group.name}</h6>
                    <ul>
                        {group.items.map((item, itemIndex) => (
                            <li key={item.name} className="wrapper-only">
                                <input
                                    type="radio"
                                    id={`xellanix-groupped-content-list-${listId}-${groupIndex}-${itemIndex}`}
                                    name={`xellanix-groupped-content-list-${listId}`}
                                    value={`${groupIndex}-${itemIndex}`}
                                    defaultChecked={groupIndex === defaultValue?.[0] && itemIndex === defaultValue?.[1]}
                                />
                                <label
                                    htmlFor={`xellanix-groupped-content-list-${listId}-${groupIndex}-${itemIndex}`}>
                                    {item.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
