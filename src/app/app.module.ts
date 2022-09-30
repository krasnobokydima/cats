import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { catReducer } from './State/reducer';
import { CatEffects } from './State/effects';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { ApiKeyInterceptor } from './interceptors/api-key.interceptor';
import { CatBodyComponent } from './components/cat-body/cat-body.component';
import { CatFooterComponent } from './components/cat-footer/cat-footer.component';
import { CatHeaderComponent } from './components/cat-header/cat-header.component';
import { MaterialModule } from './material/material.module';
import { environment } from 'src/environments/environment';
import { catsStateKey } from './constants/store';

@NgModule({
  declarations: [
    AppComponent,
    CatHeaderComponent,
    CatBodyComponent,
    CatFooterComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({ [catsStateKey]: catReducer }),
    EffectsModule.forRoot([CatEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
