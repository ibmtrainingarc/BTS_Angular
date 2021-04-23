import { Component, OnInit } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bug.service';

@Component({
  selector: 'app-bug-form',
  templateUrl: './bug-form.component.html',
  styleUrls: ['./bug-form.component.css']
})
export class BugFormComponent implements OnInit {

  title:String="CREATE BUG";
  bug:Bug = new Bug();
  constructor(private bugService:BugService) { }
  saveBug(){
    const observable=this.bugService.save(this.bug);
    observable.subscribe(response=> {
      console.log(response);
      alert("Bug added succesfully..")
    },
    error=> {
      console.log(error);
      alert("Form is invalid")
    })
  }

  ngOnInit(): void {
  }

}
