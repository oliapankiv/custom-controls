import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	HostListener,
	Input,
	Output,
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
	selector: 'custom-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent<T> implements Highlightable {
	@Input() public value: T | null = null;
	@Input() public disabledReason = '';

	@Input()
	@HostBinding('class.disabled')
	public disabled = false;

	@Output() public readonly selected = new EventEmitter<OptionComponent<T>>();

	@HostListener('click')
	protected select() {
		if (this.disabled) return;

		this.highlightAsSelected();
		this.selected.emit(this);
	}

	@HostBinding('class.selected') protected isSelected = false;
	@HostBinding('class.active') protected isActive = false;

	constructor(
		private cd: ChangeDetectorRef,
		private el: ElementRef<HTMLElement>
	) {}

	public setActiveStyles(): void {
		this.isActive = true;
		this.cd.markForCheck();
	}

	public setInactiveStyles(): void {
		this.isActive = false;
		this.cd.markForCheck();
	}

	public scrollIntoView(options?: ScrollIntoViewOptions): void {
		this.el.nativeElement.scrollIntoView(options);
	}

	public highlightAsSelected(): void {
		this.isSelected = true;
		this.cd.markForCheck();
	}

	public deselect(): void {
		this.isSelected = false;
		this.cd.markForCheck();
	}
}
