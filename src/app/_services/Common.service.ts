import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  exportUrl: string = environment.azureUrl + 'Export/Export';
  uploadImageUrl: string = environment.azureUrl + 'Common/AddImages';
constructor(private http: HttpClient) { }


  Export (body: any): Observable<any> {
    return this.http.post<any>(this.exportUrl, body)
      .pipe(
      );
  }

}
