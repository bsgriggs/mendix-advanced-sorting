## Advanced Sorting
Reusable widget to encapsulate the math required to manually do sorting. Most for:
1. Getting data from an API that allows sorting (e.g. https://cars.com/users?sort_by=year&order=desc)
2. SQL / OQL queries (e.g. SELECT * FROM CAR ORDER BY YEAR DESC)
3. Creating custom grids with the [Xpath module](https://marketplace.mendix.com/link/component/120424)

Tip: Need pagination too? Check out Advanced Pagination. (<a href='https://github.com/bsgriggs/mendix-advanced-pagination' target="_blank">GitHub</a>) (<a href='https://marketplace.mendix.com/link/component/120670' target="_blank">Mendix Marketplace</a>)  
Need selection too? Check out Listview Selection. (<a href='https://github.com/bsgriggs/mendix-listview-selection' target="_blank">GitHub</a>) (<a href='https://marketplace.mendix.com/link/component/212384' target="_blank">Mendix Marketplace</a>)

![demo](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/demo.png)

## Features  
- Offers Headers and Dropdown sorting methods
- Drag and drop method of setting sorting attributes
- Ability to customize the icons displayed 
- Accepts a Sort Attribute string and a Sort Ascending boolean
- Ability to use any Mendix content for the header
- Ability to configure your own list of dropdown values

## Usage
The following steps will create a list view with sortable headers that look like the image below.  
![demoBrowser](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/demoBrowser.png)  
### Create the Pagination Module
I usually make a separate, small module for some of the core functionality. This serves 2 purposes:
1. The module can easily be exported and imported into other projects
2. The core logic is stored in a common place if you need to make multiple Custom Grids in your app

Follow these steps to make the Pagination Module:
1. Right-click on your app name in Studio Pro, click 'Add module ...', and name the module "Pagination"
2. In the domain model, create a non-persistent entity called **Pagination** with SortAttribute and SortAscending.  
![pagination entity](https://github.com/bsgriggs/pagination/blob/media_v2/pagination/paginationEntity.png)  
_Note: The Page, PageSize, and ResultTotal are not used for this example, but you'll need them if you want to use the Advanced Pagination widget. (<a href='https://github.com/bsgriggs/mendix-advanced-pagination' target="_blank">GitHub</a>) (<a href='https://marketplace.mendix.com/link/component/120670' target="_blank">Mendix Marketplace</a>)_
3. Create a Microflow called **ACT_Pagination_Refresh** with a Pagination parameter. Add a change object activity with refresh in client set to Yes.  
![ACT Pagination_Refresh](https://github.com/bsgriggs/pagination/blob/media_v2/pagination/ACT_Pagination_Refresh.png)
4. Create a Microflow called **ACT_Pagination_Search** with a Pagination parameter. Add a change object activity and set the Page attribute to 1. Then call the **ACT_Pagination_Refresh** Microflow.  
![ACT Pagination_Refresh](https://github.com/bsgriggs/pagination/blob/media_v2/pagination/ACT_Pagination_Search.png)
5. Create a module role called User and grant that module role full access to the Pagination entity and the Microflows from steps 3 and 4.  
6. In your project security settings, grant all user roles the Pagination module's User user role.  

_What are the two Microflows for? ~ ACT_Pagination_Refresh should be used when you just want to refresh the results (e.g. changing pages or sorting). ACT_Pagination_Search should be used when the user may have changed the search criteria (e.g. on-change action for a text box or a search button)_

### Main Domain Model
Inside the domain model of the entity you need to retrieve, create a non-persistent entity **specific** to your grid. I usually put this right next to the entity it retrieves in the domain model  
- I use the format Search{ReturnedEntity} (e.g. if my grid is going to return Employee objects, I would name it SearchEmployees). _For the rest of the documentation, this entity will be referred to as **Search{Entity}**_  
- Set **Search{Entity}** to generalize Pagination  
- Add an association to **System.Session**.  
- Add attributes and associations for any search criteria you want. For me, FuzzySearch is for the text input and the associations are for multi-select popups I want to display.  
![searchEmployees](https://github.com/bsgriggs/pagination/blob/media_v2/searchEmployees.png)

### Page and Widget Setup - Header
1. Create a Microflow called **DS_Search{Entity}** that retrieves the list from **$currentSession** for an existing **Search{Entity}** object. If the list is not empty, head the list and return the object. Otherwise, create a new object with the association to System.Session as $currentSession and PageSize as whatever default page size you want.  
![DS_SearchEmployees](https://github.com/bsgriggs/pagination/blob/media_v2/DS_SearchEmployees.png)  
2. Setup your page similar to how you see below with the widgets above the list view. These should be inside a data view with datasource **DS_Search{Entity}**.  
![page_mendix](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/demoMendix.png)  
3. In the Advanced Sorting widgets, set Sort Attribute and Sort Ascending to the attributes on your **Search{Entity}**. Set the Refresh Action to **ACT_Pagination_Refresh**, the Sort Attribute, and the Sort Ascending.  
4. Set the Attribute Name as the exact database name of the attribute you want to sort. This is case-sensitive. If you want to sort across an association, use the format: {ModuleName}.{AssociationName}/{ModuleName}.{EntityName}/{AttributeName}.  
For example, consider the following domain model from the 'TestObjects' module.  
![general](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/domainEmployee.png)

| Sorting MxID | Sorting Department Name |
| --- | --- |
| ![general](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalHeader.png) | ![general](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalAssociation.png) |  

5. Now when the user clicks on the headers, the **Search{Entity}**'s SortAttribute and SortAscending will be set. You can use these values in your API, SQL, or Xpath. In my use case, I'm using the [Xpath module](https://marketplace.mendix.com/link/component/120424). So, I set the SortMap object bassed on the values from the **Search{Entity}** object.  
![microflow](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/microflow.png)

### Page and Widget Setup - Static Dropdown
![general](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalDropdown_Static.png)  
{ToDo}
### Page and Widget Setup - Dynamic Dropdown
![general](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalDropdown_Dynamic.png)  
{ToDo}
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
