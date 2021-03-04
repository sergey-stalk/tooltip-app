import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonComponent} from './components/button/button.component';
import {TooltipDirective} from './derectives/tooltip.directive';

@NgModule({
  declarations: [
    ButtonComponent,
    TooltipDirective,
  ],
  imports: [
    BrowserModule,
  ],
  exports: [ButtonComponent, TooltipDirective, ],
  providers: [],
})
export class SharedModule { }
