import { ReactElement, createElement, ReactNode, useMemo } from "react";
import {
    ContentTypeEnum,
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
    ariaLabelSort: string;
    contentType: ContentTypeEnum;
    caption?: string;
    headerContent?: ReactNode;
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

const Sorting = (props: SortingProps): ReactElement => {
    const isCurrentlySorted = useMemo(
        () => props.attributeName === props.sortAttribute,
        [props.attributeName, props.sortAttribute]
    );
    const headerAriaLabel = useMemo(
        () =>
            props.displayStyle === "header"
                ? props.ariaLabelSort +
                  " " +
                  props.caption +
                  " " +
                  (isCurrentlySorted
                      ? props.sortAscending
                          ? props.ariaLabelDesc
                          : props.ariaLabelAsc
                      : props.sortAscending
                      ? props.ariaLabelAsc
                      : props.ariaLabelDesc)
                : undefined,
        [
            props.displayStyle,
            props.ariaLabelSort,
            props.caption,
            isCurrentlySorted,
            props.sortAscending,
            props.ariaLabelAsc,
            props.ariaLabelDesc
        ]
    );

    return (
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
                              event.preventDefault();
                              props.onClickHeader();
                          }
                      }
                    : undefined
            }
            aria-label={headerAriaLabel}
            role={props.displayStyle === "header" ? "button" : undefined}
        >
            {props.displayStyle === "header" && <Header {...props} isCurrentlySorted={isCurrentlySorted} />}
            {props.displayStyle === "dropdown" && <Dropdown {...props} />}
        </div>
    );
};

export default Sorting;
