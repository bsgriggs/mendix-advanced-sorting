import { ReactElement, createElement, useCallback, useMemo } from "react";
import { AdvancedSortingContainerProps } from "../typings/AdvancedSortingProps";
import "./ui/AdvancedSorting.scss";
import DropdownValue from "typings/DropdownValue";
import Sorting from "./components/Sorting";

export function AdvancedSorting(props: AdvancedSortingContainerProps): ReactElement {
    const dropdownList: DropdownValue[] = useMemo(() => {
        let newDropdownValues: DropdownValue[] = [];
        if (props.displayStyle === "dropdown") {
            if (props.dropdownSource === "static") {
                newDropdownValues = props.dropdownValues.map(dropdownValue => ({
                    caption: dropdownValue.optionCaption.value as string,
                    isDefault: dropdownValue.dropdownDefaultOption.value as boolean,
                    sortAttribute: dropdownValue.dropdownAttributeName.value as string,
                    sortAscending: dropdownValue.dropdownSortAscending === "true"
                }));
            } else {
                if (props.dynamicDatasource.items !== undefined) {
                    newDropdownValues = props.dynamicDatasource.items.map(dynamicValue => {
                        return {
                            caption: props.dynamicCaption.get(dynamicValue).value as string,
                            isDefault: props.dynamicDefaultOption.get(dynamicValue).value as boolean,
                            sortAttribute: props.dynamicAttributeName.get(dynamicValue).value as string,
                            sortAscending: props.dynamicSortAscending.get(dynamicValue).value as boolean
                        };
                    });
                }
            }
        }
        return newDropdownValues;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.dropdownValues, props.dynamicDatasource, props.sortAscending.status, props.sortAttribute.status]);

    const onClickHeader = useCallback((): void => {
        if (props.displayStyle === "header") {
            if (props.attributeName.value === props.sortAttribute.value) {
                props.sortAscending.setValue(!props.sortAscending.value);
            } else {
                props.sortAttribute.setValue(props.attributeName.value);
            }
            props.refreshAction?.execute();
        }
    }, [props.sortAscending, props.sortAttribute, props.refreshAction, props.attributeName]);

    const onSelectDropdown = useCallback(
        (newSortAttribute: string, newSortAscending: boolean): void => {
            if (props.sortAttribute.value !== newSortAttribute) {
                props.sortAttribute.setValue(newSortAttribute);
            }
            if ((props.sortAscending.value as boolean) !== newSortAscending) {
                props.sortAscending.setValue(newSortAscending);
            }
            props.refreshAction?.execute();
        },
        [props.sortAscending, props.sortAttribute, props.refreshAction]
    );

    return (
        <Sorting
            {...props}
            tabIndex={props.tabIndex || 0}
            dropdownValues={dropdownList}
            attributeName={props.attributeName?.value as string}
            onClickHeader={onClickHeader}
            onSelectDropdown={onSelectDropdown}
            ariaLabel={props.ariaLabel?.value as string}
            ascendingIcon={props.ascendingIcon?.value || { type: "glyph", iconClass: "glyphicon-arrow-up" }}
            descendingIcon={props.descendingIcon?.value || { type: "glyph", iconClass: "glyphicon-arrow-down" }}
            sortAttribute={props.sortAttribute.value as string}
            sortAscending={props.sortAscending.value as boolean}
        />
    );
}
