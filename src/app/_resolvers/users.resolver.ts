
import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../entities/organization/User';
import { UserService } from '../_services/_organization/User.service';
import { Group } from '../entities/organization/Group';
import { GroupService } from '../_services/_organization/Group.service';


@Injectable()
export class UsersResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.loadUsers().pipe(
            catchError(error => {
                //   this.router.navigate(['/organizations']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class GroubsResolver implements Resolve<Group[]> {
    constructor(private groupService: GroupService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Group[]> {
        return this.groupService.load().pipe(
            catchError(error => {
                //   this.router.navigate(['/organizations']);
                return of(null);
            })
        );
    }
}
