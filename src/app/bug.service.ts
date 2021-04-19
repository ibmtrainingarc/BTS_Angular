import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bug } from './Bug';
import { STATUS } from './STATUS';
const URL ='http://localhost:8080/bug';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }
  save(bug: Bug) {
    return this.http.post('http://localhost:8080/bug', bug ,
      {
      headers: { "content-type": 'application/json' }
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
}
