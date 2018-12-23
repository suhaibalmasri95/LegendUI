import { User } from '../entities/organization/User';

import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompanyBranch } from '../entities/organization/CompanyBranch';
import { CompanyBranchService } from '../_services/_organization/CompanyBranch.service';



@Injectable()
export class UserCompany implements Resolve<CompanyBranch[]> {
    user: any;
    constructor(private companyBranchService: CompanyBranchService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<CompanyBranch[]> {
        this.user = JSON.parse(localStorage.getItem('user'));
        return this.companyBranchService.loadCopmanyBranches(null, this.user.CompanyID , null).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
