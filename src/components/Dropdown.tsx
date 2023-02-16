import { ReactElement, createElement, ChangeEvent, useState, useEffect } from "react";
import { DropdownValue } from "typings";

interface DropdownProps {
    dropdownValues: DropdownValue[];
    selectOption: (sortAttribute: string, sortAscending: boolean) => void;
}

export function Dropdown({ dropdownValues, selectOption }: DropdownProps): ReactElement {
    const handleOnSelect = (dropdownValue: DropdownValue): void => {
        setCurrentValue(dropdownValue);
        selectOption(dropdownValue.sortAttribute, dropdownValue.sortAscending);
    };
    const defaultOption = dropdownValues.find(dropdownValue => dropdownValue.isDefault) || dropdownValues[0];
    useEffect(() => {
        if (defaultOption) {
            handleOnSelect(defaultOption);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultOption]);
    const [currentValue, setCurrentValue] = useState<DropdownValue>(defaultOption);

    return (
        <select
            className="form-control"
            aria-haspopup="listbox"
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                const dropdownValue =
                    dropdownValues.find(dropdownValue => dropdownValue.caption === event.target.value) ||
                    dropdownValues[0];
                handleOnSelect(dropdownValue);
            }}
            value={currentValue?.caption}
        >
            {dropdownValues.map((dropdownValue, index) => (
                <option
                    key={index}
                    value={dropdownValue.caption}
                    aria-selected={dropdownValue.caption === currentValue?.caption}
                >
                    {dropdownValue.caption}
                </option>
            ))}
        </select>
    );
}
