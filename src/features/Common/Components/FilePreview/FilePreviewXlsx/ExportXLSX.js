import * as XLSX from 'xlsx';

function xtos(sdata) {
  const out = XLSX.utils.book_new();
  sdata.forEach((xws) => {
    const aoa = [[]];
    const rowobj = xws.rows;
    for (let ri = 0; ri < rowobj.len; ri += 1) {
      const row = rowobj[ri];
      // eslint-disable-next-line no-continue
      if (!row) continue;
      aoa[ri] = [];
      Object.keys(row.cells).forEach((k) => {
        const idx = +k;
        // eslint-disable-next-line no-restricted-globals
        if (isNaN(idx)) return;
        aoa[ri][idx] = row.cells[k].text;
      });
    }
    const ws = XLSX.utils.aoa_to_sheet(aoa);
    XLSX.utils.book_append_sheet(out, ws, xws.name);
    ws['!merges'] = xws.merges.map((range) => XLSX.utils.decode_range(range));
    // add f for formula if starts with =
    Object.keys(ws).forEach((cell) => {
      const cellObj = ws[cell];
      if (cellObj && cellObj.v && cellObj.v[0] === '=') {
        cellObj.f = cellObj.v;
        delete cellObj.v;
      }
    });
  });
  return out;
}

function exportSheet(sheet, filename) {
  /* build workbook from the grid data */
  const newWb = xtos(sheet.getData());
  // console.log(XLSX.utils.sheet_to_json(new_wb.Sheets.sheet2));
  /* generate download */
  try {
    XLSX.writeFile(newWb, filename || 'Export.xlsx');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

export default exportSheet;
