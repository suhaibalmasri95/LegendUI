
import { CoreService } from '../_services/CoreServices.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LockUp } from '../entities/organization/LockUp';
import { LockUpService } from '../_services/_organization/LockUp.service';



@Injectable()
export class CalculationBase implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(41).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
