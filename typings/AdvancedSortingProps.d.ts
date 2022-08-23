/**
 * This file was generated from AdvancedSorting.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";

export type DisplayStyleEnum = "header" | "dropdown";

export type DropdownSortAscendingEnum = "true" | "false";

export interface DropdownValuesType {
    optionCaption: DynamicValue<string>;
    defaultOption: DynamicValue<boolean>;
    dropdownAttributeValue: string;
    dropdownSortAscending: DropdownSortAscendingEnum;
}

export interface DropdownValuesPreviewType {
    optionCaption: string;
    defaultOption: string;
    dropdownAttributeValue: string;
    dropdownSortAscending: DropdownSortAscendingEnum;
}

export interface AdvancedSortingContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    headerContent: ReactNode;
    attributeName: string;
    displayStyle: DisplayStyleEnum;
    dropdownValues: DropdownValuesType[];
    ascendingIcon?: DynamicValue<WebIcon>;
    descendingIcon?: DynamicValue<WebIcon>;
    refreshAction?: ActionValue;
    sortAttribute: EditableValue<string>;
    sortAscending: EditableValue<boolean>;
}

export interface AdvancedSortingPreviewProps {
    readOnly: boolean;
    headerContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    attributeName: string;
    displayStyle: DisplayStyleEnum;
    dropdownValues: DropdownValuesPreviewType[];
    ascendingIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    descendingIcon: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null;
    refreshAction: {} | null;
    sortAttribute: string;
    sortAscending: string;
}
