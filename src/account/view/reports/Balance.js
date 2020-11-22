// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// called date-fns to format the date on the ticket
//format(new Date(ticket.updated_at), "yyyy-MM-dd"
// define a generatePDF function that accepts a tickets argument
const generatePDFBalance = (balances) => {
 

  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Amount","Currency"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  balances.forEach(balance => {
    const balanceData = [
      balance.id,
      balance.amount,
      balance.currency,
      // called date-fns to format the date on the ticket
      
    ];
    // push each tickcet's info into a row
    tableRows.push(balanceData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { 
    startY: 20,
    
});
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text("Fin-Assistant", 14, 15);
  
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDFBalance;