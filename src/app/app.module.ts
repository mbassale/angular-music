import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AlbumComponent} from './album/album.component';
import {ArtistComponent} from './artist/artist.component';
import {SearchComponent} from './search/search.component';
import {TrackComponent} from './track/track.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import {SPOTIFY_PROVIDERS} from './spotify.service';
import {AUTH_PROVIDERS} from './auth.service';
import {LoggedInGuard} from './logged-in.guard';
import {LoginComponent} from './login/login.component';
import {environment} from '../environments/environment';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'search', component: SearchComponent, canActivate: [LoggedInGuard]},
  {path: 'artists/:id', component: ArtistComponent, canActivate: [LoggedInGuard]},
  {path: 'tracks/:id', component: TrackComponent, canActivate: [LoggedInGuard]},
  {path: 'albums/:id', component: AlbumComponent, canActivate: [LoggedInGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    ArtistComponent,
    SearchComponent,
    TrackComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AUTH_PROVIDERS,
    SPOTIFY_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: environment.baseUrl},
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
