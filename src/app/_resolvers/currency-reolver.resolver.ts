
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CurrencyService } from '../_services/_organization/Currency.service';
import { Currency } from '../entities/organization/Currency';



@Injectable()
export class CurrencyResolver implements Resolve<Currency[]> {
    constructor(private currencyService: CurrencyService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Currency[]> {
        return this.currencyService.loadCurrencies().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
