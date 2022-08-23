import { ReactElement, createElement, ChangeEvent, useState, useEffect } from "react";
import { DropdownValue } from "typings";

interface DropdownProps {
    dropdownValues: DropdownValue[];
    selectOption: (sortAttribute: string, sortAscending: boolean) => void;
}

export function Dropdown(props: DropdownProps): ReactElement {
    const handleOnSelect = (dropdownValue: DropdownValue): void => {
        setCurrentValue(dropdownValue);
        props.selectOption(dropdownValue.sortAttribute, dropdownValue.sortAscending);
    };
    const defaultOption =
        props.dropdownValues.find(dropdownValue => dropdownValue.isDefault) || props.dropdownValues[0];
    useEffect(() => {
        handleOnSelect(defaultOption);
    }, [defaultOption]);

    const [currentValue, setCurrentValue] = useState<DropdownValue>(defaultOption);

    return (
        <select
            className="form-control"
            aria-haspopup="listbox"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const dropdownValue =
                    props.dropdownValues.find(dropdownValue => dropdownValue.caption === event.target.value) ||
                    props.dropdownValues[0];
                handleOnSelect(dropdownValue);
            }}
            value={currentValue?.caption}
        >
            {props.dropdownValues.map((dropdownValue, index) => (
                <option
                    key={index}
                    value={dropdownValue.caption}
                    aria-selected={dropdownValue.caption === currentValue.caption}
                >
                    {dropdownValue.caption}
                </option>
            ))}
        </select>
    );
}
