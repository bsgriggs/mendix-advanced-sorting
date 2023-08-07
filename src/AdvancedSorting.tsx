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
    refreshAction,
    headerAlignment,
    tabIndex,
    ariaLabel
}: AdvancedSortingContainerProps): ReactElement {
    const [dropdownList, setDropdownList] = useState<DropdownValue[]>([]);
    if (displayStyle === "dropdown") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
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
                                sortAttribute: dropdownValue.dropdownAttributeName.value as string,
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
        }, [dropdownValues, dynamicDatasource, sortAscending.status, sortAttribute.status]);
    }

    const onClickHandler = (): void => {
        if (displayStyle === "header") {
            if (attributeName.value === sortAttribute.value) {
                sortAscending.setValue(!sortAscending.value);
            } else {
                sortAttribute.setValue(attributeName.value);
            }
            refreshAction?.execute();
        }
    };

    return (
        <div
            id={name}
            className={`advanced-sorting-${displayStyle === "header" ? "header" : "dropdown"}`}
            style={{
                justifyContent: headerAlignment === "left" ? "start" : headerAlignment === "middle" ? "center" : "end"
            }}
            tabIndex={displayStyle === "header" ? tabIndex || 0 : undefined}
            onClick={onClickHandler}
            onKeyDown={event => {
                if (event.key === "Enter") {
                    onClickHandler();
                }
            }}
        >
            {displayStyle === "header" && (
                <Header
                    headerContent={headerContent}
                    isCurrentlySorted={attributeName.value === sortAttribute.value}
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
                    tabIndex={tabIndex}
                    name={name}
                    ariaLabel={ariaLabel?.value}
                />
            )}
        </div>
    );
}
