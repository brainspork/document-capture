import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentScannerTwoComponent } from './document-scanner-two.component';

describe('DocumentScannerTwoComponent', () => {
  let component: DocumentScannerTwoComponent;
  let fixture: ComponentFixture<DocumentScannerTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentScannerTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentScannerTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
