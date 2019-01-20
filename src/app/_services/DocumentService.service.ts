import { Documents } from './../entities/production/Documents';


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DocumentService {

  private documentSource = new BehaviorSubject(null);
  currentDocument = this.documentSource.asObservable();


constructor() { }

changeColumn(document: Documents) {
  this.documentSource.next(document);
}


}
