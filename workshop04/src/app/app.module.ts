import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CustomHammerConfig } from './customhammerconfig';

import { HttpClientModule } from '@angular/common/http';

import { StarWarsService } from './starwars.service';
import { StarWarsStorageService } from './starwarsstorage.service';
import { ModelComponent } from './components/model.component';
import { AppRoutesModule } from './app-routes.module';
import { SearchComponent } from './components/search.component';
import { CardComponent } from './components/card.component';

@NgModule({
  declarations: [
    AppComponent,
    ModelComponent,
    SearchComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutesModule
  ],
  providers: [StarWarsService, StarWarsStorageService,
  {provide: HAMMER_GESTURE_CONFIG,
  useClass: CustomHammerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
