import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bug } from './Bug';
import { STATUS } from './STATUS';
import { HttpHeaders } from '@angular/common/http';
const URL ='http://localhost:8080/bug';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }
  save(bug: Bug) {
    return this.http.post('http://localhost:8080/bug', bug ,
      {
      headers: { "content-type": 'application/json' },
      responseType : "text"
     });
  }

  getAllBugs(){
    return this.http.get(URL);
  }

  getBugs(name:String) {
    return this.http.get('http://localhost:8080/bug/name/'+name);
  }

  getStatus(status:STATUS){
    return this.http.get('http://localhost:8080/bug/status/'+status);
  }

  updateBug(bugId:String, updatedBody:any) {
    const endpointURL = 'http://localhost:8080/bug/' + bugId;
    return this.http.put(endpointURL, updatedBody);
  }

  delete(bugId:String ){
    return this.http.delete(URL+'/'+bugId);
  }

  getBug(URL:any) {

    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.http.get(URL, { headers: httpHeaders });

  }
}
