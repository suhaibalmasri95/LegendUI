
import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../entities/Setup/Products';
import { ProductService } from '../_services/_products/product.service';
import { LockUpService } from '../_services/_organization/LockUp.service';
import { LockUp } from '../entities/organization/LockUp';



@Injectable()
export class ProductsResolver implements Resolve<Product[]> {
    constructor(private productService: ProductService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        return this.productService.load(null, null, 1).pipe(
            catchError(error => {
                //   this.router.navigate(['/organizations']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class GroupIndividualLockupsResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(21).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
