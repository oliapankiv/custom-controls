import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from '../select/select.module';

import { SelectValue } from '../select/select.component';

import { User } from '../interfaces/user';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, SelectModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	public selectValue: FormControl<SelectValue<User>> = new FormControl([
		new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
		new User(2, 'Niels Bohr', 'niels', 'Denmark'),
	]);

	public selectValueSingle: FormControl<SelectValue<User>> = new FormControl([
		new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
	]);

	public selectValueDisabled: FormControl<SelectValue<User>> = new FormControl({
		value: [new User(1, 'Albert Einstein', 'albert', 'Germany/USA')],
		disabled: true,
	});

	public users: User[] = [
		new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
		new User(2, 'Niels Bohr', 'niels', 'Denmark'),
		new User(3, 'Marie Curie', 'marie', 'Poland/French'),
		new User(4, 'Isaac Newton', 'isaac', 'United Kingdom'),
		new User(5, 'Stephen Hawking', 'stephen', 'United Kingdom', true),
		new User(6, 'Max Planck', 'max', 'Germany'),
		new User(7, 'James Clerk Maxwell', 'james', 'United Kingdom'),
		new User(8, 'Michael Faraday', 'michael', 'United Kingdom'),
		new User(9, 'Richard Feynman', 'richard', 'USA'),
		new User(10, 'Ernest Rutherford', 'ernest', 'New Zealand'),
	];

	public filteredUsers = this.users;

	public ngOnInit(): void {
		this.selectValue.valueChanges.subscribe(this.onSelectionChanged);
	}

	public onSearchChanged(queryString: string): void {
		this.filteredUsers = this.users.filter(user => user.name.toLowerCase().startsWith(queryString.toLowerCase()));
	}

	public displayWithFn(user: User): string {
		return user.name;
	}

	public compareWithFn(user: User | null, user2: User | null): boolean {
		return user?.id === user2?.id;
	}

	public onSelectionChanged(value: unknown): void {
		console.log('Selected value: ', value);
	}
}
