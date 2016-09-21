import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AppService } from './services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private appService: AppService,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.appService.isLogged) {
            return Observable.of(true);
        }
        return Observable.of(true);
    }
}
