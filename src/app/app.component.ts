import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { RatingPickerComponent } from '../rating-picker/rating-picker.component';

import { RatingPickerOption } from '../rating-picker/rating-picker-option.enum';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ReactiveFormsModule, RatingPickerComponent, JsonPipe],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	public readonly form = new FormGroup({
		review: new FormControl(RatingPickerOption.good),
	});

	public ngOnInit(): void {
		setTimeout(() => {
			this.form.controls.review.setValue(RatingPickerOption.great);
		}, 3000);
	}

	public onSubmit(): void {
		console.log(this.form.value);
	}
}
