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
  constructor(private bugService:BugService ) {}
  getBugs(name:String){
    const observable=this.bugService.getBugs(name);
    observable.subscribe(response=>{console.log(response);
      this.bugArray=response});

  }

  getStatus(status:STATUS){
    const observable=this.bugService.getStatus(status);
    observable.subscribe(response=>{console.log(response);
      this.bugArray=response});

  }


  ngOnInit(): void {
    const observable = this.bugService.getAllBugs();
    observable.subscribe(response => {
      console.log(response);
      this.bugArray = response;
     });
  }

}
