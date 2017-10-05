
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  login(accessToken: string): boolean {
    if (accessToken !== null) {
      localStorage.setItem('accessToken', accessToken);
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  getAccessToken(): string {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return this.getAccessToken() !== null;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
