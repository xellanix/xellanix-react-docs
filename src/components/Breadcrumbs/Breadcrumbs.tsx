import "./Breadcrumbs.css";

const isLast = (index: number, crumbs: string[]) => index === crumbs.length - 1;

export function Breadcrumbs({ crumbs }: { crumbs: string[] }) {
    return (
        <div className="xellanix-breadcrumbs horizontal-layout flex-align-middle flex-self-left crumbs-gap">
            {crumbs.map((crumb, index) => (
                <div key={index} className="horizontal-layout flex-align-middle crumbs-gap">
                    <span className={`${isLast(index, crumbs) ? "last" : ""}`}>{crumb}</span>
                    {!isLast(index, crumbs) && (
                        <div className="xellanix-breadcrumbs-separator">
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
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
