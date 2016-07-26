import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { AppService } from './services';

@Injectable()
export class RedirectGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (state.url === '/') {
            let s = 'id=project-form&projectId=';
            let index = location.search.indexOf(s);
            if (index != -1) {
                let id = location.search.substring(index + s.length, location.search.length);
                // history.replaceState({}, '', location.pathname);
                // this.router.navigate(['/projects/' + id]);
                location.href = location.protocol + '//' + location.host + location.pathname + '#/projects/' + id;
                return false;
            }

            s = 'id=task-form&taskId=';
            index = location.search.indexOf(s);
            if (index != -1) {
                let id = location.search.substring(index + s.length, location.search.length);
                // history.replaceState({}, '', location.pathname);
                // this.router.navigate(['/task/' + id]);
                location.href = location.protocol + '//' + location.host + location.pathname + '#/task/' + id;
                return false;
            }
        }

        return true;
    }
}
