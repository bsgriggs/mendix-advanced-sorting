import { createElement, ReactElement } from "react";
import { Header } from "./components/Header";
import { AdvancedSortingPreviewProps } from "../typings/AdvancedSortingProps";
import { Dropdown } from "./components/Dropdown";
import { ValueStatus } from "mendix";

export const preview = (props: AdvancedSortingPreviewProps): ReactElement => {
    if (props.displayStyle === "header") {
        return <Header headerContent={props.headerContent} isCurrentlySorted={true} sortAscending={true} />;
    } else {
        return (
            <Dropdown
                sortAttribute={"option2"}
                dropdownValues={[
                    {
                        dropdownAttributeValue: "option1",
                        optionCaption: { value: "option1", status: ValueStatus.Available },
                        dropdownSortAscending: "true",
                        setSortAscending:true
                    },
                    {
                        dropdownAttributeValue: "option2",
                        optionCaption: { value: "option2", status: ValueStatus.Available },
                        dropdownSortAscending: "true",
                        setSortAscending:true
                    },
                    {
                        dropdownAttributeValue: "option3",
                        optionCaption: { value: "option3", status: ValueStatus.Available },
                        dropdownSortAscending: "true",
                        setSortAscending:true
                    }
                ]}
                selectOption={()=>{}}
            />
        );
    }
};

export function getPreviewCss(): string {
    return require("./ui/AdvancedSorting.css");
}
