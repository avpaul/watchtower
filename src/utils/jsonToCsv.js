const createLink = csv => {
  // Generate a file name
  const fileName = 'WatchTower report';

  // Initialize file format you want csv or xls
  const uri = `data:text/csv;charset=utf-8,${escape(csv)}`;

  // Generate a temp <a /> tag
  const link = document.createElement('a');
  link.href = uri;

  // set the visibility hidden so it will not effect on your web-layout
  link.style = 'visibility:hidden';
  link.download = `${fileName}.csv`;
  return link;
};

const jsonToCsv = (
  ShowHeader,
  headers = [],
  fellowFields = [],
  fellows = []
) => {
  let csv = '';

  // Generate the Header
  if (ShowHeader) {
    headers.forEach(header => {
      csv += `${header},`;
    });

    // append Label row with line break
    csv += '\n\n';
  }

  fellows.forEach(fellow => {
    let row = '';
    fellowFields.forEach(field => {
      if (field === 'name') {
        row += `${fellow.name},`;
      } else if (field === 'ttlName') {
        row += `${fellow.managerName},`;
      } else {
        row += `${fellow[field]},`;
      }
    });
    // add a line break after each row
    csv += `${row}\n`;
  });

  const link = createLink(csv);

  // Append anchor tag and remove after clicking on it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default jsonToCsv;
