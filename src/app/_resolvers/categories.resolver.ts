import { Category } from './../entities/Setup/Categories';
import { CategoryService } from '../_services/_setup/Category.service';
import { LockUpService } from '../_services/_organization/LockUp.service';
import { LockUp } from '../entities/organization/LockUp';

import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class CategoriesResolver implements Resolve<Category[]> {
    constructor(private categoryService: CategoryService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Category[]> {
        return this.categoryService.load(null, null, null, null, 1).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}

@Injectable()
export class ColumnTypesResolver implements Resolve<LockUp[]> {
    constructor(private lockupService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockupService.LoadLockUpsByMajorCode(20).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
