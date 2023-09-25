/**
 * This file was generated from AdvancedSorting.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue, WebIcon } from "mendix";

export type DisplayStyleEnum = "header" | "dropdown";

export type DropdownSortTypeEnum = "DATA" | "TOGGLE";

export type DropdownSourceEnum = "static" | "dynamic";

export type DropdownSortAscendingEnum = "true" | "false";

export interface DropdownValuesType {
    optionCaption: DynamicValue<string>;
    dropdownDefaultOption: DynamicValue<boolean>;
    dropdownAttributeName: DynamicValue<string>;
    dropdownSortAscending: DropdownSortAscendingEnum;
}

export type HeaderAlignmentEnum = "left" | "middle" | "right";

export interface DropdownValuesPreviewType {
    optionCaption: string;
    dropdownDefaultOption: string;
    dropdownAttributeName: string;
    dropdownSortAscending: DropdownSortAscendingEnum;
}

export interface AdvancedSortingContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    sortAttribute: EditableValue<string>;
    sortAscending: EditableValue<boolean>;
    refreshAction?: ActionValue;
    displayStyle: DisplayStyleEnum;
    dropdownSortType: DropdownSortTypeEnum;
    attributeName: DynamicValue<string>;
    headerContent: ReactNode;
    dropdownSource: DropdownSourceEnum;
    dropdownValues: DropdownValuesType[];
    dynamicDatasource: ListValue;
    dynamicCaption: ListAttributeValue<string>;
    dynamicDefaultOption: ListAttributeValue<boolean>;
    dynamicAttributeName: ListAttributeValue<string>;
    dynamicSortAscending: ListAttributeValue<boolean>;
    headerAlignment: HeaderAlignmentEnum;
    ariaLabel?: DynamicValue<string>;
    ascendingIcon?: DynamicValue<WebIcon>;
    descendingIcon?: DynamicValue<WebIcon>;
}

export interface AdvancedSortingPreviewProps {
    readOnly: boolean;
    sortAttribute: string;
    sortAscending: string;
    refreshAction: {} | null;
    displayStyle: DisplayStyleEnum;
    dropdownSortType: DropdownSortTypeEnum;
    attributeName: string;
    headerContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    dropdownSource: DropdownSourceEnum;
    dropdownValues: DropdownValuesPreviewType[];
    dynamicDatasource: {} | { type: string } | null;
    dynamicCaption: string;
    dynamicDefaultOption: string;
    dynamicAttributeName: string;
    dynamicSortAscending: string;
    headerAlignment: HeaderAlignmentEnum;
    ariaLabel: string;
    ascendingIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    descendingIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
}
