

import { Injectable } from '@angular/core';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Area } from '../entities/organization/Area';
import { AreaService } from '../_services/_organization/Area.service';



@Injectable()
export class AreaResolver implements Resolve<Area[]> {
    constructor(private areaService: AreaService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Area[]> {
        return this.areaService.loadAreas(null).pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
