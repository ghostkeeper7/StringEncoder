import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = 'https://localhost:32772/StringEncoder/';

  constructor(private http: HttpClient) { }

  //public sendText(text: string): Observable<any> {
  //  const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
  //  const options = {
  //    headers: headers, observe: 'events', params: '', reportProgress: true, reporesponseType: 'arraybuffer',  withCredentials?: false };
  //  const body = text;
  //  return this.http.post(this.apiUrl + 'echo', body, options);
  //}
}
