
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyBranch } from '../entities/organization/CompanyBranch';
import { CompanyBranchService } from '../_services/_organization/CompanyBranch.service';



@Injectable()
export class CompanyBranchResolver implements Resolve<CompanyBranch[]> {
    constructor(private companyBranchService: CompanyBranchService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CompanyBranch[]> {
        return this.companyBranchService.loadCopmanyBranches().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
