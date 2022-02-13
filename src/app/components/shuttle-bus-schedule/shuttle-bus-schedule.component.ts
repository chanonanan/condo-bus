import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, defer, Observable, of, Subject, timer } from 'rxjs';
import { repeatWhen, takeUntil } from 'rxjs/operators';
import { SCHEDULE } from './shuttle-bus-schedule.const';
import { Select } from '@ngxs/store';
import { SettingState } from '../../store/setting.state';

@Component({
	selector: 'app-shuttle-bus-schedule',
	templateUrl: './shuttle-bus-schedule.component.html',
	styleUrls: ['./shuttle-bus-schedule.component.scss']
})
export class ShuttleBusScheduleComponent implements OnInit, OnDestroy {

	@Select(SettingState.showTimeLeft) showTimeLeft$: Observable<boolean>;
	aboutToRide = false;
	noMoreRide = false;
	text = '';

	private ngOnDestroy$: Subject<void> = new Subject();

	constructor() { }

	ngOnInit(): void {
		combineLatest([
			of(true).pipe(
				repeatWhen(this.timeObserver)
			),
			this.showTimeLeft$
		]).pipe(
			takeUntil(this.ngOnDestroy$)
		).subscribe(([, showTimeLeft]) => {
			const currentTime = new Date();
			let hour = currentTime.getHours().toString().padStart(2, '0');
			let minute = currentTime.getMinutes().toString().padStart(2, '0');
			const timeStr = `${hour}:${minute}`;

			const next = SCHEDULE.schedule.find(schedule => timeStr <= schedule.time );

			this.noMoreRide = !next;
			if (!next) {
				console.log('ไม่มีรถแล้ว');
				this.text = 'ไม่มีรถแล้ว';
			} else if (next.time === timeStr) {
				console.log('รถกำลังออกแล้ว');
				this.text = 'รถกำลังออกแล้ว';
			} else {

				const [ nextHour, nextMinute ] = next.time.split(':');
				const nextTime = new Date().setHours(+nextHour, +nextMinute, 0, 0);
				const millis = (nextTime - currentTime.getTime());
				const minutes = Math.floor(millis / 60000);
				console.log(`รถรอบถัดไปคือ ${next.time}`);
				console.log(`รถกำลังจะออกใน ${minutes} นาที`);

				if (showTimeLeft) {
					this.text = `รถกำลังจะออกใน ${minutes} นาที`;
				} else {
					this.text = `รถรอบถัดไปคือ ${next.time}`;
				}

				this.aboutToRide = minutes <= 5;
			}
		});
	}

	ngOnDestroy(): void {
		this.ngOnDestroy$.next();
		this.ngOnDestroy$.complete();
	}

	private timeObserver() {
		return defer(() => {
			const timeAtSubscription = new Date();
			const nextMinute = new Date().setMinutes(timeAtSubscription.getMinutes() +1, 0, 0);
			const initialDelay = nextMinute - timeAtSubscription.getTime();
			// repeat every 10 minute
			const repeat = 1000 * 60;
			return timer(initialDelay, repeat);
		});
	}

}
