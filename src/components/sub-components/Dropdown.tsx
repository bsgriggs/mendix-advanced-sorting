import { ReactElement, createElement, ChangeEvent, useEffect, useMemo, Fragment } from "react";
import DropdownValue from "../../../typings/DropdownValue";
import { Icon } from "mendix/components/web/Icon";
import { WebIcon } from "mendix";
import { DropdownSortTypeEnum } from "typings/AdvancedSortingProps";

interface DropdownProps {
    id: string;
    name: string;
    ariaLabel?: string;
    tabIndex: number;
    sortAttribute: string;
    sortAscending: boolean;
    ascendingIcon: WebIcon;
    descendingIcon: WebIcon;
    dropdownValues: DropdownValue[];
    onSelectDropdown: (sortAttribute: string, sortAscending: boolean) => void;
    dropdownSortType: DropdownSortTypeEnum;
}

const Dropdown = (props: DropdownProps): ReactElement => {
    const defaultOption: DropdownValue = useMemo(
        () => props.dropdownValues.find(dropdownValue => dropdownValue.isDefault) || props.dropdownValues[0],
        [props.dropdownValues]
    );

    // Handle selecting the default
    useEffect(() => {
        if (defaultOption) {
            props.onSelectDropdown(
                defaultOption.sortAttribute,
                props.dropdownSortType === "DATA" ? defaultOption.sortAscending : props.sortAscending
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultOption]);

    const currentValue: DropdownValue = useMemo(
        () =>
            props.dropdownSortType === "DATA"
                ? props.dropdownValues.find(
                      dropdownValue =>
                          dropdownValue.sortAscending === props.sortAscending &&
                          dropdownValue.sortAttribute === props.sortAttribute
                  ) || props.dropdownValues[0]
                : props.dropdownValues.find(dropdownValue => dropdownValue.sortAttribute === props.sortAttribute) ||
                  props.dropdownValues[0],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.dropdownValues, props.sortAscending, props.sortAttribute]
    );
    return (
        <Fragment>
            {props.dropdownSortType === "TOGGLE" && (
                <button
                    className="btn mx-button mx-name-actionButton29 btn-default"
                    onClick={() => props.onSelectDropdown(currentValue.sortAttribute, !props.sortAscending)}
                >
                    {props.sortAscending && <Icon icon={props.ascendingIcon} />}
                    {props.sortAscending === false && <Icon icon={props.descendingIcon} />}
                </button>
            )}

            <select
                name={props.name}
                tabIndex={props.tabIndex}
                className="form-control"
                aria-haspopup="listbox"
                aria-labelledby={props.id + "-label"} // for screen readers
                aria-label={props.ariaLabel}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    const dropdownValue =
                        props.dropdownValues.find(dropdownValue => dropdownValue.caption === event.target.value) ||
                        props.dropdownValues[0];
                    props.onSelectDropdown(
                        dropdownValue.sortAttribute,
                        props.dropdownSortType === "DATA" ? dropdownValue.sortAscending : props.sortAscending
                    );
                }}
                value={currentValue?.caption}
            >
                {props.dropdownValues.map(dropdownValue => (
                    <option
                        key={dropdownValue.caption}
                        value={dropdownValue.caption}
                        aria-selected={dropdownValue.caption === currentValue?.caption}
                    >
                        {dropdownValue.caption}
                    </option>
                ))}
            </select>
        </Fragment>
    );
};

export default Dropdown;
