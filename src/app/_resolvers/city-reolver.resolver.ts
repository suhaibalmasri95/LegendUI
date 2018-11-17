
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { City } from '../entities/organization/City';
import { CityService } from '../_services/_organization/City.service';

@Injectable()
export class CityResolver implements Resolve<City[]> {
    constructor(private cityService: CityService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<City[]> {
        return this.cityService.loadCities(null).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
