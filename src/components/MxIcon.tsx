import { createElement, ReactElement } from "react";
import { Icon } from "mendix/components/web/Icon";
import { DynamicValue, WebIcon } from "mendix";

interface IconProps {
    title: string;
    defaultIconClass: string;
    mxIconOverride?: DynamicValue<WebIcon>;
}

const MxIcon = (props: IconProps): ReactElement =>
    props.mxIconOverride !== undefined ? (
        <div title={props.title}>
            <Icon icon={props.mxIconOverride.value} altText={props.title} />
        </div>
    ) : (
        <span className={"glyphicon glyphicon-" + props.defaultIconClass} aria-hidden="true"  title={props.title} />
    );

export default MxIcon;