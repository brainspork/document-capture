import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-document-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './document-input.component.html',
  styleUrl: './document-input.component.css'
})
export class DocumentInputComponent {
  private _files: Array<{ file: File, url: string }> = [];

  @ViewChild('fileSelector', {read: ElementRef}) inputEl!: ElementRef<HTMLInputElement>;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this._files.push(...Object.values(event).map(f => ({ file: f, url: URL.createObjectURL(f) })));
    this.inputEl.nativeElement.value = '';
  }

  public get files(): Array<{ file: File, url: string }> {
    return this._files;
  }

  public get size(): number {
    return this._files.reduce((a, b) => a + b.file.size, 0);
  }

  async download() {
    await this.combineImagesToPDF();
  }

  async combineImagesToPDF(): Promise<void> {
    const doc = new jsPDF();
    const urls = this._files.map(f => f.url);

    for (const imageUrl of urls) {
      const image = await this.loadImage(imageUrl);

      if (image) {
        doc.addImage(image, 'PNG', 10, 10, 180, 240);
        if (imageUrl !== urls[urls.length - 1]) {
          doc.addPage();
        }
      }
    }

    doc.save('test.pdf');
  }

  loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  remove(ind: number) {
    this._files.splice(ind, 1);
  }
}
