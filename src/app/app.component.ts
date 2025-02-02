import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentInputComponent } from './components/document-input/document-input.component';
import { DocumentScannerComponent } from './components/document-scanner/document-scanner.component';
import { DocumentScannerTwoComponent } from './components/document-scanner-two/document-scanner-two.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DocumentInputComponent,
    DocumentScannerComponent,
    // DocumentScannerTwoComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'document-capture';
}
