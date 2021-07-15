import { Component, OnInit } from '@angular/core';
import { XLSX$Consts } from 'xlsx/types';
import { ParsedData } from '../parsedData.type';
import { ParserService } from '../parser.service';
import { UploadedFile } from './uploadedFile.type';

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.scss']
})
export class ParserComponent implements OnInit {

  constructor(private parserService: ParserService) { }

  ngOnInit(): void { }

  uploadedFile: UploadedFile = null;
  parsedFile: ParsedData[] = [];
  parsed: boolean = false;

  async handleFileInput(event: Event): Promise<void> {
    this.resetFileUpload();
    if (event === null) {
      return;
    }
    
    // Cast target to HTMLInputElement to be able to target files
    const files = (<HTMLInputElement>event.target).files;

    // Check if files are null
    if (files === null) {
      return;
    }

    // Check if there are any files
    if (files.length === 0) {
      return;
    }

    // For the purpose of this code example, we take the first statically
    const file = files[0];

    // Set the file to be able to parse it later
    this.uploadedFile = file;
  }

  resetFileUpload(): void {
    this.parsed = false;
    this.uploadedFile = null;
    this.parsedFile = [];
  }

  async startParsing(): Promise<void> {
    this.parsedFile = await this.parserService.parseFile(this.uploadedFile);
    this.parsed = true;
  }

  getData(index: number, property: string): any[] {
    return this.parsedFile[index].data.map((sheetData: any) => {
      return sheetData[property];
    });
  }
}
