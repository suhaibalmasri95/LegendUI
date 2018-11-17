
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../entities/organization/Company';
import { CompanyService } from '../_services/_organization/Company.service';


@Injectable()
export class CompanyResolver implements Resolve<Company[]> {
    constructor(private companyService: CompanyService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Company[]> {
        return this.companyService.loadCompanies().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
