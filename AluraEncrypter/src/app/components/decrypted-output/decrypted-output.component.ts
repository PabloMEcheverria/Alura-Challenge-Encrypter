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
  textToShow: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci montes, sit et diam risus scelerisque vitae est. Tortor maecenas nunc ut laoreet. Eget diam mauris quam quisque ut eget fringilla sit elit. Libero, sodales duis fames id diam feugiat aliquet non egestas.";
  inputText: string;

  /**/
  trollingText: string = "Estimado Pablo n°2 es de mi agrado informarle por medio de la presente que usted ha sido efectivamente trolleado por mi persona.\n Atte. Pablo N°1."
  /**/

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
