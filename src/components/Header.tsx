import { ReactElement, createElement, Fragment, ReactNode } from "react";
import MxIcon from "./MxIcon";
import { DynamicValue, WebIcon } from "mendix";

interface headerProps {
    headerContent: ReactNode;
    isCurrentlySorted: boolean;
    sortAscending: boolean;
    ascendingIcon?: DynamicValue<WebIcon>;
    descendingIcon?: DynamicValue<WebIcon>;
}

export function Header({
    headerContent,
    isCurrentlySorted,
    sortAscending,
    ascendingIcon,
    descendingIcon
}: headerProps): ReactElement {
    return (
        <Fragment>
            <span className={isCurrentlySorted ? "mx-text spacing-outer-right" : "mx-text"}>{headerContent}</span>
            {isCurrentlySorted && (
                <Fragment>
                    {sortAscending && (
                        <MxIcon
                            defaultIconClass="sort-by-attributes"
                            title="Sorting Ascending"
                            mxIconOverride={ascendingIcon}
                        />
                    )}
                    {sortAscending === false && (
                        <MxIcon
                            defaultIconClass="sort-by-attributes-alt"
                            title="Sorting Descending"
                            mxIconOverride={descendingIcon}
                        />
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}
