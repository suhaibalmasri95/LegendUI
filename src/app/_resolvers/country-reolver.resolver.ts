
import { CoreService } from './../_services/CoreServices.service';
import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CountryService } from '../_services/_organization/Country.service';
import { Country } from '../entities/organization/Country';


@Injectable()
export class CountryResolver implements Resolve<Country[]> {
    constructor(private country: CountryService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Country[]> {
        return this.country.loadCountries().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
