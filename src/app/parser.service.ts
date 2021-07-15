import { Injectable } from '@angular/core';
import { UploadedFile } from './parser/uploadedFile.type';
import { ParsedData } from './parsedData.type';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  async parseFile(file: UploadedFile): Promise<ParsedData[]> {
    if (file === null) {
      return [];
    }

    const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
    const workBook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'buffer'} );

    const parsedWorkSheets: ParsedData[] = workBook.SheetNames.map((workSheetName) => {
      const data: XLSX.WorkSheet = XLSX.utils.sheet_to_json(
        workBook.Sheets[workSheetName], 
        { 
          header: "A", 
          blankrows: false 
        }
      );

      const tableHeaders: string[] = data.shift();
      return {
        'name': workSheetName,
        'tableHeaders': tableHeaders,
        'data': data
      }
    });

    return parsedWorkSheets;
  }
}
