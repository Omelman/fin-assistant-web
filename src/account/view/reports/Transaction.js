// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// called date-fns to format the date on the ticket
//format(new Date(ticket.updated_at), "yyyy-MM-dd"
// define a generatePDF function that accepts a tickets argument
const generatePDFTrans = (transactions) => {

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Amount","Currency","Description", "Category", "Include", "Date"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  transactions.forEach(transaction => {
    const transactionData = [
      transaction.id,
      transaction.amount,
      transaction.currency,
      transaction.description,
      transaction.category,
      transaction.include,
      transaction.date,
      // called date-fns to format the date on the ticket
      
    ];
    // push each tickcet's info into a row
    tableRows.push(transactionData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { 
    startY: 20,
});
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("transaction", 14, 15);
  
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFTrans;