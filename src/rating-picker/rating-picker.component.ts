import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RatingPickerOption } from './rating-picker-option.enum';

export type RatingOptions = RatingPickerOption | null;

@Component({
	selector: 'rating-picker',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './rating-picker.component.html',
	styleUrls: ['./rating-picker.component.scss'],
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: RatingPickerComponent, multi: true }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerComponent implements OnChanges, ControlValueAccessor {
	@Input() public value: RatingOptions = null;
	@Input() public disabled = false;

	@Output() public readonly change = new EventEmitter<RatingOptions>();

	@Input()
	@HostBinding('attr.tabIndex')
	tabIndex = 0;

	@HostListener('blur') onBlur() {
		this.onTouch();
	}

	public options = [
		{ key: RatingPickerOption.great, value: '👌' },
		{ key: RatingPickerOption.good, value: '😊' },
		{ key: RatingPickerOption.neutral, value: '😐' },
		{ key: RatingPickerOption.bad, value: '🥺' },
	];

	public onChange: (newValue: RatingOptions) => void = () => {};
	public onTouch: () => void = () => {};

	constructor(private cd: ChangeDetectorRef) {}

	public ngOnChanges(changes: SimpleChanges): void {
		changes['value'] && this.onChange(changes['value'].currentValue);
	}

	public writeValue(obj: RatingOptions): void {
		this.value = obj;
		this.cd.markForCheck();
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
		this.cd.markForCheck();
	}

	public setValue(value: RatingOptions) {
		if (this.disabled) return;

		this.value = value;
		this.onChange(this.value);
		this.onTouch();
		this.change.emit(this.value);
	}
}