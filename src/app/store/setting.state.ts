import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ToggleShowTimeLeft } from './setting.action';
import { SettingStateModel } from './setting.models';

@State<SettingStateModel>({
	name: 'setting',
	defaults: {
		showTimeLeft: Boolean(localStorage.getItem('showTimeLeft'))
	}
})

@Injectable()
export class SettingState {
	constructor() {}

	@Selector()
	static showTimeLeft(state: SettingStateModel): boolean {
		return state?.showTimeLeft;
	}

	@Action(ToggleShowTimeLeft)
	toggleShowTimeLeft(ctx: StateContext<SettingStateModel>, action: ToggleShowTimeLeft) {
		const state = ctx.getState();
		ctx.setState({
			...state,
			showTimeLeft: action.value
		});

		localStorage.setItem('showTimeLeft', `${state.showTimeLeft}`);
	}
}
