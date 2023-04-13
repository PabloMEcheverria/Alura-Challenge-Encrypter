import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { DecryptedOutputComponent } from './components/decrypted-output/decrypted-output.component';
import { ClipboardModule } from '@angular/cdk/clipboard'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    DecryptedOutputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    ClipboardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
