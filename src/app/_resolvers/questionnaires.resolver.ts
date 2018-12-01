import { QuestionnairesService } from './../_services/_setup/questionnaires.service';
import { Questionnaire } from './../entities/Setup/Questionnaires';

import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class QuestionnaireResolver implements Resolve<Questionnaire[]> {
    constructor(private questionnaireService: QuestionnairesService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Questionnaire[]> {
        return this.questionnaireService.load().pipe(
            catchError(error => {
                this.router.navigate(['']);
                return of(null);
            })
        );
    }
}
