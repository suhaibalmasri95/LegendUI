
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Bank } from '../entities/organization/Bank';
import { BanksService } from '../_services/_organization/Banks.service';


@Injectable()
export class BankResolver implements Resolve<Bank[]> {
    constructor(private bankService: BanksService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Bank[]> {
        return this.bankService.loadBanks().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
