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
[step by step instructions]

## Configuration Details  

## Demo project  
https://widgettesting105-sandbox.mxapps.io/p/advanced-sorting

## Issues, suggestions and feature requests  
https://github.com/bsgriggs/mendix-advanced-sorting/issues

## Development and contribution  

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

[specify contribution]
