import { createElement, ReactElement } from "react";
import { Header } from "./components/Header";
import { AdvancedSortingPreviewProps } from "../typings/AdvancedSortingProps";

export const preview = (props: AdvancedSortingPreviewProps): ReactElement => {
    return (
        <Header
            headerContent={props.headerContent}
            isCurrentlySorted={true}
            sortAscending={true}
        />
    );
};

export function getPreviewCss(): string {
    return require("./ui/AdvancedSorting.css");
}