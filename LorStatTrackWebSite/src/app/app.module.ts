import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { DeckComponent } from './track-winrate-page/trackwinrate/deck/deck.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackwinrateComponent } from './track-winrate-page/trackwinrate/trackwinrate.component';
import { SettingsComponent } from './track-winrate-page/trackwinrate/settings/settings.component';
import { TrackWinratePageComponent } from './track-winrate-page/track-winrate-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    TrackwinrateComponent,
    SettingsComponent,
    TrackWinratePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
