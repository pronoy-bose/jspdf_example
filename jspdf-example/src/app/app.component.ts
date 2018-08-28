// REFERENCE LINK FOR AUTO TABLE :: https://github.com/simonbengtsson/jsPDF-AutoTable
import { SampleService } from './sample.service';
import { Component, OnInit } from '@angular/core';
import 'jspdf';
import 'jspdf-autotable';
declare let jsPDF;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private rowData;
  public errorMessage: string;
  // public fieldArray: Array<any> = [];
  public user: any = {};
  private downloadFiles: any;
  selectedRowId: Number;
  employeeDetail;
  expenseStartDate: String = "2018-08-22";
  expenseEndDate: String = "2019-08-22";
  employeeFullName: String = "Sample Name";
  employeeNumber: String;
  employeeLevel: String;
  employeeDepartment: String;
  reportid: any = 222;
  status: String = "Approved";
  expenseStartDateField: { "year": number, "month": number, "day": number };
  p: number;
  public fieldArray: Array<any> = [];

  constructor(private sampleService: SampleService) { }

  ngOnInit() {
    this.fieldArray = [{
      "id": 424,
      "expenseDate": "2018-08-13",
      "formattedExpDate": null,
      "projectId": "439",
      "projectName": "Practice_ET (IN)",
      "projectTaskId": "236",
      "projectTaskName": "Practice",
      "expenseTypeId": "5851",
      "expenseTypeName": "Advertising",
      "notes": "",
      "billable": true,
      "reimbursible": true,
      "quantity": 1,
      "receiptPrice": 11,
      "totalReceiptPrice": 0,
      "currencyCode": "CAD",
      "baseExchangeAmt": "INR 578.05",
      "status": "S",
      "missingReceipts": false,
      "reasonForReject": null,
      "exchangeRate": "52.55",
      "exchangeRateWithDesc": "52.55 CAD to INR",
      "createdBy": 0,
      "createdDate": null,
      "lastModifiedBy": 0,
      "lastModifiedDate": null,
      "userId": 0,
      "calenderId": null,
      "orgCurrencyCode": null,
      "clientCurrencyCode": null,
      "expenseAttachments": [],
      "selected": false,
      "reimbursedAmount": null,
      "reimbursedCurrencyCode": null,
      "deptName": "DEFAULT",
      "invoiced": false
    }, {
      "id": 425,
      "expenseDate": "2018-08-14",
      "formattedExpDate": null,
      "projectId": "439",
      "projectName": "Practice_ET (IN)",
      "projectTaskId": "236",
      "projectTaskName": "Practice",
      "expenseTypeId": "5852",
      "expenseTypeName": "Airfare",
      "notes": "",
      "billable": true,
      "reimbursible": true,
      "quantity": 1,
      "receiptPrice": 22,
      "totalReceiptPrice": 0,
      "currencyCode": "CAD",
      "baseExchangeAmt": "INR 1156.10",
      "status": "S",
      "missingReceipts": false,
      "reasonForReject": null,
      "exchangeRate": "52.55",
      "exchangeRateWithDesc": "52.55 CAD to INR",
      "createdBy": 0,
      "createdDate": null,
      "lastModifiedBy": 0,
      "lastModifiedDate": null,
      "userId": 0,
      "calenderId": null,
      "orgCurrencyCode": null,
      "clientCurrencyCode": null,
      "expenseAttachments": [],
      "selected": false,
      "reimbursedAmount": null,
      "reimbursedCurrencyCode": null,
      "deptName": "DEFAULT",
      "invoiced": false
    }, {
      "id": 426,
      "expenseDate": "2018-08-16",
      "formattedExpDate": null,
      "projectId": "471",
      "projectName": "Training_ET (IN)",
      "projectTaskId": "245",
      "projectTaskName": "Training",
      "expenseTypeId": "5853",
      "expenseTypeName": "ATM Charges",
      "notes": "",
      "billable": true,
      "reimbursible": false,
      "quantity": 1,
      "receiptPrice": 22,
      "totalReceiptPrice": 0,
      "currencyCode": "BHD",
      "baseExchangeAmt": "INR 3977.16",
      "status": "S",
      "missingReceipts": false,
      "reasonForReject": null,
      "exchangeRate": "180.78",
      "exchangeRateWithDesc": "180.78 BHD to INR",
      "createdBy": 0,
      "createdDate": null,
      "lastModifiedBy": 0,
      "lastModifiedDate": null,
      "userId": 0,
      "calenderId": null,
      "orgCurrencyCode": null,
      "clientCurrencyCode": null,
      "expenseAttachments": [],
      "selected": false,
      "reimbursedAmount": null,
      "reimbursedCurrencyCode": null,
      "deptName": "DEFAULT",
      "invoiced": false
    }];
  }


  //Function to get rows of data in sequential array format as per the column name sequence
  getRowDataForPdf(dataObj) {
    let dayData = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" };
    let rowData = [];
    dataObj.forEach(x => {
      let dateVal: string[] = x.expenseDate.split('-');
      let dateField = { year: Number(dateVal[0]), month: Number(dateVal[1]), day: Number(dateVal[2]) };
      let formattedDate: string = dateField.day + '-' + dayData[dateField.month] + '-' + dateField.year;
      let rows = [];
      rows.push(this.reportid);
      rows.push(this.status);
      rows.push(x.projectName);
      rows.push(x.projectTaskName);
      rows.push(formattedDate);
      rows.push(x.expenseTypeName);
      rows.push(x.quantity);
      rows.push(x.currencyCode);
      rows.push(x.receiptPrice);
      rows.push(x.baseExchangeAmt);
      rows.push(x.billable == true ? 'Yes' : 'No');
      rows.push(x.reimbursible == true ? 'Yes' : 'No');
      rows.push(x.exchangeRateWithDesc);
      rows.push(x.notes);
      rowData.push(rows);
    });
    return rowData;
  }

  getPdfData() {
    this.sampleService.getLogoImage().subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      this.exportToPdf(null);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.exportToPdf(reader.result);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  exportToPdf(base64Image) {
    //Column names for the table
    let colNames = ["Report Id", "Status", "Project", "Task", "Expense Date", "Expense Type", "Quantity", "Receipt Currency", "Receipt Price", "Employee Base Currency Amount", "Billable", "Reimbursible", "Exchange Rate", "Notes"]
    //Separating the reimbursible and non reimbursible data
    let reimbursibleData = this.fieldArray.filter(x => x.reimbursible == true);
    let nonReimbursibleData = this.fieldArray.filter(x => x.reimbursible == false);

    let totalReimbursibleAmount = 0;
    let totalNonReimbursibleAmount = 0;
    let baseExchangeCurrency = "";
    //Calculating the total reimbursible amount and totalNonReimbursibleAmount
    reimbursibleData.forEach(x => {
      baseExchangeCurrency = x.baseExchangeAmt.split(" ")[0];
      totalReimbursibleAmount += Number(x.baseExchangeAmt.split(" ")[1]);
    });

    nonReimbursibleData.forEach(x => {
      totalNonReimbursibleAmount += Number(x.baseExchangeAmt.split(" ")[1]);
    });

    let totalAmount = Number(totalReimbursibleAmount) + Number(totalNonReimbursibleAmount);

    //Getting the rows of data in sequential array format from function as per column name sequence
    let reimbursedRowData = this.getRowDataForPdf(reimbursibleData);

    let nonReimbursedRowData = this.getRowDataForPdf(nonReimbursibleData);

    //Creation of pdf begins
    var pdf = new jsPDF('p', 'pt', 'A4');
    pdf.setFontSize(8);
    var yCoordinate = 40;
    //Adding the logo image
    if (base64Image) {
      pdf.addImage(base64Image, 'JPG', 45, yCoordinate, 60, 60);
    }

    yCoordinate += 70;
    pdf.setDrawColor(128, 128, 128); //Setting the line color to gray
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    //Header Creation begin
    pdf.text('<b>Expense Report</b>', 35, yCoordinate);
    yCoordinate += 12;
    pdf.fromHTML('Tracking number: ' + this.reportid, 35, yCoordinate);
    yCoordinate += 12;
    pdf.fromHTML('Date: ' + this.expenseStartDate, 35, yCoordinate);
    yCoordinate += 12;
    pdf.fromHTML('Name: ' + this.expenseStartDate + ' to ' + this.expenseEndDate, 35, yCoordinate);
    yCoordinate += 12;
    pdf.fromHTML('Status: ' + this.status, 35, yCoordinate);
    yCoordinate += 20;
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    pdf.fromHTML('<b>From</b>', 35, yCoordinate);
    yCoordinate += 12;
    pdf.fromHTML(this.employeeFullName, 35, yCoordinate);
    yCoordinate += 12;
    pdf.fromHTML('Department: ' + this.employeeDepartment, 35, yCoordinate);
    yCoordinate += 12;
    pdf.fromHTML('Employee number: ' + this.employeeNumber, 35, yCoordinate);
    yCoordinate += 12;
    pdf.fromHTML('Position Level: ' + this.employeeLevel, 35, yCoordinate);
    yCoordinate += 20;
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    //Header Creation End
    //Reimbursible Expenses table
    pdf.fromHTML('<b>Reimbursible Expenses</b>', 35, yCoordinate);
    yCoordinate += 30;
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    let firstTable;
    //If data is there then only create grid
    if (reimbursedRowData.length != 0) {
      yCoordinate += 5;
      pdf.autoTable(colNames, reimbursedRowData, {
        theme: 'striped',
        startY: yCoordinate, styles:
          { cellPadding: 1.5, fontSize: 9, overflow: 'linebreak' }, columnStyles: { 2: { cellWidth: 45 } }
      });
      firstTable = pdf.autoTable.previous; //Tracking the table created to get the end y axis value
    }
    if (firstTable) {
      yCoordinate = firstTable.finalY + 30; //changing the y coordinate to end of table if present
    }

    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    //Non Reimbursible Expenses table
    pdf.fromHTML('<b>Non Reimbursible Expenses</b>', 35, yCoordinate);
    yCoordinate += 30;
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    let secondTable;
    //If data is there then only create grid
    if (nonReimbursedRowData.length != 0) {
      yCoordinate += 5;
      pdf.autoTable(colNames, nonReimbursedRowData, {
        theme: 'striped',
        startY: yCoordinate, styles:
          { cellPadding: 1.5, fontSize: 9, overflow: 'linebreak' }, columnStyles: { 2: { cellWidth: 45 } }
      });
      secondTable = pdf.autoTable.previous; //Tracking the table created to get the end y axis value
    }

    if (secondTable) {
      yCoordinate = secondTable.finalY + 30; //changing the y coordinate to end of table if present
    } else {
      yCoordinate += 30; //Else only increase y coordinate by 30
    }

    //Chcking if the y coordinate has reached almost the end then draw the footer html in new page
    if (yCoordinate > 1100) {
      pdf.addPage();
      yCoordinate = 0
    }
    //Total expenses footer
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    pdf.fromHTML('<b>Total of all expenses</b>', 35, yCoordinate);
    //Adding the amount vlaue at the end of the same row
    pdf.fromHTML('<b>' + baseExchangeCurrency + ' ' + Number(totalAmount).toFixed(2) + '</b>', pdf.internal.pageSize.getWidth() - 150, yCoordinate);
    yCoordinate += 25;
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    //Non Reimbursible expenses footer
    pdf.fromHTML('<b>Non Reimbursible expenses</b>', 35, yCoordinate);
    pdf.fromHTML('<b>' + baseExchangeCurrency + ' ' + Number(totalNonReimbursibleAmount).toFixed(2) + '</b>', pdf.internal.pageSize.getWidth() - 150, yCoordinate);
    yCoordinate += 25;
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    //Total Due footer
    pdf.fromHTML('<b>Total Due</b>', 35, yCoordinate);
    pdf.fromHTML('<b>' + baseExchangeCurrency + ' ' + Number(totalAmount - totalNonReimbursibleAmount).toFixed(2) + '</b>', pdf.internal.pageSize.getWidth() - 150, yCoordinate);
    yCoordinate += 25;
    pdf.line(35, yCoordinate, pdf.internal.pageSize.getWidth() - 35, yCoordinate);
    //creating file name
    let fileName = this.employeeFullName + "_" + this.expenseStartDate + "_" + this.expenseEndDate;
    //Save the pdf    
    pdf.save(fileName + '.pdf');
  }
}
