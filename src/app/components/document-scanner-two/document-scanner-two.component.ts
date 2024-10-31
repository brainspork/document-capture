import { Component } from '@angular/core';
import jscanify from 'jscanify';

@Component({
  selector: 'app-document-scanner-two',
  standalone: true,
  imports: [],
  templateUrl: './document-scanner-two.component.html',
  styleUrl: './document-scanner-two.component.css'
})
export class DocumentScannerTwoComponent {
  capture() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const result = document.getElementById('result') as HTMLCanvasElement;
    const video = document.getElementById('video') as HTMLVideoElement;

    const scanner = new jscanify();
    const canvasCtx = canvas.getContext("2d");
    const resultCtx = result.getContext("2d");
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();

        setInterval(() => {
          canvasCtx!.drawImage(video, 0, 0);
          const resultCanvas = scanner.highlightPaper(canvas);
          resultCtx!.drawImage(resultCanvas, 0, 0);
        }, 10);
      };
    });
  }
}
