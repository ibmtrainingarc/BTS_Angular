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

  getBugByPartialName(name:String){
    return this.http.get(URL+'/'+name);
  }

  getStatus(status:STATUS){
    return this.http.get('http://localhost:8080/bug/status/'+status);
  }

  getBugbyStatusAndName(name:string,status:string){
    return this.http.get('http://localhost:8080/bug/'+'search/'+ name+'?status='+status, {
      headers: {
        "content-type": 'application/json',
        reponseType: 'text'
      }
      });
  }

  updateBug(bugId:any, updatedBody:any) {
    const endpointURL = 'http://localhost:8080/bug/' + bugId;
    return this.http.put(endpointURL, updatedBody);
  }

  delete(bugId:String ){
    return this.http.delete(URL+'/'+bugId);
  }

  // getBug() {
  //   const httpHeaders = new HttpHeaders();
  //   const endpointURL = 'http://localhost:8080/bug/'
  //   httpHeaders.append('content-type', 'application/json');
  //   return this.http.get(endpointURL, { headers: httpHeaders });

  // }
}
