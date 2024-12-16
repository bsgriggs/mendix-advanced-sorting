/**
 * This file was generated from AdvancedSorting.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, ListValue, ListAttributeValue, WebIcon } from "mendix";

export type DisplayStyleEnum = "header" | "dropdown";

export type DropdownSortTypeEnum = "DATA" | "TOGGLE";

export type ContentTypeEnum = "TEXT" | "CUSTOM";

export type DropdownSourceEnum = "static" | "dynamic";

export type DropdownSortAscendingEnum = "true" | "false";

export interface DropdownValuesType {
    optionCaption: DynamicValue<string>;
    dropdownDefaultOption: DynamicValue<boolean>;
    dropdownAttributeName: DynamicValue<string>;
    dropdownSortAscending: DropdownSortAscendingEnum;
}

export type HeaderAlignmentEnum = "left" | "middle" | "right";

export type ToggleAlignmentEnum = "LEFT" | "RIGHT";

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
    contentType: ContentTypeEnum;
    caption: DynamicValue<string>;
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
    ariaLabelSort: DynamicValue<string>;
    ariaLabelAsc: DynamicValue<string>;
    ariaLabelDesc: DynamicValue<string>;
    ascendingIcon?: DynamicValue<WebIcon>;
    descendingIcon?: DynamicValue<WebIcon>;
    toggleAlignment: ToggleAlignmentEnum;
}

export interface AdvancedSortingPreviewProps {
    readOnly: boolean;
    sortAttribute: string;
    sortAscending: string;
    refreshAction: {} | null;
    displayStyle: DisplayStyleEnum;
    dropdownSortType: DropdownSortTypeEnum;
    contentType: ContentTypeEnum;
    caption: string;
    attributeName: string;
    headerContent: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    dropdownSource: DropdownSourceEnum;
    dropdownValues: DropdownValuesPreviewType[];
    dynamicDatasource: {} | { caption: string } | { type: string } | null;
    dynamicCaption: string;
    dynamicDefaultOption: string;
    dynamicAttributeName: string;
    dynamicSortAscending: string;
    headerAlignment: HeaderAlignmentEnum;
    ariaLabelSort: string;
    ariaLabelAsc: string;
    ariaLabelDesc: string;
    ascendingIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    descendingIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; iconUrl: string; } | { type: "icon"; iconClass: string; } | undefined;
    toggleAlignment: ToggleAlignmentEnum;
}
