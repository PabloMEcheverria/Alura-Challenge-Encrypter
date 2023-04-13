import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptedOutputComponent } from './decrypted-output.component';

describe('DecryptedOutputComponent', () => {
  let component: DecryptedOutputComponent;
  let fixture: ComponentFixture<DecryptedOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecryptedOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecryptedOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
