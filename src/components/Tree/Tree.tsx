import { useCallback, useState } from "react";
import "./Tree.css";

export type TreeNode = {
    name: string;
    onSelected?: (name: string) => void;
    children?: TreeNode[];
};

const hasChildren = (node: TreeNode) => node.children && node.children.length > 0;

function NodeComponent({ node, isRoot = false }: { node: TreeNode; isRoot?: boolean }) {
    const [expanded, setExpanded] = useState(isRoot);

    const toggle = useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        setExpanded((prev) => !prev);
    }, []);

    return (
        <div className="xellanix-tree vertical-layout flex-no-gap">
            <div
                className="xellanix-tree-node horizontal-layout flex-no-gap flex-align-middle"
                onClick={() => node.onSelected?.(node.name)}>
                {hasChildren(node) && (
                    <button
                        tabIndex={-1}
                        className={`xellanix-tree-expander button icon no-border${
                            expanded ? " expanded" : ""
                        }`}
                        onClick={toggle}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--text-color)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 6l6 6l-6 6" />
                        </svg>
                    </button>
                )}

                <span className={`${hasChildren(node) ? "" : "leaf"} xellanix-tree-label`}>
                    {node.name}
                </span>
            </div>

            {hasChildren(node) && expanded && (
                <div className="xellanix-tree-children vertical-layout flex-no-gap">
                    {node.children?.map((node, index) => (
                        <NodeComponent key={index} node={node} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Tree({ treeNodes }: { treeNodes: React.RefObject<TreeNode> }) {
    const current = treeNodes.current;
    return current && <NodeComponent node={current} isRoot={true} />;
}
