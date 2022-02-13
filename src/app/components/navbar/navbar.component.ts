import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ToggleShowTimeLeft } from '../../store/setting.action';
import { SettingState } from '../../store/setting.state';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
	@Select(SettingState.showTimeLeft) showTimeLeft$: Observable<boolean>;
	checked: boolean;
	constructor(private store: Store) {
		this.checked = this.store.selectSnapshot(SettingState.showTimeLeft);
	}

	toggleChange(event: MatSlideToggleChange) {
		this.store.dispatch(new ToggleShowTimeLeft(event.checked));
		this.checked = event.checked;
	}
}
