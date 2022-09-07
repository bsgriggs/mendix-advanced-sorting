## AdvancedSorting
Reusable widget to encapsulate the math required to manually do sorting. Most useful when getting data from an API that allows sorting or writing SQL / OQL queries (e.g. https://cars.com/users?sort_by=year&order=desc). 

![Overview](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/advancedSorting.png)

## Features  
- Offers Headers and Dropdown sorting methods
- Drag and drop method of setting sorting attributes
- Ability to customize the icons displayed 
- Accepts a Sort Attribute string and a Sort Ascending boolean
- Ability to use any Mendix content for the header
- Ability to configure your own list of dropdown values

## Limitations  

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
7. In the Advanced Sorting widgets, go to the General tab and set the Attribute Name as the name of the attribute you want sorted. This must match the name of the attribute exactly and is case sensitive. In this example, I want to sort the Year attribute from the Vehicles entity (step 2).<br/><img alt='general header' src='https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/general-header.png' />
7a. If you need to sort an attribute across an association, you must include the full database path. For example, if I need to sort the Name attribute on the Make entity (step2).<br/><img alt='association' src='https://github.com/bsgriggs/mendix-advanced-sorting/blob/media/association.png' />
<h4>Dropdown Static</h4><br/>  
7. 
<h4>Dropdown Dynamic</h4><br/>
7. 

## Configuration Details  

## Demo project  
https://widgettesting105-sandbox.mxapps.io/p/advanced-sorting

## Issues, suggestions and feature requests  
https://github.com/bsgriggs/mendix-advanced-sorting/issues

## Development and contribution  
Benjamin Griggs
