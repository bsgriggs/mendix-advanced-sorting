import { ReactElement, createElement } from "react";
import { ValueStatus } from "mendix";
import { AdvancedSortingContainerProps } from "../typings/AdvancedSortingProps";
import "./ui/AdvancedSorting.css";
import { Header } from "./components/Header";
import { Dropdown } from "./components/Dropdown";

export function AdvancedSorting(props: AdvancedSortingContainerProps): ReactElement {
    const isCurrentlySorted = props.attributeName === props.sortAttribute.value;

    if (props.sortAscending.status === ValueStatus.Available && props.sortAttribute.status === ValueStatus.Available) {
        const handleClick = (): void => {
            if (isCurrentlySorted) {
                props.sortAscending.setValue(!props.sortAscending.value);
            } else {
                props.sortAttribute.setValue(props.attributeName);
            }
            props.refreshAction?.execute();
        };

        return (
            <div className="advanced-sorting" onClick={handleClick}>
                {props.displayStyle === "header" && (
                    <Header
                        headerContent={props.headerContent}
                        isCurrentlySorted={isCurrentlySorted}
                        sortAscending={props.sortAscending.value as boolean}
                        ascendingIcon={props.ascendingIcon}
                        descendingIcon={props.descendingIcon}
                    />
                )}
                {props.displayStyle === "dropdown" && (
                    <Dropdown
                        sortAttribute={props.sortAttribute.value as string}
                        dropdownValues={props.dropdownValues}
                        selectOption={(sortAttribute: string, setSortAscending: boolean, sortAscending: boolean) => {
                            props.sortAttribute.setValue(sortAttribute);
                            if (setSortAscending && props.sortAscending.value as boolean !== sortAscending){
                                props.sortAscending.setValue(sortAscending);
                            }
                            props.refreshAction?.execute();
                        }}
                    />
                )}
            </div>
        );
    } else {
        return <div className="advanced-sorting"></div>;
    }
}
