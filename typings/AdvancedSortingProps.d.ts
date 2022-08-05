/**
 * This file was generated from AdvancedSorting.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue, WebIcon } from "mendix";

export interface AdvancedSortingContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    headerContent: ReactNode;
    attributeName: string;
    ascendingIcon?: DynamicValue<WebIcon>;
    descendingIcon?: DynamicValue<WebIcon>;
    refreshAction?: ActionValue;
    sortAttribute: EditableValue<string>;
    sortAscending: EditableValue<boolean>;
}

export interface AdvancedSortingPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    headerContent: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    attributeName: string;
    ascendingIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    descendingIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    refreshAction: {} | null;
    sortAttribute: string;
    sortAscending: string;
}
