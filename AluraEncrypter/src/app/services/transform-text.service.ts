import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformTextService {

  private textSource = new BehaviorSubject<string>("");
  currentText = this.textSource.asObservable();

  private subject = new Subject<void>();

  sendEncryptEvent() {
    this.subject.next();
  }

  getEncryptEvent(): Observable<any>{
    return this.subject.asObservable();
  }

  sendDecryptEvent() {
    this.subject.next();
  }

  getDecryptEvent(): Observable<any>{
    return this.subject.asObservable();
  }

  constructor() { }

  encryptService(text: string, validatorBoolean: boolean): void {
    if(validatorBoolean) {
      text = text.replace(/a/g, "AI");
      text = text.replace(/e/g, "ENTER");
      text = text.replace(/i/g, "IMES");
      text = text.replace(/o/g, "OBER");
      text = text.replace(/u/g, "UFAT");
      text = text.toLowerCase();
      this.textSource.next(text);
    } else {
      console.log("Failed the validation check.");
    }
  }

  decryptService(text: string, validatorBoolean: boolean): void {
    if(validatorBoolean) {
      text = text.replace(/ai/g, "a");
      text = text.replace(/enter/g, "e");
      text = text.replace(/imes/g, "i");
      text = text.replace(/ober/g, "o");
      text = text.replace(/ufat/g, "u");
      this.textSource.next(text);
    } else {
      console.log("Failed the validation check.");
    }
  }
}
