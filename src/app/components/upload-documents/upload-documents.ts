import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFiles } from '../../services/upload-files';
import { map } from 'rxjs';
// Tipos aceitos
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

// Ícone por tipo de arquivo
function getFileIcon(type: string): string {
  if (type === 'application/pdf') return '📄';
  if (type.includes('word')) return '📝';
  if (type.includes('excel') || type.includes('sheet')) return '📊';
  if (type === 'text/plain') return '🗒️';
  return '📁';
}

@Component({
  selector: 'app-upload-documents',
  imports: [CommonModule, NgStyle],
  templateUrl: './upload-documents.html',
})
export class UploadDocuments implements OnInit {
  selectedFiles!: FileList;
  progressInfos: { percentage: number; fileName: string; icon: string }[] = [];
  message = '';
  fileInfos!: Observable<any>;
  messageType: 'success' | 'error' = 'success';


  constructor(private uploadService: UploadFiles) {}

  private docExts = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'];

private getExt(name: string): string {
  return name.split('.').pop()?.toLowerCase() ?? '';
}

ngOnInit(): void {
  this.fileInfos = this.uploadService.getFiles().pipe(
    map((files: any[]) => files.filter(f => this.docExts.includes(this.getExt(f.name))))
  );
}

loadFiles(): void {
  this.fileInfos = this.uploadService.getFiles().pipe(
    map((files: any[]) =>
      files.filter((f) => this.docExts.includes(this.getExt(f.name)))
    )
  );
}






  selectFiles(event: Event) {
    this.progressInfos = [];
    this.message = '';

    const input = event.target as HTMLInputElement;
    const files = input.files!;
    let valid = true;

    for (let i = 0; i < files.length; i++) {
      if (!ALLOWED_TYPES.includes(files.item(i)!.type)) {
        valid = false;
        alert(`Arquivo inválido: ${files.item(i)!.name}. Envie apenas PDF, Word, Excel ou TXT.`);
        break;
      }
    }

    if (valid) {
      this.selectedFiles = files;
    } else {
      this.selectedFiles = undefined!;
      input.value = '';
    }
  }

  uploadFiles() {
    this.message = '';
    this.progressInfos = [];

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }


  

  upload(idx: number, file: File) {
    this.progressInfos[idx] = {
      percentage: 0,
      fileName: file.name,
      icon: getFileIcon(file.type),
    };

    this.uploadService.upload(file).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadService.getFiles().pipe(
    map((files: any[]) => files.filter(f => this.docExts.includes(this.getExt(f.name))))
  );
        }
      },
      error: () => {
        this.progressInfos[idx].percentage = 0;
        this.message = 'Não foi possível fazer o upload de: ' + file.name;
      },
    });
  }


  deleteFile(filename: string) {
  if (!confirm(`Deseja excluir "${filename}"?`)) return;

  this.uploadService.deleteFile(filename).subscribe({
    next: () => {
      this.message = `"${filename}" excluído com sucesso!`;
      this.messageType = 'success';
      this.loadFiles();
    },
    error: () => {
      this.message = `Erro ao excluir "${filename}".`;
      this.messageType = 'error';
    },
  })

}

  


   

}