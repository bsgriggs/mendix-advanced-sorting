/* eslint-disable */
import { AdvancedSortingPreviewProps } from "../typings/AdvancedSortingProps";
import { hideNestedPropertiesIn, hidePropertiesIn, hidePropertyIn } from "@mendix/pluggable-widgets-tools";

export type Properties = PropertyGroup[];

export type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

export type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: { type: "glyph"; iconClass: string } | { type: "image"; imageUrl: string } | null; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    placeholder?: string;
    property: object; // widgets property object from Values API
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(_values: AdvancedSortingPreviewProps, defaultProperties: Properties): Properties {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    switch (_values.displayStyle) {
        case "header":
            hidePropertiesIn(defaultProperties, _values, [
                "dropdownValues",
                "dropdownSource",
                "dropdownSortType",
                "toggleAlignment"
            ]);
            hidePropertiesIn(defaultProperties, _values, [
                "dynamicAttributeName",
                "dynamicCaption",
                "dynamicDatasource",
                "dynamicDefaultOption",
                "dynamicSortAscending"
            ]);
            break;
        case "dropdown":
            hidePropertiesIn(defaultProperties, _values, [
                "headerContent",
                "attributeName",
                "headerAlignment",
                "contentType",
                "caption"
            ]);
            switch (_values.dropdownSource) {
                case "static":
                    hidePropertiesIn(defaultProperties, _values, [
                        "dynamicAttributeName",
                        "dynamicCaption",
                        "dynamicDatasource",
                        "dynamicDefaultOption",
                        "dynamicSortAscending"
                    ]);
                    break;
                case "dynamic":
                    hidePropertiesIn(defaultProperties, _values, ["dropdownValues"]);
                    break;
            }

            break;
    }

    if (_values.dropdownSortType === "TOGGLE") {
        hidePropertiesIn(defaultProperties, _values, ["dynamicSortAscending"]);
        for (let i = 0; i < _values.dropdownValues.length; i++) {
            hideNestedPropertiesIn(defaultProperties, _values, "dropdownValues", i, ["dropdownSortAscending"]);
        }
    }

    if (_values.displayStyle === "dropdown" && _values.dropdownSortType === "DATA") {
        hidePropertiesIn(defaultProperties, _values, ["ascendingIcon", "descendingIcon"]);
    }
    if (_values.contentType === "TEXT") {
        hidePropertyIn(defaultProperties, _values, "headerContent");
    }

    return defaultProperties;
}

export function check(_values: AdvancedSortingPreviewProps): Problem[] {
    const errors: Problem[] = [];
    if (_values.refreshAction === null) {
        errors.push({
            property: `refreshAction`,
            message: `Refresh action is required. Should be a Microflow with 'Refresh in Client' on the parent DataView's object`,
            url: "https://github.com/bsgriggs/mendix-advanced-sorting/blob/master/README.md"
        });
    }

    if (_values.dropdownValues.filter(dropdownValue => dropdownValue.dropdownDefaultOption === "true").length > 1) {
        errors.push({
            property: `dropdownValues`,
            message: `There can only be 1 dropdown value as the default option`,
            url: "https://github.com/bsgriggs/mendix-advanced-sorting/blob/master/README.md"
        });
    }

    return errors;
}

export function getPreview(_values: AdvancedSortingPreviewProps, isDarkMode: boolean): PreviewProps | null {
    const mainContent: PreviewProps = {
        type: "RowLayout",
        columnSize: "grow",
        backgroundColor: _values.readOnly ? (isDarkMode ? "#505050" : "#D3D3D3") : isDarkMode ? "#252525" : "#FFFFFF",
        borders: true,
        borderWidth: 1,
        borderRadius: 1,
        children: [
            {
                type: "Container",
                padding: 4,
                grow: 0,
                children: [
                    {
                        type: "Image",
                        width: 20,
                        height: 20,
                        data: "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHPSURBVHgB7dq9LkVBEMDxOQchuUEUKHQ6hZoH0HsLnUInHkB0ilt6CXq9R6C6nYLGV24i4uvOJiuHSHbOYe7szsy/OJZuJydn95eoPkaB4Sbj4vrmDfaP7+Fy8AJPQ70z2dqcgYOdeVhZngi/V/gG4Oa3d29Vb7zZXK+G0/5iGEKNfzg8eTCzeexx+D562+/COgzg/OIZrHU1eA0/azAavgWY2QHEwgBmexVYLQxgbXUKrIXHIRYGcLS3YOotwL3iXQALA8Dz8Ky/9DUVreHGN9anw16/XYTAcH4KgPHUYOgncqipwlATOdRUYaiJHGrqMBSRQ03dRzAih5ofg/hwDCnCUNvrvCoMNZFDTQWGfkMONccQGM8xFBe5YqgrcqgVgaEuyKFWBIa6IIdaMRhqixxqxXwE2yKHmh+D+HAMFYAhrmt6ERjqghxqWWPoL8ih5hgC4zmG4mLcGOJGDjVRDHEih5oohjiRQ00cQ1zIoSb+EeRCDjU/BvHhGBLEkPT1WxRDnMihJoKhcSCHmmMIjOcYiov/xlAu2EnFiqEcsJOKFUM5YCcVO4aksZOK/SMojZ1UfgziwzHEiKHc//GKFUM5YCcVC4Zywk4q8xj6BCB7ExeOPQjdAAAAAElFTkSuQmCC"
                    }
                ]
            },
            {
                type: "RowLayout",
                padding: 4,
                columnSize: "grow",
                grow: 1,
                children: [
                    {
                        type: "Text",
                        fontColor: isDarkMode ? "#579BF9" : "#146FF4",
                        content:
                            _values.displayStyle === "header"
                                ? _values.caption
                                : _values.dropdownSource === "static"
                                ? "Static Dropdown"
                                : _values.dynamicCaption
                    }
                ]
            }
        ]
    };
    const headerContent: PreviewProps = {
        type: "RowLayout",
        columnSize: "fixed",
        borders: true,
        children: [
            {
                type: "DropZone",
                property: _values.headerContent,
                placeholder: "Place your custom header content here"
            }
        ]
    };

    return {
        type: "Container",
        children: [mainContent, ...(_values.contentType === "CUSTOM" ? [headerContent] : [])]
    };
}
