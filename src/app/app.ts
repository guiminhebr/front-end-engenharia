import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadFiles } from './services/upload-files';
import { UploadImages } from './components/upload-images/upload-images';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('EngenhariaFront');
}
