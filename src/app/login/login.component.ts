import {Component, Inject, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {APP_BASE_HREF, Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accessToken: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    route.queryParams.subscribe((params: Params) => {
      console.log('AccessToken', params['access_token']);
      this.accessToken = params['access_token'] || null;
    });
    route.fragment.subscribe((params: string) => {
      if (params === null || params === '') {
        return;
      }
      console.log('Fragment', params);
      const vars = params.split('&');
      for (let i = 0; i < vars.length; i++) {
        const varsParts = vars[i].split('=');
        if (varsParts.length >= 2) {
          const queryKey = decodeURIComponent(varsParts[0]);
          if (queryKey === 'access_token') {
            this.accessToken = decodeURIComponent(varsParts[1]);
            console.log('AccessToken', this.accessToken);
          }
        }
      }
    });
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['search']);
    }
    if (this.accessToken !== null) {
      this.authService.login(this.accessToken);
      this.router.navigate(['search']);
    }
  }

  login(): void {
    const params = [
      `client_id=${environment.spotifyClientId}`,
      'response_type=token',
      'redirect_uri=http://localhost:4200/login'
    ].join('&');
    location.href = `https://accounts.spotify.com/authorize?${params}`;
  }
}
