import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { SecondComponent } from './pages/second/second.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

import { ShuttleBusScheduleComponent } from './components/shuttle-bus-schedule/shuttle-bus-schedule.component';
import { SettingState } from './store/setting.state';
@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SecondComponent,
		NavbarComponent,
		ShuttleBusScheduleComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		}),
		BrowserAnimationsModule,
		FormsModule,

		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
		MatSlideToggleModule,
		MatCardModule,

		NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
		NgxsModule.forRoot([SettingState], {
			developmentMode: !environment.production
		})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
