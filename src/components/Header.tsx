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

export function Header(props: headerProps): ReactElement {
    return (
        <Fragment>
            <span className="mx-text">{props.headerContent}</span>
            {props.isCurrentlySorted && (
                <Fragment>
                    {props.sortAscending && (
                        <MxIcon
                            defaultIconClass="sort-by-attributes"
                            title="Sorting Ascending"
                            mxIconOverride={props.ascendingIcon}
                        />
                    )}
                    {props.sortAscending === false && (
                        <MxIcon
                            defaultIconClass="sort-by-attributes-alt"
                            title="Sorting Descending"
                            mxIconOverride={props.descendingIcon}
                        />
                    )}
                </Fragment>
            )}
        </Fragment>
    );
}
