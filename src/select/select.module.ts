import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';

@NgModule({
	declarations: [SelectComponent, OptionComponent],
	imports: [CommonModule, OverlayModule],
	exports: [SelectComponent, OptionComponent],
})
export class SelectModule {}
