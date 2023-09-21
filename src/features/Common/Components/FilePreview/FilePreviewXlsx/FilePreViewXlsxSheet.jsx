import { useEffect, useRef, useState } from 'react';
import { MdOutlineSaveAlt } from 'react-icons/md';
import Spreadsheet from 'x-data-spreadsheet';
import * as XLSX from 'xlsx';
import { getArrayBufferFromURL } from '../../../../../app/Services/UploadService';
import exportSheet from './ExportXLSX';
import './FilePreviewXlsx.scss';

const FilePreviewXlsxSheet = ({ file, options }) => {
  const [dataXlsx, setDataXlsx] = useState({});
  const filePath = file.storage_path;
  const sheetEl = useRef(null);
  const sheetRef = useRef(null);

  const stox = (wb) => {
    const out = [];
    wb.SheetNames.forEach((name) => {
      const o = { name, rows: {} };
      const ws = wb.Sheets[name];
      const aoa = XLSX.utils.sheet_to_json(ws, {
        raw: false,
        header: 1,
      });

      aoa.forEach((r, i) => {
        const cells = {};
        r.forEach((c, j) => {
          cells[j] = { text: c };

          const cellRef = XLSX.utils.encode_cell({ r: i, c: j });

          if (ws[cellRef] != null && ws[cellRef].f != null) {
            cells[j].number = `'=' + ${String(ws[cellRef].f)}`;
          }
        });
        o.rows[i] = { cells };
      });

      out.push(o);
    });

    return out;
  };

  useEffect(() => {
    const element = sheetEl.current;
    const sheet = new Spreadsheet('#x-spreadsheet-demo', {
      mode: 'read',
      showContextmenu: false,
      showToolbar: false,
      view: {
        height: () => document.documentElement.clientHeight - 107,
        width: () => document.documentElement.clientWidth + 2,
      },
      row: {
        len: 100,
        height: 28,
      },
      ...options,
    }).loadData(dataXlsx);
    sheet.validate();

    sheetRef.current = sheet;
    return () => {
      element.innerHTML = '';
    };
  }, [options, file, dataXlsx]);

  // read as arraybuffer
  const processWB = (wb) => {
    // const xspr = sheetEl.current?.grid;
    setDataXlsx(stox(wb));
    // xspr.loadData(data);
  };
  const readDataFromFile = (bufferArray) => {
    const wb = XLSX.read(bufferArray, { type: 'array' });

    wb.SheetNames.forEach((sheetName) => {
      const XLRowObject = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      return XLRowObject;
    });
    processWB(wb);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getArrayBufferFromURL(filePath).then((res) => {
      readDataFromFile(res);
    });
  }, [file]);

  useEffect(() => {
    const widthExcel = document.getElementsByClassName('x-spreadsheet-sheet');
    widthExcel[0].style.width = '100%';
  }, [file]);

  return (
    <>
      {options && (
        <div className="flex justify-start bg-white py-2 pl-8">
          <MdOutlineSaveAlt size="26" color="#292961" />
          <button
            type="button"
            className="mx-3 border-2 border-solid px-3 font-semibold"
            onClick={() => exportSheet(sheetRef.current, file.name)}
          >
            Save
          </button>
        </div>
      )}
      <div id="x-spreadsheet-demo" className="bg-[#F5F6F7]" ref={sheetEl} />
    </>
  );
};

export default FilePreviewXlsxSheet;
