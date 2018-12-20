
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LineOfBusinessService } from '../_services/_setup/LineOfBusiness.service';
import { LineOfBusiness } from '../entities/Setup/lineOfBusiness';



@Injectable()
export class LineOfBusinessResolver implements Resolve<LineOfBusiness[]> {
    constructor(private lineOfBusinessService: LineOfBusinessService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<LineOfBusiness[]> {
        return this.lineOfBusinessService.load().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
