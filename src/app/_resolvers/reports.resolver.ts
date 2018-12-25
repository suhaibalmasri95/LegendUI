
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReportsGroup } from '../entities/organization/ReportsGroup';
import { ReportsGroupService } from '../_services/_organization/ReportGroup.service';

@Injectable()
export class ReportsGroupResolver implements Resolve<ReportsGroup[]> {
    constructor(private reportsGroupService: ReportsGroupService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<ReportsGroup[]> {
        return this.reportsGroupService.load().pipe(
            catchError(error => {
                //   this.router.navigate(['/organizations']);
                return of(null);
            })
        );
    }
}


