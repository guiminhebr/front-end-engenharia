import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFiles } from '../../services/upload-files';

@Component({
  selector: 'app-upload-images',
  imports: [CommonModule, NgStyle],
  templateUrl: './upload-images.html',
  styleUrl: './upload-images.scss',
})
export class UploadImages implements OnInit {

  selectedFiles!: FileList;  // ← adicione "!" (non-null assertion)
progressInfos: { percentage: number; fileName: string }[] = [];  message = '';
  fileInfos!: Observable<any>;  // ← adicione "!"

  constructor(private uploadService: UploadFiles) { }

  ngOnInit(): void {
  this.fileInfos = this.uploadService.getFiles();
} // ← implemente o método (obrigatório com OnInit)

  selectFiles(event: Event) {  // ← tipo "Event" no parâmetro
    this.progressInfos = [];

    const input = event.target as HTMLInputElement;  // ← cast necessário
    const files = input.files!;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i)!.type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = files;
    } else {
      this.selectedFiles = undefined!;
      (event.target as HTMLInputElement).value = '';  // ← forma correta de limpar input
    }
  }

  uploadFiles() {
    this.message = '';
  this.progressInfos = []; // ← limpa barras do upload anterior
  
  for (let i = 0; i < this.selectedFiles.length; i++) {
    this.upload(i, this.selectedFiles[i]);
  }
  }

  upload(idx: number, file: File) {  // ← tipos nos parâmetros
this.progressInfos[idx] = { percentage: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe({
      next: (event: any) => {  // ← sintaxe moderna do subscribe
        if (event.type === HttpEventType.UploadProgress) {
        this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      error: (err) => {  // ← sintaxe moderna
        this.progressInfos[idx].percentage = 0;
        this.message = 'Could not upload the file: ' + file.name;
      }
    });
  }



}