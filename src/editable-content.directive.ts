import { Directive, ElementRef, HostListener, Renderer2, SecurityContext } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

const DEFAULT_REVIEW_TEMPLATE = `
	<h4 data-placeholder="Title"></h4>
	<p data-placeholder="Description"></p>
`;

@Directive({
	selector: '[formControlName][contenteditable],[formControl][contenteditable],[ngModel][contenteditable]',
	standalone: true,
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: EditableContentValueAccessor, multi: true }],
})
export class EditableContentValueAccessor implements ControlValueAccessor {
	@HostListener('input', ['$event']) public onInput(e: Event) {
		this.onChange((e.target as HTMLElement).innerHTML);
	}

	@HostListener('blur') public onBlur() {
		this.onTouch();
	}

	public onChange!: (newValue: string) => void;
	public onTouch!: () => void;

	constructor(
		private renderer: Renderer2,
		private elementRef: ElementRef,
		private sanitizer: DomSanitizer
	) {}

	public writeValue(obj: any): void {
		this.renderer.setProperty(
			this.elementRef.nativeElement,
			'innerHTML',
			this.sanitizer.sanitize(SecurityContext.HTML, obj) || DEFAULT_REVIEW_TEMPLATE
		);
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouch = fn;
	}

	public setDisabledState?(isDisabled: boolean): void {
		this.renderer.setProperty(this.elementRef.nativeElement, 'contentEditable', !isDisabled);
	}
}
