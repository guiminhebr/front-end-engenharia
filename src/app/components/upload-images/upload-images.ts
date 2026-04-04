import { Component, OnInit } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFiles } from '../../services/upload-files';
import { map } from 'rxjs';
@Component({
  selector: 'app-upload-images',
  imports: [CommonModule, NgStyle],
  templateUrl: './upload-images.html',
  styleUrl: './upload-images.scss',
})
export class UploadImages implements OnInit {
    previews: string[] = [];
  selectedFiles!: FileList;  // ← adicione "!" (non-null assertion)
progressInfos: { percentage: number; fileName: string }[] = [];  message = '';
  fileInfos!: Observable<any>;  // ← adicione "!"
  messageType: 'success' | 'error' = 'success';


  constructor(private uploadService: UploadFiles) { }

 private imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];

private getExt(name: string): string {
  return name.split('.').pop()?.toLowerCase() ?? '';
}

ngOnInit(): void {
  this.fileInfos = this.uploadService.getFiles().pipe(
    map((files: any[]) => files.filter(f => this.imageExts.includes(this.getExt(f.name))))
  );
}
loadFiles(): void {
  this.fileInfos = this.uploadService.getFiles().pipe(
    map((files: any[]) =>
      files.filter((f) => this.imageExts.includes(this.getExt(f.name)))
    )
  );
}


  selectFiles(event: Event) {  // ← tipo "Event" no parâmetro
      this.progressInfos = [];
  this.previews = []; // 👈 limpa previews

  const input = event.target as HTMLInputElement;
  const files = input.files!;
  let isImage = true;

  for (let i = 0; i < files.length; i++) {
    if (!files.item(i)!.type.match('image.*')) {
      isImage = false;
      alert('O arquivo não é imagem!');
      break;
    }
  }

  if (isImage) {
    this.selectedFiles = files;

    // 🔥 cria preview
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(files[i]);
    }

  } else {
    this.selectedFiles = undefined!;
    input.value = '';
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
         this.fileInfos = this.uploadService.getFiles().pipe(
    map((files: any[]) => files.filter(f => this.imageExts.includes(this.getExt(f.name))))
  );

        }
      },
      error: (err) => {  // ← sintaxe moderna
        this.progressInfos[idx].percentage = 0;
        this.message = 'Não foi possivel fazer o upload do arquivo: ' + file.name;
      }
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
    });
  }



}