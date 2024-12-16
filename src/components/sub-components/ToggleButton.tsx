import { ReactElement, createElement } from "react";
import { Icon } from "mendix/components/web/Icon";
import { WebIcon } from "mendix";

interface ToggleButtonProps {
    ariaLabel: string | undefined;
    tabIndex: number;
    sortAscending: boolean;
    ascendingIcon: WebIcon;
    descendingIcon: WebIcon;
    onClick: () => void;
}

const ToggleButton = (props: ToggleButtonProps): ReactElement => (
    <button
        className="btn mx-button btn-default"
        onClick={props.onClick}
        title={props.ariaLabel}
        aria-label={props.ariaLabel}
    >
        {props.sortAscending ? (
            // @ts-ignore
            <Icon icon={props.ascendingIcon} />
        ) : (
            // @ts-ignore
            props.sortAscending === false && <Icon icon={props.descendingIcon} />
        )}
    </button>
);

export default ToggleButton;
