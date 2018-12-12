import * as JsPDF from 'jspdf';
import moment from 'moment';

const rowsAndDoc = (downloadFellows, cellValues) => {
  const rows = downloadFellows.map(fellow => {
        
    const row = [];
    cellValues.forEach(field => {

      if (field === 'name') {
        row.push(`${fellow.firstName} ${fellow.lastName}`);
      } else if (field === 'ttlName') {
        row.push(`${fellow.submitterFirstName} ${fellow.submitterLastName}`);
      } else {
        row.push(`${fellow[field]}`);
      }
    });
    return row;
  });
  
  const doc = new JsPDF('l', 'pt');

  doc.setFontSize(12);
  doc.setFontStyle('bold');

  return [rows, doc]
}

const downloadPdf = (headers, cellValues, criteria, status, level, downloadFellows, results) => {
    
    const rowsDoc = rowsAndDoc(downloadFellows, cellValues);
    const rows = rowsDoc[0];
    const doc = rowsDoc[1];
    
    const totalPagesExp = "{total_pages_count_string}";
    const pageContent = data => {
      // HEADER
      const logoImage = process.env.REACT_APP_LOGO_B64;
      
      doc.setFontSize(13);
      doc.setFont("courier");
      doc.setFontType("normal");
      doc.text(`Date: ${moment().format("DD/MM/YYYY")}\tCriteria: ${criteria}  Level: ${level}  Status: ${status}\tResults: ${results} Fellows`, data.settings.margin.left + 10, 22);

      // FOOTER
      let str = `Page ${data.pageCount}`;
      if (typeof doc.putTotalPages === 'function') {
          str = `${str} of ${totalPagesExp}`;
      }
      doc.setFontSize(10);
      const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      doc.text(str, data.settings.margin.left, pageHeight  - 10);
      doc.addImage(logoImage, 'PNG', pageWidth - 135, pageHeight - 30, 90, 20);
    };
    doc.autoTable(headers, rows, { addPageContent: pageContent, margin: {top: 35} });
    if (typeof doc.putTotalPages === 'function') { doc.putTotalPages(totalPagesExp); }
    doc.save('Watchtower report.pdf');
  }

export default downloadPdf;
