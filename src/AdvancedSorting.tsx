import { ReactElement, createElement } from "react";
import { ValueStatus } from "mendix";
import { AdvancedSortingContainerProps } from "../typings/AdvancedSortingProps";
import "./ui/AdvancedSorting.css";
import { Header } from "./components/Header";

export function AdvancedSorting(props: AdvancedSortingContainerProps): ReactElement {
    const isCurrentlySorted = props.attributeName === props.sortAttribute.value

    if (
        props.sortAscending.status === ValueStatus.Available &&
        props.sortAttribute.status === ValueStatus.Available
    ) {
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
                <Header
                    headerContent={props.headerContent}
                    isCurrentlySorted={isCurrentlySorted}
                    sortAscending={props.sortAscending.value as boolean}
                    ascendingIcon={props.ascendingIcon}
                    descendingIcon={props.descendingIcon}
                />
            </div>
        );
    } else {
        return <div className="advanced-sorting"></div>;
    }
}
