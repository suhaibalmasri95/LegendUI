import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  uploadImageUrl: string = environment.azureUrl + 'Common/AddImages';
constructor() { }

}
