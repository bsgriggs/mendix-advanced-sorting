import { ReactElement, createElement, ChangeEvent, useEffect, useMemo, useCallback } from "react";
import DropdownValue from "typings/DropdownValue";

interface DropdownProps {
    id: string;
    name: string;
    ariaLabel?: string;
    tabIndex: number;
    sortAttribute: string;
    sortAscending: boolean;
    dropdownValues: DropdownValue[];
    onSelectDropdown: (sortAttribute: string, sortAscending: boolean) => void;
}

const Dropdown = (props: DropdownProps): ReactElement => {
    const handleOnSelect = useCallback(
        (dropdownValue: DropdownValue): void =>
            props.onSelectDropdown(dropdownValue.sortAttribute, dropdownValue.sortAscending),
        [props.onSelectDropdown]
    );

    const defaultOption: DropdownValue = useMemo(
        () => props.dropdownValues.find(dropdownValue => dropdownValue.isDefault) || props.dropdownValues[0],
        [props.dropdownValues]
    );

    // Handle selecting the default
    useEffect(() => {
        if (defaultOption) {
            handleOnSelect(defaultOption);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultOption]);

    const currentValue: DropdownValue = useMemo(
        () =>
            props.dropdownValues.find(
                dropdownValue =>
                    dropdownValue.sortAscending === props.sortAscending &&
                    dropdownValue.sortAttribute === props.sortAttribute
            ) || props.dropdownValues[0],
        [props.dropdownValues, props.sortAscending, props.sortAttribute]
    );

    return (
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
                handleOnSelect(dropdownValue);
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
    );
};

export default Dropdown;
