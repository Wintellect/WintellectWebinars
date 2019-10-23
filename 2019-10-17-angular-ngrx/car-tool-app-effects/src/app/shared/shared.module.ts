import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolHeaderComponent } from './components/tool-header/tool-header.component';


@NgModule({
  declarations: [ ToolHeaderComponent ],
  exports: [ ToolHeaderComponent ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
