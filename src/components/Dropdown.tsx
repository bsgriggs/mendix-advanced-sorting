import{ ReactElement, createElement } from "react";
import { DropdownValuesType } from "typings/AdvancedSortingProps";

interface DropdownProps {
    sortAttribute: string;
    dropdownValues: DropdownValuesType[];
    selectOption: (sortAttribute: string, setSortAscending: boolean, sortAscending: boolean) => void;
}

export function Dropdown(props: DropdownProps): ReactElement {
    return (
        <select className="form-control" aria-haspopup="listbox" 
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            const dropdownValue = props.dropdownValues.find(
                dropdownValue => dropdownValue.optionCaption.value === event.target.value
            );
            console.log("on change dropdown value",dropdownValue);
            if (dropdownValue !== undefined) {
                props.selectOption(
                    dropdownValue.dropdownAttributeValue,
                    dropdownValue.setSortAscending,
                    dropdownValue.dropdownSortAscending === "true"
                );
            }
        }}
        >
            {props.dropdownValues.map((dropdownValue, index) => (
                <option
                    key={index}
                    value={dropdownValue.optionCaption.value}
                    aria-selected={dropdownValue.dropdownAttributeValue === props.sortAttribute}
                >
                    {dropdownValue.optionCaption.value}
                </option>
            ))}
        </select>
    );
}
