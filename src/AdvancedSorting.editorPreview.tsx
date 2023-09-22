/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createElement } from "react";
import { AdvancedSortingPreviewProps } from "../typings/AdvancedSortingProps";
import Sorting from "./components/Sorting";
import DropdownValue from "../typings/DropdownValue";
import { WebIcon } from "mendix";

export const preview = (props: AdvancedSortingPreviewProps): ReactNode => {
    const dropdownList: DropdownValue[] =
        props.displayStyle === "dropdown"
            ? props.dropdownSource === "static"
                ? props.dropdownValues.map(dropdownValue => ({
                      caption: dropdownValue.optionCaption,
                      isDefault: true,
                      sortAttribute: dropdownValue.dropdownAttributeName,
                      sortAscending: dropdownValue.dropdownSortAscending === "true"
                  }))
                : [
                      {
                          caption: props.dynamicAttributeName,
                          isDefault: true,
                          sortAscending: true,
                          sortAttribute: ""
                      }
                  ]
            : [];

    return (
        <Sorting
            {...props}
            id=""
            name=""
            tabIndex={0}
            dropdownValues={dropdownList}
            attributeName={props.attributeName}
            onClickHeader={() => {}}
            onSelectDropdown={() => {}}
            ariaLabel={props.ariaLabel}
            ascendingIcon={
                props.ascendingIcon !== null
                    ? (props.ascendingIcon as WebIcon)
                    : { type: "glyph", iconClass: "glyphicon-arrow-up" }
            }
            descendingIcon={
                props.descendingIcon !== null
                    ? (props.descendingIcon as WebIcon)
                    : { type: "glyph", iconClass: "glyphicon-arrow-down" }
            }
            sortAttribute={props.attributeName}
            sortAscending={Boolean(Math.round(Math.random()))}
            headerContent={
                // @ts-ignore
                <props.headerContent.renderer caption="Place header content here">
                    <div style={{ width: "100%" }} />
                </props.headerContent.renderer>
            }
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/AdvancedSorting.scss");
}
