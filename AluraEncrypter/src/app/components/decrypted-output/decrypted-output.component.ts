import { Component } from '@angular/core';
import { TransformTextService } from 'src/app/services/transform-text.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-decrypted-output',
  templateUrl: './decrypted-output.component.html',
  styleUrls: ['./decrypted-output.component.css']
})
export class DecryptedOutputComponent {
  isEmptyInput: boolean = true;
  textToShow: string;
  inputText: string;

  encryptedText: string;
  decryptedText: string;

  encryptEventSubscriptor: Subscription;
  decryptEventSubscriptor: Subscription;

  constructor(private transformText: TransformTextService) {
    this.encryptEventSubscriptor = this.transformText.getEncryptEvent().subscribe(() => {
    this.encryptedText = this.inputText;
    if (this.encryptedText.length != 0) {
      this.isEmptyInput = false;
    } else {
      this.isEmptyInput = true;
    }
    this.textToShow = this.encryptedText;
    });

    this.decryptEventSubscriptor = this.transformText.getDecryptEvent().subscribe(() => {
      this.decryptedText = this.inputText;
      if (this.decryptedText.length != 0) {
        this.isEmptyInput = false;
      } else {
        this.isEmptyInput = true;
      }
      this.textToShow = this.decryptedText;
    });
  }

  ngOnInit() {
    this.transformText.currentText.subscribe(inputText => this.inputText = inputText);
  }
}
