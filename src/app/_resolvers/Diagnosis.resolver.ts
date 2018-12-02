import { DiagnosisService } from './../_services/_setup/diagnosis.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LockUp } from '../entities/organization/LockUp';
import { Diagnose } from '../entities/Setup/Diagnosis';
import { LockUpService } from '../_services/_organization/LockUp.service';


@Injectable()
export class DiagnosisResolver implements Resolve<Diagnose[]> {
    constructor(private diagnosisService: DiagnosisService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<Diagnose[]> {
        return this.diagnosisService.load(null, null, null, 1, null, 1).pipe(catchError(error => {
            //   this.router.navigate(['/organizations']);
            return of(null);
        })
        );
    }
}

@Injectable()
export class CodingSystemsResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(10).pipe(catchError(error => {
            //   this.router.navigate(['/organizations']);
            return of(null);
        })
        );
    }
}

@Injectable()
export class GendersResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(11).pipe(catchError(error => {
            //   this.router.navigate(['/organizations']);
            return of(null);
        })
        );
    }
}

@Injectable()
export class FrequencyUnitsResolver implements Resolve<LockUp[]> {
    constructor(private lockUpService: LockUpService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot): Observable<LockUp[]> {
        return this.lockUpService.LoadLockUpsByMajorCode(12).pipe(catchError(error => {
            //   this.router.navigate(['/organizations']);
            return of(null);
        })
        );
    }
}
