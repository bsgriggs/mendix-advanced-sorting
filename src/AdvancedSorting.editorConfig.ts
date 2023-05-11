import { AdvancedSortingPreviewProps } from "../typings/AdvancedSortingProps";
import { hidePropertiesIn } from "./utils/PageEditorUtils";
// import { StructurePreviewProps, RowLayoutProps, ContainerProps, TextProps, DropZoneProps } from "./utils/PageEditor";

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

export function getProperties(_values: AdvancedSortingPreviewProps, defaultProperties: Properties): Properties {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    /* Example
    if (values.myProperty === "custom") {
        delete defaultProperties.properties.myOtherProperty;
    }
    */

    switch (_values.displayStyle) {
        case "header":
            hidePropertiesIn(defaultProperties, _values, ["dropdownValues", "dropdownSource"]);
            hidePropertiesIn(defaultProperties, _values, [
                "dynamicAttributeName",
                "dynamicCaption",
                "dynamicDatasource",
                "dynamicDefaultOption",
                "dynamicSortAscending"
            ]);
            break;
        case "dropdown":
            switch (_values.dropdownSource) {
                case "static":
                    hidePropertiesIn(defaultProperties, _values, [
                        "headerContent",
                        "attributeName",
                        "ascendingIcon",
                        "descendingIcon",
                        "headerAlignment"
                    ]);
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
                    hidePropertiesIn(defaultProperties, _values, [
                        "headerContent",
                        "attributeName",
                        "ascendingIcon",
                        "descendingIcon",
                        "headerAlignment"
                    ]);
                    break;
            }

            break;
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

// export function getPreview(values: AdvancedSortingPreviewProps, isDarkMode: boolean): StructurePreviewProps | null {
//     const titleHeader: RowLayoutProps = {
//         type: "RowLayout",
//         columnSize: "grow",
//         backgroundColor: isDarkMode ? "#4F4F4F" : "#F5F5F5",
//         borderWidth: 1,
//         children: [
//             {
//                 type: "Container",
//                 padding: 4,
//                 children: [
//                     {
//                         type: "Text",
//                         content: "Advanced Sorting",
//                         fontColor: isDarkMode ? "#DEDEDE" : "#6B707B"
//                     } as TextProps
//                 ]
//             }
//         ]
//     };
//     const messageContent = {
//         type: "RowLayout",
//         columnSize: "grow",
//         padding: 0,
//         children: [
//             {
//                 type: "Container",
//                 padding: 4,
//                 children: [
//                     {
//                         type: "Text",
//                         content: values.attributeName
//                             ? "Sorting: " + values.attributeName
//                             : "Enter the attribute's name",
//                         fontSize: values.attributeName ? 10 : undefined,
//                         fontColor: values.attributeName
//                             ? isDarkMode
//                                 ? "#DEDEDE"
//                                 : "#000000"
//                             : isDarkMode
//                             ? "#A4A4A4"
//                             : "#6B707B"
//                     }
//                 ]
//             }
//         ]
//     } as RowLayoutProps;
//     const headerContent = {
//         type: "DropZone",
//         property: values.headerContent,
//         placeholder: "Header Content",
//         grow: 1
//     } as DropZoneProps;
//     return {
//         type: "Container",
//         borders: true,
//         children: [titleHeader, messageContent, headerContent]
//     } as ContainerProps;
// }
