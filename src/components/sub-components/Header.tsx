import { ReactElement, createElement, Fragment, ReactNode } from "react";
import { Icon } from "mendix/components/web/Icon";
import { WebIcon } from "mendix";
import classNames from "classnames";
import { ContentTypeEnum } from "typings/AdvancedSortingProps";

interface headerProps {
    contentType: ContentTypeEnum;
    caption?: string;
    headerContent?: ReactNode;
    isCurrentlySorted: boolean;
    sortAscending: boolean;
    ascendingIcon: WebIcon;
    descendingIcon: WebIcon;
}

const Header = (props: headerProps): ReactElement => (
    <Fragment>
        <span className={classNames("mx-text", { "spacing-outer-right": props.isCurrentlySorted })}>
            {props.contentType === "TEXT" ? props.caption : props.headerContent}
        </span>
        {props.isCurrentlySorted && (
            <Fragment>
                {props.sortAscending ? <Icon icon={props.ascendingIcon} /> : <Icon icon={props.descendingIcon} />}
            </Fragment>
        )}
    </Fragment>
);

export default Header;
