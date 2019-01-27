
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LockUp } from '../entities/organization/LockUp';
import { LockUpService } from '../_services/_organization/LockUp.service';


@Injectable()
export class CustomerTypesDDLResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(33).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}

@Injectable()
export class DepartmentsResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(35).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}


@Injectable()
export class TitlesResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(28).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}

@Injectable()
export class CustomerSourcesResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(34).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class BusinessSectorsResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(30).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class TaxTypesResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(31).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}

@Injectable()
export class CustomerStatusResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(32).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class CommissionTypesResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(36).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class SpecialtiesResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(37).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class ProviderTypesResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(38).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
@Injectable()
export class ProviderCodingSystemsResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.GetLockUpsByMajorCode(10).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}