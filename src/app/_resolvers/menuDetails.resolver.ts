import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { System } from '../entities/models/MenuDetails';
import { MenuDetailsService } from '../_services/_organization/MenuDetails.service';

@Injectable()
export class SystemsResolver implements Resolve<System[]> {
    constructor(private menuDetailsService: MenuDetailsService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<System[]> {
        return this.menuDetailsService.load(1).pipe(
            catchError(error => {
                //   this.router.navigate(['/organizations']);
                return of(null);
            })
        );
    }
}
// @Injectable()
// export class GroubsResolver implements Resolve<Group[]> {
//     constructor(private groupService: GroupService, private router: Router) { }

//     resolve(route: ActivatedRouteSnapshot): Observable<Group[]> {
//         return this.groupService.load().pipe(
//             catchError(error => {
//                 //   this.router.navigate(['/organizations']);
//                 return of(null);
//             })
//         );
//     }
// }
