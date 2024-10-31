import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-scanner',
  standalone: true,
  imports: [],
  templateUrl: './document-scanner.component.html',
  styleUrl: './document-scanner.component.css'
})
export class DocumentScannerComponent implements AfterViewInit {
  @ViewChild('videoCapture', { read: ElementRef }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('refCanvas', { read: ElementRef }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('photo', { read: ElementRef }) photo!: ElementRef<HTMLImageElement>;

  width: number = 320;
  height: number = 0;
  streaming: boolean = false;

  ngAfterViewInit(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      })
      .catch(err => console.error(`An error occured: ${err}`));

    this.video.nativeElement.addEventListener(
      'canplay',
      () => {
        if (!this.streaming) {
          this.height = (this.video.nativeElement.videoHeight / this.video.nativeElement.videoWidth) * this.width;

          this.video.nativeElement.setAttribute('width', this.width.toString());
          this.video.nativeElement.setAttribute('width', this.height.toString());
          this.canvas.nativeElement.setAttribute('width', this.width.toString());
          this.canvas.nativeElement.setAttribute('width', this.height.toString());
          this.streaming = true;
        }
      },
      false
    );

    this.clearPhoto();
  }

  public takePicture(event: Event) {
    event.preventDefault();

    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) return;

    if (this.width && this.height) {
      this.canvas.nativeElement.width = this.width;
      this.canvas.nativeElement.height = this.height;

      context.drawImage(this.video.nativeElement, 0, 0, this.width, this.height);

      const data = this.canvas.nativeElement.toDataURL('image/png');
      this.photo.nativeElement.setAttribute('src', data);
    } else {
      this.clearPhoto();
    }
  }

  public clearPhoto() {
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) return;

    context.fillStyle = '#AAA';
    context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    const data = this.canvas.nativeElement.toDataURL('image/png');
    this.photo.nativeElement.setAttribute('src', data);
  }
}