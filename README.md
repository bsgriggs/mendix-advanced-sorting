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

Create a Microflow called **DS_Search{Entity}** that retrieves the list from **$currentSession** for an existing **Search{Entity}** object. If the list is not empty, head the list and return the object. Otherwise, create a new object with the association to System.Session as $currentSession and PageSize as whatever default page size you want.  
![DS_SearchEmployees](https://github.com/bsgriggs/pagination/blob/media_v2/DS_SearchEmployees.png)  

### How to set the Attribute Name
If you are using the [Xpath module](https://marketplace.mendix.com/link/component/120424), all of the Attribute Name settings should be the exact database name of the attribute you want to sort. They are case-sensitive. If you want to sort across an association, use the format "{ModuleName}.{AssociationName}/{ModuleName}.{EntityName}/{AttributeName}".  

For example, consider the following domain model from the 'TestObjects' module.  
![general](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/domainEmployee.png)

| Sorting MxID | Sorting Department Name |
| --- | --- |
| ![general](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalHeader.png) | ![general](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalAssociation.png) |  

### Page and Widget Setup
View the following sections based on which Display Type you want to use.

<details>
<summary><h4>Header</h4></summary>

1. Set up your page similar to below with the widgets above the list view. These should be inside a data view with datasource **DS_Search{Entity}**.  
![page_mendix](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/demoMendix.png)  
2. In the Advanced Sorting widgets, set Sort Attribute and Sort Ascending to the attributes on your **Search{Entity}**. Set the Refresh Action to **ACT_Pagination_Refresh**.  
![general header](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalHeader.png)  
3. Set the Attribute Name as the exact database name of the attribute you want to sort. For a specific example, see the **How to set the Attribute Name** section above.  
 
</details>

<details>
<summary><h4>Static Dropdown</h4></summary>

1. Set up your page similar to below with the widgets above the list view. These should be inside a data view with datasource **DS_Search{Entity}**.  
![page_mendix dropdopwn](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/demoMendix_Dropdown.png)
2. In the Advanced Sorting widget, set Sort Attribute and Sort Ascending to the attributes on your **Search{Entity}**. Set the Refresh Action to **ACT_Pagination_Refresh**.  
![dropdown static](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalDropdown_Static.png)
3. Decide if you want to use Dropdown Sort Type "Data" or "Toggle"  
**Data** - The Dropdown Value's Sort Ascending setting determines what the sort direction should be.  
**Toggle** - A toggle button will appear next to the Dropdown that can be used to toggle the sort direction.  
4. Add all of the items you need to the Dropdown Values list.  
![dropdown item](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/dropdownItem.png)  
**Caption** - The text shown in the dropdown.  
**Default?** - Determines if this value is selected when the widget loads. There should only be 1 item with default set to Yes. If no items have a default, the widget will set the first item on load.  
**Attribute Name** - Set the exact database name of the attribute you want to sort. For a specific example, see the **How to set the Attribute Name** section above.  
**Sort Ascending** - When the user selects this item from the dropdown, should the SortAscending attribute on the Search{Entity} be set to true or false? Ascending = true. Descending = false. This option is only available if Dropdown Sort Type is set to Data.
 
</details>

<details>
<summary><h4>Dynamic Dropdown</h4></summary>

1. Add the following DropdownValue entity to store the data for each dropdown option.  
![dynamic dropdown domain](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/domainDynamicDropdown.png)  
2. Create a Microflow/Nanoflow that creates the DropdownValue objects you want to display in the dropdown called **DS_DropdownValues**.  
![DS_DropdownValues](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/DS_DropdownValues.png)  
**Caption** - The text shown in the dropdown.  
**_Default** - Determines if this value is selected when the widget loads. There should only be 1 item with default set to Yes. If no items have a default, the widget will set the first item on load.  
**AttributeName** - Set the exact database name of the attribute you want to sort. For a specific example, see the **How to set the Attribute Name** section above.  
**SortAscending** - When the user selects this item from the dropdown, should the SortAscending attribute on the Search{Entity} be set to true or false? Ascending = true. Descending = false. This option is only available if Dropdown Sort Type is set to Data.  
4. Set up your page similar to below with the widgets above the list view. These should be inside a data view with datasource **DS_Search{Entity}**.  
![page_mendix dropdopwn](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/demoMendix_Dropdown.png)
5. In the Advanced Sorting widget, set Sort Attribute and Sort Ascending to the attributes on your **Search{Entity}**. Set the Refresh Action to **ACT_Pagination_Refresh**.  
![dropdown dynamic](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/generalDropdown_Dynamic.png)
6. Decide if you want to use Dropdown Sort Type "Data" or "Toggle"  
**Data** - The Dropdown Value's Sort Ascending setting determines what the sort direction should be.  
**Toggle** - A toggle button will appear next to the Dropdown that can be used to toggle the sort direction. If you use this setting, you do not need the SortAscending attribute on the DropdownValue entity.  
7. Go to the newly added Dynamic Dropdown tab. Select **DS_DropdownValues** as the Dynamic Data Source. Then select the rest of the options as the matching attribute name.  
![dynamic dropdown item](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/DynamicDropdown.png)  
 
</details>

### How to Use the Sort Attribute and Sort Ascending
When the user clicks on a header or selects an option from the dropdown, the **Search{Entity}**'s SortAttribute and SortAscending will be set. You can use these values in your API, SQL, or Xpath. In my use case, I'm using the [Xpath module](https://marketplace.mendix.com/link/component/120424). So, I set the SortMap object based on the values from the **Search{Entity}** object.  
![microflow](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/microflow.png)

### Customization settings
![customization](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/customization.png)  
**Show label** - Shows the Mendix input label. Use for Dropdowns.  
**Aria label selector** - What the screen reader will say when focused on a header or when Show Label is disabled for dropdowns.  
**Aria label ascending** - What the screen reader will say when focused on the Toggle button and the button is ascending.  
**Aria label descending** - What the screen reader will say when focused on the Toggle button and the button is descending.  
**Ascending icon** - Option to customize the ascending icon.  
**Descending icon** - Option to customize the descending icon.  
**Toggle alignment** - Controls which side of the dropdown the Toggle button is shown.    

### Common settings
![common](https://github.com/bsgriggs/mendix-advanced-sorting/blob/media_v2/common.png)  


## Demo project  
https://widgettesting105-sandbox.mxapps.io/p/advanced-listview-controls

## Issues, suggestions and feature requests  
https://github.com/bsgriggs/mendix-advanced-sorting/issues

## Development and contribution  
Benjamin Griggs
