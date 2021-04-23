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
      const promise = this.bugService.getBugs(bugName);
      promise.subscribe(response => {
        this.bugList = response;
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
          alert("Error Happened");
        }
      )
    }
    else{alert('Enter a valid name')}
  }

  updateBug() {
  let updateBug = (<HTMLInputElement>document.getElementById('updateBug'))
    if (!updateBug.checkValidity()) {
      alert('Form is invalid');
      return;
    }
    let bugId = (<HTMLInputElement>document.getElementById('bugId')).value
    const updatedBody = {
      name: (<HTMLInputElement>document.getElementById('bugName')).value,
      bugId: (<HTMLInputElement>document.getElementById('bugId')).value,
      status: (<HTMLInputElement>document.getElementById('Status')).value,
      priority: (<HTMLInputElement>document.getElementById('Priority')).value,
      severity: (<HTMLInputElement>document.getElementById('Severity')).value,
      eta: (<HTMLInputElement>document.getElementById('etadate')).value,
      module: (<HTMLInputElement>document.getElementById('module')).value,
      projectId: (<HTMLInputElement>document.getElementById('project')).value,
      type: (<HTMLInputElement>document.getElementById('Type')).value,
      description: (<HTMLInputElement>document.getElementById('desc')).value,
      submittedOn: (<HTMLInputElement>document.getElementById('etadate')).valueAsDate,
    }

    this.bugService.updateBug(bugId, updatedBody).subscribe(
      response => {
        console.log(response);
        alert("Bug updated....");
      },
      error => {
        console.log(error);
        alert("Error Happened");

      }
    )


  }

  ngOnInit(): void {
  }

}
