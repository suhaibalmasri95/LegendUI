import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private codeSource = new BehaviorSubject(0);
  currentCode = this.codeSource.asObservable();
constructor() { }

changeCode(code: number) {
  this.codeSource.next(code);
}

}
