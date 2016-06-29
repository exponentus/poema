import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AppService } from './services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private appService: AppService,
        private router: Router
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.appService.isLogged) {
            return true;
        }
        // this.router.navigate(['login']);
        // return false;
        return true;
    }
}
