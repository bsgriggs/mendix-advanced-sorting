import { ReactElement, createElement, ChangeEvent, useEffect, useMemo, Fragment } from "react";
import DropdownValue from "../../../typings/DropdownValue";
import { WebIcon } from "mendix";
import { DropdownSortTypeEnum, ToggleAlignmentEnum } from "../../../typings/AdvancedSortingProps";
import ToggleButton from "./ToggleButton";

interface DropdownProps {
    id: string;
    name: string;
    ariaLabelSort: string;
    tabIndex: number;
    sortAttribute: string;
    sortAscending: boolean;
    ariaLabelAsc: string;
    ascendingIcon: WebIcon;
    ariaLabelDesc: string;
    descendingIcon: WebIcon;
    dropdownValues: DropdownValue[];
    onSelectDropdown: (sortAttribute: string, sortAscending: boolean) => void;
    dropdownSortType: DropdownSortTypeEnum;
    toggleAlignment: ToggleAlignmentEnum;
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

    const currentValue: DropdownValue | undefined = useMemo(
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

    const currentValueAriaLabel: string | undefined = useMemo(
        () =>
            currentValue
                ? `${props.ariaLabelSort} ${currentValue.caption} ${
                      props.sortAscending ? props.ariaLabelDesc : props.ariaLabelAsc
                  }`
                : undefined,
        [currentValue, props.ariaLabelSort, props.sortAscending, props.ariaLabelAsc, props.ariaLabelDesc]
    );

    return (
        <Fragment>
            {props.dropdownSortType === "TOGGLE" && props.toggleAlignment === "LEFT" && (
                <ToggleButton
                    tabIndex={props.tabIndex}
                    ariaLabel={currentValueAriaLabel}
                    ascendingIcon={props.ascendingIcon}
                    descendingIcon={props.descendingIcon}
                    sortAscending={props.sortAscending}
                    onClick={() => props.onSelectDropdown(currentValue.sortAttribute, !props.sortAscending)}
                />
            )}

            <select
                name={props.name}
                tabIndex={props.tabIndex}
                className="form-control"
                aria-haspopup="listbox"
                aria-labelledby={props.id + "-label"} // for screen readers
                aria-label={currentValueAriaLabel}
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
            {props.dropdownSortType === "TOGGLE" && props.toggleAlignment === "RIGHT" && (
                <ToggleButton
                    tabIndex={props.tabIndex}
                    ariaLabel={props.sortAscending ? props.ariaLabelAsc : props.ariaLabelDesc}
                    ascendingIcon={props.ascendingIcon}
                    descendingIcon={props.descendingIcon}
                    sortAscending={props.sortAscending}
                    onClick={() => props.onSelectDropdown(currentValue.sortAttribute, !props.sortAscending)}
                />
            )}
        </Fragment>
    );
};

export default Dropdown;
