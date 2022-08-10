import{ ReactElement, createElement } from "react";
import { DropdownValuesType } from "typings/AdvancedSortingProps";

interface DropdownProps {
    sortAttribute: string;
    dropdownValues: DropdownValuesType[];
    selectOption: (sortAttribute: string, setSortAscending: boolean, sortAscending: boolean) => void;
}

export function Dropdown(props: DropdownProps): ReactElement {
    // const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const dropdownValue = props.dropdownValues.find(
    //         dropdownValue => dropdownValue.dropdownAttributeValue === event.target.value
    //     );
    //     console.log(dropdownValue);
    //     if (dropdownValue !== undefined) {
    //         props.selectOption(
    //             dropdownValue.dropdownAttributeValue,
    //             dropdownValue.setSortAscending,
    //             dropdownValue.dropdownSortAscending === "true"
    //         );
    //     }
    // };

    return (
        <select className="form-control" aria-haspopup="listbox" 
        // onSelect={handleSelect}
        >
            {props.dropdownValues.map((dropdownValue, index) => (
                <option
                    key={index}
                    value={dropdownValue.dropdownAttributeValue}
                    aria-selected={dropdownValue.dropdownAttributeValue === props.sortAttribute}
                    onClick={()=> {
                        props.selectOption(
                            dropdownValue.dropdownAttributeValue,
                            dropdownValue.setSortAscending,
                            dropdownValue.dropdownSortAscending === "true"
                        );
                    }}
                >
                    {dropdownValue.optionCaption.value}
                </option>
            ))}
        </select>
    );
}
