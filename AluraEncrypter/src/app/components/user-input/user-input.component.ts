import { Component, ElementRef, Renderer2, ViewChild, OnInit, OnDestroy, Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransformTextService } from 'src/app/services/transform-text.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {

  screenHeight: number;
  screenWidht: number;
  isDesktopViewport: boolean;
  inputText: string;
  isAbleToTransform: boolean;

  @ViewChild("textareaInput") textareaInput: ElementRef;

  constructor(private renderer2: Renderer2, private transformText: TransformTextService) {
    this.getScreenSize();
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize($event?: any) {
    this.screenHeight = window.innerHeight;
    this.screenWidht = window.innerWidth;
    if (this.screenWidht < 900 && this.screenWidht < this.screenHeight) {
      this.isDesktopViewport = false;
    } else {
      this.isDesktopViewport = true;
    }
  }

  ngOnInit(): void {
    this.getScreenSize();
    this.transformText.currentText.subscribe(inputText => this.inputText = inputText);
  }

  userInputForm = new FormGroup({
    inputText : new FormControl("", Validators.required)
  });

  encrypt(): void {
    this.inputText = this.userInputForm.value.inputText!;
    this.inputText.trim();
    this.checkValidator(this.inputText);
    this.transformText.encryptService(this.inputText, this.isAbleToTransform);
    this.transformText.sendEncryptEvent();
  }

  decrypt(): void {
    this.inputText = this.userInputForm.value.inputText!;
    this.inputText.trim();
    this.checkValidator(this.inputText);
    this.transformText.decryptService(this.inputText, this.isAbleToTransform);
    this.transformText.sendDecryptEvent();
  }

  checkValidator(input: string): void {
    let hasUppercaseLetter: boolean;
    let hasAccentedLetter: boolean;
    let hasSpecialCharacter: boolean;
    let textToAlert: string = "Las letras mayúsculas, acentuada o carácteres especiales no están permitidas. Usted ingresó: ";

    if(input.search(/[A-Z]/) == -1) {
      hasUppercaseLetter = false;
    } else {
      hasUppercaseLetter = true;
    }

    if (input.search(/[à-üÀ-Ü]/g) == -1) {
      hasAccentedLetter = false;
    } else {
      hasAccentedLetter = true;
    }

    if (input.search(/[^\s\w.:,;'"`´¡!¿? à-üÀ-Ü]/g) == -1) {
      hasSpecialCharacter = false;
    } else {
      hasSpecialCharacter = true;
    }

    if (hasUppercaseLetter && !hasAccentedLetter && !hasSpecialCharacter) {
      textToAlert += "al menos una letra mayúscula.";
    } else if (hasUppercaseLetter && hasAccentedLetter && !hasSpecialCharacter) {
      textToAlert += "al menos una letra mayúscula y al menos una letra acentuada.";
    } else if (hasUppercaseLetter && !hasAccentedLetter && hasSpecialCharacter) {
      textToAlert += "al menos una letra mayúscula y al menos un carácter especial.";
    } else if (hasUppercaseLetter && hasAccentedLetter && hasSpecialCharacter) {
      textToAlert += "al menos una letra mayúscula, al menos una letra acentuada y al menos un carácter especial.";
    } else if (!hasUppercaseLetter && hasAccentedLetter && !hasSpecialCharacter) {
      textToAlert += "al menos una letra acentuada.";
    } else if (!hasUppercaseLetter && hasAccentedLetter && hasSpecialCharacter) {
      textToAlert += "al menos una letra acentuada y al menos un carácter especial.";
    } else if (!hasUppercaseLetter && !hasAccentedLetter && hasSpecialCharacter) {
      textToAlert += "al menos un carácter especial.";
    }
    
    if(hasUppercaseLetter || hasAccentedLetter || hasSpecialCharacter) {
      alert(textToAlert);
      this.isAbleToTransform = false;
    } else {
      this.isAbleToTransform = true;
    }
  }
}
