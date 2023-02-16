import { ReactElement, createElement, useState, useEffect } from "react";
import { ValueStatus } from "mendix";
import { AdvancedSortingContainerProps } from "../typings/AdvancedSortingProps";
import "./ui/AdvancedSorting.css";
import { DropdownValue } from "typings";
import { Header } from "./components/Header";
import { Dropdown } from "./components/Dropdown";

export function AdvancedSorting({
    attributeName,
    displayStyle,
    dropdownSource,
    dropdownValues,
    dynamicAttributeName,
    dynamicCaption,
    dynamicDatasource,
    dynamicDefaultOption,
    dynamicSortAscending,
    headerContent,
    name,
    sortAscending,
    sortAttribute,
    ascendingIcon,
    descendingIcon,
    refreshAction
}: AdvancedSortingContainerProps): ReactElement {
    const [dropdownList, setDropdownList] = useState<DropdownValue[]>([]);
    if (displayStyle === "dropdown"){
        
        useEffect(() => {
            if (
                sortAscending.status === ValueStatus.Available &&
                sortAttribute.status === ValueStatus.Available &&
                (dropdownSource !== "dynamic" || dynamicDatasource.status === ValueStatus.Available)
            ) {
                let newDropdownValues: DropdownValue[] = [];
                switch (dropdownSource) {
                    case "static":
                        newDropdownValues = dropdownValues.map(dropdownValue => {
                            return {
                                caption: dropdownValue.optionCaption.value as string,
                                isDefault: dropdownValue.dropdownDefaultOption.value as boolean,
                                sortAttribute: dropdownValue.dropdownAttributeName,
                                sortAscending: dropdownValue.dropdownSortAscending === "true"
                            };
                        });
                        break;
                    case "dynamic":
                        if (dynamicDatasource.items !== undefined) {
                            newDropdownValues = dynamicDatasource.items.map(dynamicValue => {
                                return {
                                    caption: dynamicCaption.get(dynamicValue).value as string,
                                    isDefault: dynamicDefaultOption.get(dynamicValue).value as boolean,
                                    sortAttribute: dynamicAttributeName.get(dynamicValue).value as string,
                                    sortAscending: dynamicSortAscending.get(dynamicValue).value as boolean
                                };
                            });
                        }
                        break;
                }
                setDropdownList(newDropdownValues);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dropdownValues, dynamicDatasource]);
    }

    return (
        <div
            id={name}
            className={displayStyle === "header" ? "advanced-sorting-header" : "advanced-sorting-dropdown"}
            onClick={
                displayStyle === "header"
                    ? (): void => {
                          if (attributeName === sortAttribute.value) {
                              sortAscending.setValue(!sortAscending.value);
                          } else {
                              sortAttribute.setValue(attributeName);
                          }
                          refreshAction?.execute();
                      }
                    : undefined
            }
        >
            {displayStyle === "header" && (
                <Header
                    headerContent={headerContent}
                    isCurrentlySorted={attributeName === sortAttribute.value}
                    sortAscending={sortAscending.value as boolean}
                    ascendingIcon={ascendingIcon}
                    descendingIcon={descendingIcon}
                />
            )}
            {displayStyle === "dropdown" && (
                <Dropdown
                    dropdownValues={dropdownList}
                    selectOption={(newSortAttribute: string, newSortAscending: boolean): void => {
                        if (sortAttribute.value !== newSortAttribute) {
                            sortAttribute.setValue(newSortAttribute);
                        }
                        if ((sortAscending.value as boolean) !== newSortAscending) {
                            sortAscending.setValue(newSortAscending);
                        }
                        refreshAction?.execute();
                    }}
                />
            )}
        </div>
    );
}
