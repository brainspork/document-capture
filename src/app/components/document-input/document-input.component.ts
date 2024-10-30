import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  formGroup = new FormGroup({
    input: new FormControl()
  });
}
