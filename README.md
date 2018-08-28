# JSPDF Example For Angular 6
##### Reference for JSPDF AUTOTABLE OPTIONS :: ```https://github.com/simonbengtsson/jsPDF-AutoTable```

Install :- 
#### npm install jspdf jspdf-autotable

Import in In angular.json scripts array
```
"../node_modules/jspdf/dist/jspdf.min.js",
"../node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.min.js"
```

In Component ts file outside class
```javascript
import 'jspdf';
import 'jspdf-autotable';
declare let jsPDF;


//Declaration
var doc = new jsPDF({
  orientation: 'portrait|landscape|('p'|'l')',// One of "portrait" or "landscape" (or shortcuts "p" (Default), "l")
  unit: 'in|mm|pt', //Measurement unit to be used when coordinates are specified. One of "pt" (points), "mm" (Default), "cm", "in"
  format: 'A4|letter|A3|...' // One of 'a3', 'a4' (Default),'a5' ,'letter' ,'legal'
})

//Example : -----------------------
let pdf = new jsPDF('p', 'pt', 'A4');

pdf.setFontSize(8); // Sets font size for ant text added
pdf.setDrawColor(128, 128, 128); //Color of any graphics to be drawn. Current value gives gray
pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate); //Draws a line. params:(x1,y1,x2,y2)

pdf.fromHTML('<b>Expense Report</b>', 35, yCoordinate); //Adds html. params:(html,x,y)
//Note : Keep a variable that keeps track of the y coordinate. After each addition of element in the doc
//Update the yCoordinate to new value like yCoordinate+=30

//JSPDF Autotable----------------------------------------
var pdf = new jsPDF();
pdf.autoTable({html: '#my-table'}); //If there is a table in UI give it an ID and set it here
//Doesn't seen to work in Angular 6. Couldn't find out why. The data was going out of scope

//How to show table data --------------------------------------
pdf.autoTable(colNamesArray,rowDataArray{
  theme: 'striped',
	startY: yCoordinate, styles:
	  { cellPadding: 1.5, fontSize: 9, overflow: 'linebreak' }, columnStyles: { 2//cell number: { cellWidth: 45 } }
  });
//--------------------------------------------------------------
  
theme: 'striped'|'grid'|'plain'|'css' = 'striped'

// Important for multiple tables ::
// After you do pdf.autoTable

let firstTable = pdf.autoTable.previous; //Gets the instance of previous table created
yCoordinate = firstTable.finalY + 30; // Take the final y coordinate and increase its value to show 
//more data below it
//Again do pdf.autoTable and then
secondTable = pdf.autoTable.previous;
if (secondTable) {
  yCoordinate = secondTable.finalY + 30; //changing the y coordinate to end of table if present
} else {
  yCoordinate += 30; //Else only increase y coordinate by 30
}

//Save the pdf    
pdf.save('fileName.pdf');
```
