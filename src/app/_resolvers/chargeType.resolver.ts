
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LockUpService } from '../_services/_organization/LockUp.service';
import { LockUp } from '../entities/organization/LockUp';



@Injectable()
export class ChargeTypeResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(3).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
   /* resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.coreService.LoadLockUpsByMinorCode(0).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }*/
}
