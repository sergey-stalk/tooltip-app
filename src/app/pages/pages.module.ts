import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonsViewComponent} from './components/buttons-view/buttons-view.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ButtonsViewComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  exports: [ButtonsViewComponent],
  providers: [],
})
export class PagesModule { }
