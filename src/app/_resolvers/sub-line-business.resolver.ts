import { SubBusinessService } from './../_services/_setup/SubBusiness.service';
import { SubLineOfBusiness } from './../entities/Setup/SubLineOfBusiness';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class SubLineOfBusinessResolver implements Resolve<SubLineOfBusiness[]> {
    constructor(private sublineService: SubBusinessService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SubLineOfBusiness[]> {
        return this.sublineService.load().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
