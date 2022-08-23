import { ReactElement, createElement, useState } from "react";
import { ValueStatus } from "mendix";
import { AdvancedSortingContainerProps } from "../typings/AdvancedSortingProps";
import "./ui/AdvancedSorting.css";
import { DropdownValue } from "typings";
import { Header } from "./components/Header";
import { Dropdown } from "./components/Dropdown";

export function AdvancedSorting(props: AdvancedSortingContainerProps): ReactElement {
    if (
        props.sortAscending.status === ValueStatus.Available &&
        props.sortAttribute.status === ValueStatus.Available &&
        (props.dropdownSource !== "dynamic" || props.dynamicDatasource.status === ValueStatus.Available)
    ) {
        const [dropdownValues] = useState(() => {
            let dropdownValues: DropdownValue[] = [];
            switch (props.dropdownSource) {
                case "static":
                    dropdownValues = props.dropdownValues.map(dropdownValue => {
                        return {
                            caption: dropdownValue.optionCaption.value as string,
                            isDefault: dropdownValue.dropdownDefaultOption.value as boolean,
                            sortAttribute: dropdownValue.dropdownAttributeName,
                            sortAscending: dropdownValue.dropdownSortAscending === "true"
                        };
                    });
                    break;
                case "dynamic":
                    if (props.dynamicDatasource.items !== undefined) {
                        dropdownValues = props.dynamicDatasource.items.map(dynamicValue => {
                            return {
                                caption: props.dynamicCaption.get(dynamicValue).value as string,
                                isDefault: props.dynamicDefaultOption.get(dynamicValue).value as boolean,
                                sortAttribute: props.dynamicAttributeName.get(dynamicValue).value as string,
                                sortAscending: props.dynamicSortAscending.get(dynamicValue).value as boolean
                            };
                        });
                    }
                    break;
            }
            return dropdownValues;
        });

        return (
            <div
                className={props.displayStyle === "header" ? "advanced-sorting-header" : "advanced-sorting-dropdown"}
                onClick={
                    props.displayStyle === "header"
                        ? (): void => {
                              if (props.attributeName === props.sortAttribute.value) {
                                  props.sortAscending.setValue(!props.sortAscending.value);
                              } else {
                                  props.sortAttribute.setValue(props.attributeName);
                              }
                              props.refreshAction?.execute();
                          }
                        : undefined
                }
            >
                {props.displayStyle === "header" && (
                    <Header
                        headerContent={props.headerContent}
                        isCurrentlySorted={props.attributeName === props.sortAttribute.value}
                        sortAscending={props.sortAscending.value as boolean}
                        ascendingIcon={props.ascendingIcon}
                        descendingIcon={props.descendingIcon}
                    />
                )}
                {props.displayStyle === "dropdown" && (
                    <Dropdown
                        dropdownValues={dropdownValues}
                        selectOption={(sortAttribute: string, sortAscending: boolean): void => {
                            if (props.sortAttribute.value !== sortAttribute) {
                                props.sortAttribute.setValue(sortAttribute);
                            }
                            if ((props.sortAscending.value as boolean) !== sortAscending) {
                                props.sortAscending.setValue(sortAscending);
                            }
                            props.refreshAction?.execute();
                        }}
                    />
                )}
            </div>
        );
    } else {
        return <div className="advanced-sorting"></div>;
    }
}
