import { CoversService } from './../_services/_setup/Covers.service';
import { Cover } from './../entities/Setup/Charges';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable()
export class CoverResolver implements Resolve<Cover[]> {
    constructor(private coverService: CoversService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Cover[]> {
        return this.coverService.load(null, 1, null, null , 1).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
