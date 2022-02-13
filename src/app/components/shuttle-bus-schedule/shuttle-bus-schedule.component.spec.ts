import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleBusScheduleComponent } from './shuttle-bus-schedule.component';

describe('ShuttleBusScheduleComponent', () => {
	let component: ShuttleBusScheduleComponent;
	let fixture: ComponentFixture<ShuttleBusScheduleComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ ShuttleBusScheduleComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShuttleBusScheduleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
