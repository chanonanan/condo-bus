import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { SecondComponent } from './pages/second/second.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ShuttleBusScheduleComponent } from './components/shuttle-bus-schedule/shuttle-bus-schedule.component';

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

		MatToolbarModule,
		MatIconModule,
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
