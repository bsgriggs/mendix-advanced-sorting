import { ReactElement, createElement, ChangeEvent, useState, useEffect } from "react";
import { DropdownValuesType } from "typings/AdvancedSortingProps";

interface DropdownProps {
    dropdownValues: DropdownValuesType[];
    selectOption: (sortAttribute: string, sortAscending: boolean) => void;
}

export function Dropdown(props: DropdownProps): ReactElement {
    const handleOnSelect = (dropdownValue: DropdownValuesType): void => {
        setCurrentValue(dropdownValue);
        props.selectOption(dropdownValue.dropdownAttributeValue, dropdownValue.dropdownSortAscending === "true");
    };
    const defaultOption =
        props.dropdownValues.find(dropdownValue => dropdownValue.defaultOption.value === true) ||
        props.dropdownValues[0];
    useEffect(() => {
        handleOnSelect(defaultOption);
    }, [defaultOption]);

    const [currentValue, setCurrentValue] = useState<DropdownValuesType>(defaultOption);

    return (
        <select
            className="form-control"
            aria-haspopup="listbox"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const dropdownValue =
                    props.dropdownValues.find(
                        dropdownValue => dropdownValue.optionCaption.value === event.target.value
                    ) || props.dropdownValues[0];
                handleOnSelect(dropdownValue);
            }}
            value={currentValue?.optionCaption.value}
        >
            {props.dropdownValues.map((dropdownValue, index) => (
                <option
                    key={index}
                    value={dropdownValue.optionCaption.value}
                    aria-selected={dropdownValue.dropdownAttributeValue === currentValue?.dropdownAttributeValue}
                >
                    {dropdownValue.optionCaption.value}
                </option>
            ))}
        </select>
    );
}
