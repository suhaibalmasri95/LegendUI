import { LockUpService } from './../_services/_organization/LockUp.service';
import { LockUp } from './../entities/organization/LockUp';

import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class AppliedOnResolver implements Resolve<LockUp[]> {
    constructor(private lockupService: LockUpService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockupService.LoadLockUpsByMajorCode(17).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
