import { Component, OnInit } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bug.service';
import { STATUS } from '../STATUS';


@Component({
  selector: 'app-searchbug',
  templateUrl: './searchbug.component.html',
  styleUrls: ['./searchbug.component.css']
})
export class SearchbugComponent implements OnInit {
  title:String="SEARCH BUG";
  bug:Bug = new Bug();
  bugArray:any;
  bugResult:any;
  bugList:any;
  constructor(private bugService:BugService ) {}
  getBugs(name:String){
    const observable=this.bugService.getBugByPartialName(name);;
    observable.subscribe(response=>
      {console.log(response);
      this.bugArray=response;
      if(this.bugArray[0]==null){
        return alert("No bug with name "+ name + " is found")
      }
      else
      return alert("Bug found. Fetching bug(s).......")
    });
  }

  getStatus(status:STATUS){
    const observable=this.bugService.getStatus(status);
    observable.subscribe(response=>{console.log(response);
      this.bugArray=response;
      if(this.bugArray[0]==null){
        return alert("No bug with status "+ status + " is found")
      }
      else
      return alert("Bug found. Fetching bug(s)......")

    });

  }

  getBugbyNameStatus() {
    let status = (<HTMLInputElement>document.getElementById('Status')).value;
      let name = (<HTMLInputElement>document.getElementById('bugName')).value;
    const promise = this.bugService.getBugbyStatusAndName(name, status);
        promise.subscribe(response => {
        console.log(response);
          this.bugList = response;
          if (this.bugList!=0) {
            this.bugArray = this.bugList;
          }
          else {
            alert("No Bug with Name : " + name + " and Status : " + status + " found");
            this.bugArray = [];
          }
        },
          error => {
            alert('error happened..')
          })
      }

  deleteBug(id:String, index:number){
    let ask = confirm("Please confirm for deletion: " + id);
    if (!ask) {
      return;
    }
    const observable = this.bugService.delete(id);
    observable.subscribe(response=>{ this.bugArray.splice(index,1);alert("Bug deleted...")})
  }

  showDescription(des: string) {
    if(des){
      alert(des)
  }}


  ngOnInit(): void {
    const observable = this.bugService.getAllBugs();
    observable.subscribe(response => {
      console.log(response);
      this.bugArray = response;
     });
  }

}
