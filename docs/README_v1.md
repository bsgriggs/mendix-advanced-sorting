## Advanced Sorting
Reusable widget to encapsulate the math required to manually do sorting. Most useful when getting data from an API that allows sorting or writing SQL / OQL queries (e.g. https://cars.com/users?sort_by=year&order=desc). 

Tip: Need pagination too? Check out Advanced Pagination. (<a href='https://github.com/bsgriggs/mendix-advanced-pagination' target="_blank">GitHub</a>) (<a href='https://marketplace.mendix.com/link/component/120670' target="_blank">Mendix Marketplace</a>)  
Need selection too? Check out Listview Selection. (<a href='https://github.com/bsgriggs/mendix-listview-selection' target="_blank">GitHub</a>) (<a href='https://marketplace.mendix.com/link/component/212384' target="_blank">Mendix Marketplace</a>)

![Overview](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/advancedSorting.png)

## Features  
- Offers Headers and Dropdown sorting methods
- Drag and drop method of setting sorting attributes
- Ability to customize the icons displayed 
- Accepts a Sort Attribute string and a Sort Ascending boolean
- Ability to use any Mendix content for the header
- Ability to configure your own list of dropdown values

## Limitations  
- N/A

## Usage  
1. Create a non-persistent entity called **Pagination** with at least SortAscending (boolean) and SortAttribute (string). Ideally this should be in it's own module for easier importing and exporting to new projects!<br/>![pagination entity](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/pagination.png)
2. Create a non-persistent entity **specific** to your grid (i.e. SearchVehicles), have it **inherit** Pagination and give it an association to **System.Session**<br/>![inheritance](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/domainModel.png)
3. Create a Microflow called **ACT_RefreshPagination** with a Pagination parameter, add a change object activity, and set the change object activity to refresh in client<br/>![ACT refresh pagination](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/ACT_RefreshPagination.png)
4. Create a Microflow called **DS_CreateRetrieve_{*SpecificEntityName*}** that will check the System.Session for an existing {*Specific Entity Name*} object. If an object is found, return it; otherwise create a new one *(don't forget to set the $currentSession in the Create Object activity)*<br/>![DS create retrieve specific entity](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/DS_SearchVehicles.png)
5. Setup your page similar to how you see below with the widget above the list view. These should be inside a data view with datasource **DS_CreateRetrieve_{*SpecificEntityName*}**.<br/>![page_mendix](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/pageLayout.png)
6. In the Advanced Sorting widgets, go to the Data tab and set the Refresh Action with **ACT_RefreshPagination**, the Sort Attribute, and the Sort Ascending<br/>![refresh action](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/data.png)
<br/>
The remaining steps depend on whether you want a dropdown or a clickable grid header.
<br/>
<h4>Header</h4><br/>  
7a. In the Advanced Sorting widgets, go to the General tab and set the Attribute Name as the name of the attribute you want sorted. This must match the name of the attribute exactly and is case sensitive. In this example, I want to sort the Year attribute from the Vehicles entity (step 2).<br/><img alt='general header' src='https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/general-header.png' />
<h4>Static Dropdown</h4><br/>  
7b. Static dropdown lets you create a list of dropdown options that act as pre-sets of sorting options. Add a dropdown value and set all of the fields. Caption is the literal text that will appear as an option in the dropdown. Sort Ascending and Attribute Name are the values that will be set to the pagination object's SortAttibute and SortAscending attributes once the option is selected. Default determines if the option is selected automatically. If no default is specified, the widget will use the first option in the list.<br/><img alt='association' src='https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/general-dropdown-static.png' /> 
<h4>Dynamic Dropdown</h4><br/>
7c. Dynamic dropdown lets you create the options that appear in the dropdown via a Microflow. Start by creating a new non-persistent entity called SortDropdownValue with the following attributes.<br/><img alt='association' src='https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/domainDynamicDropdown.png' /> 
8c. Next, create a Microflow call DS_SortDropdownValues that returns a list of SortDropdownValue objects. <br/><img alt='association' src='https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/DS_SortDropdownValues.png' />
9c. In the Advanced Sorting widgets, go to the Dynamic Dropdown tab and set the Dynamic Data Source as the new Microflow and the rest of the settings as the attributes from the SortDropdownValue object.<br/><img alt='association' src='https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/dynamicDropdown.png' />

<strong>Note:</strong> If you need to sort an attribute across an association, you must include the full database path. For example, if I need to sort the Name attribute on the Make entity (step2).<br/><img alt='association' src='https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/association.png' />

## Demo project  
https://widgettesting105-sandbox.mxapps.io/p/advanced-listview-controls

## Issues, suggestions and feature requests  
https://github.com/bsgriggs/mendix-advanced-sorting/issues

## Development and contribution  
Benjamin Griggs
