
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BankBranchService } from '../_services/_organization/BankBranch.service';
import { BankBranch } from '../entities/organization/BankBranch';


@Injectable()
export class BankBranchResolver implements Resolve<BankBranch[]> {
    constructor(private bankBranchService: BankBranchService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<BankBranch[]> {
        return this.bankBranchService.loadBranches().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
