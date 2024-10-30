import { Component, OnInit } from '@angular/core';
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
export class DocumentInputComponent implements OnInit {
  formGroup = new FormGroup({
    input: new FormControl()
  });

  urls: string[] = [];

  ngOnInit(): void {
    // this.formGroup.controls.input.valueChanges.subscribe(v => {
    //   const img = URL.createObjectURL(v);
    //   this.urls.push(img);
    // });
  }

}
