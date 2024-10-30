import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-document-scanner',
  standalone: true,
  imports: [],
  templateUrl: './document-scanner.component.html',
  styleUrl: './document-scanner.component.css'
})
export class DocumentScannerComponent implements OnInit {
  @ViewChild('videoStream', { read: ElementRef }) video!: ElementRef<HTMLVideoElement>;
  devices: MediaDeviceInfo[] = [];
  selectedDeviceInd: number = -1;
  localStream?: MediaStream
  isScanning = false;

  async ngOnInit(): Promise<void> {
    this.devices = await this.getCameraDevices();
  }

  async getCameraDevices() {
    const cameraDevices = [];

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    const devices = await navigator.mediaDevices.enumerateDevices();

    for (let device of devices) {
      if (device.kind === 'videoinput') {
        cameraDevices.push(device);
      }
    }

    const tracks = stream.getTracks();

    for (let track of tracks) {
      track.stop();
    }

    return cameraDevices;
  }

  startSelectedCamera() {
    const device = this.devices[this.selectedDeviceInd];
    if (device) {
    }
    this.play()

    this.isScanning = true;
  }

  play() {
    navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 720, facingMode: { exact: "environment" } },
      audio: false
    }).then((stream) => {
      this.localStream = stream;
      this.video.nativeElement.srcObject = stream;

      if ("ImageCapture" in window) {
        console.log("ImageCapture supported");
        const track = this.localStream.getVideoTracks()[0];
        // this.imageCapture = new window.ImageCapture(track);
      }else{
        console.log("ImageCapture not supported");
      }
    });
  };

  stop() {
    try {
      if (this.localStream) {
        const tracks = this.localStream.getTracks();
        for (let i = 0; i < tracks.length; i++) {
          const track = tracks[i];
          track.stop();
        }
      }
    } catch (e: any) {
      alert(e.message);
    }

  }
}