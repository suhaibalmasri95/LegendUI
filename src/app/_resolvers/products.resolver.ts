import { ServicesService } from './../_services/_setup/services.service';
import { Service } from './../entities/Setup/Diagnosis';
import { Product } from './../entities/Product/Products';

import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

@Injectable()
export class ReportLevelResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(26).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}

@Injectable()
export class AttachmentLevelResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(24).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class WordingTypesResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(25).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class ValidationTypesResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(27).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}

@Injectable()
export class ServicesResolver implements Resolve<Service[]> {
    constructor(private servicesService: ServicesService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Service[]> {
        return this.servicesService.load(null, null, null, 2, null, 1).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
