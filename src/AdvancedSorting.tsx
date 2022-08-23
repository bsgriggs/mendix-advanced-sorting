import { ReactElement, createElement } from "react";
import { ValueStatus } from "mendix";
import { AdvancedSortingContainerProps } from "../typings/AdvancedSortingProps";
import "./ui/AdvancedSorting.css";
import { Header } from "./components/Header";
import { Dropdown } from "./components/Dropdown";

export function AdvancedSorting(props: AdvancedSortingContainerProps): ReactElement {
    if (props.sortAscending.status === ValueStatus.Available && props.sortAttribute.status === ValueStatus.Available) {
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
                        dropdownValues={props.dropdownValues}
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
