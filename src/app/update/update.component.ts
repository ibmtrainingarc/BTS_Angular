import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bug.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  title:String="UPDATE BUG";
  bug: Bug = new Bug();
  bugList: any;
  constructor(private bugService: BugService) { }
  getBugName() {
    let endpointURL = 'http://localhost:8080/bug/';
    let bugName = (<HTMLInputElement>document.getElementById('bugName')).value;
    if (bugName) {
      endpointURL = endpointURL + 'name/' + bugName;
      const promise = this.bugService.getBug(endpointURL);
      promise.subscribe(response => {
        this.bugList = [response];
        console.log(this.bugList);
        if (this.bugList) {
          this.bug = this.bugList;
        }
        else {
          alert("Given Bug with title " + bugName + " does not exist");
        }
      },
        error => {
          console.log(error);
          alert(error.statusText);
        }
      )
    }
  }

  updateBug() {
  let updateBug = (<HTMLInputElement>document.getElementById('updateBug'))
    if (!updateBug.checkValidity()) {
      alert('Form is invalid');
      return;
    }
    let bugId = (<HTMLInputElement>document.getElementById('bugId')).value
    const updatedBody = {
      bugId: (<HTMLInputElement>document.getElementById('bugId')).value,
      name: (<HTMLInputElement>document.getElementById('bugName')).value,
      description: (<HTMLInputElement>document.getElementById('desc')).value,
      priority: (<HTMLInputElement>document.getElementById('Priority')).value,
      status: (<HTMLInputElement>document.getElementById('Status')).value,
      type: (<HTMLInputElement>document.getElementById('Type')).value,
      projectId: (<HTMLInputElement>document.getElementById('project')).value,
      module: (<HTMLInputElement>document.getElementById('module')).value,
      eta: (<HTMLInputElement>document.getElementById('etadate')).value,
    }

    this.bugService.updateBug(bugId, updatedBody).subscribe(
      response => {
        console.log(response);
        alert("Bug updated....");
      },
      error => {
        console.log(error);
        alert(error.statusText);

      }
    )


  }

  ngOnInit(): void {
  }

}
