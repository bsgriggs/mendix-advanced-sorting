import { ReactElement, createElement, ReactNode } from "react";
import {
    DisplayStyleEnum,
    DropdownSortTypeEnum,
    HeaderAlignmentEnum,
    ToggleAlignmentEnum
} from "../../typings/AdvancedSortingProps";
import DropdownValue from "../../typings/DropdownValue";
import Header from "./sub-components/Header";
import Dropdown from "./sub-components/Dropdown";
import { WebIcon } from "mendix";
import classNames from "classnames";

interface SortingProps {
    id: string;
    name: string;
    tabIndex: number;

    sortAttribute: string;
    sortAscending: boolean;
    onClickHeader: () => void;
    onSelectDropdown: (newSortAttribute: string, newSortAscending: boolean) => void;
    ariaLabel: string;
    headerContent: ReactNode;
    displayStyle: DisplayStyleEnum;
    attributeName: string;
    headerAlignment: HeaderAlignmentEnum;
    dropdownValues: DropdownValue[];
    ariaLabelAsc: string;
    ascendingIcon: WebIcon;
    ariaLabelDesc: string;
    descendingIcon: WebIcon;
    dropdownSortType: DropdownSortTypeEnum;
    toggleAlignment: ToggleAlignmentEnum;
}

const Sorting = (props: SortingProps): ReactElement => (
    <div
        className={classNames(
            "advanced-sorting",
            `display-${props.displayStyle}`,
            { [props.headerAlignment]: props.displayStyle === "header" },
            {
                [`toggle-${props.toggleAlignment.toLocaleLowerCase()}`]: props.dropdownSortType === "TOGGLE"
            }
        )}
        tabIndex={props.displayStyle === "header" ? props.tabIndex : undefined}
        onClick={props.displayStyle === "header" ? props.onClickHeader : undefined}
        onKeyDown={
            props.displayStyle === "header"
                ? event => {
                      if (event.key === "Enter" || event.key === " ") {
                          props.onClickHeader();
                      }
                  }
                : undefined
        }
        aria-label={props.displayStyle === "header" ? props.ariaLabel : undefined}
        role={props.displayStyle === "header" ? "button" : undefined}
    >
        {props.displayStyle === "header" && (
            <Header {...props} isCurrentlySorted={props.attributeName === props.sortAttribute} />
        )}
        {props.displayStyle === "dropdown" && <Dropdown {...props} />}
    </div>
);

export default Sorting;
