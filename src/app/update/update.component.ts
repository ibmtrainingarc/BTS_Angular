
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
  oldStatus: String='';
  bug: Bug = new Bug();
  bugList: any;
  todayDate:Date=new Date();
  constructor(private bugService: BugService) { }
  etaCheck(){
    if(this.bug.eta<=this.todayDate.toDateString()){
      alert('ETA Should not be past date');

    }
  }
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
        if( this.oldStatus== 'NEW' && updatedBody.status!='ASSIGNED'){
          alert('Status not allowed, NEW bug can only be assigned.');
          return;
        }
        else if (this.oldStatus== 'ASSIGNED' && updatedBody.status=='NEW'){
          alert('Assigned bug cannot be updated to status NEW.');
          return;

        }
        else if (this.oldStatus=='OPEN' && (updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('An OPEN bug cannot have updated status as NEW or ASSIGNED,');
          return;
        }
        else if(this.oldStatus=='FIXED' && (updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('FIXED bug cannot have updated status as NEW or OPEN or ASSIGNED, please try REOPENING It.  ');
          return;
        }
        else if(this.oldStatus=='PENDING_RETEST' && (updatedBody.status=='FIXED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('A bug in PENDING RETEST status cannot be FIXED or NEW or OPEN or ASSIGNED ');
          return;
        }

        else if(this.oldStatus=='RETEST' && (updatedBody.status=='PENDING_RETEST'||updatedBody.status=='FIXED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
           alert('A bug in RETEST cannot be PEDNING RETEST or FIXED or OPEN or NEW or ASSIGNED');
           return;

        }

        else if(this.oldStatus=='REOPEN' && (updatedBody.status=='CLOSED'||updatedBody.status=='VERIFIED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('A bug thats REOPEN cannot be CLOSED or VERFIED or OPEN or NEW or ASSIGNED');
          return;
        }

        else if(this.oldStatus=='VERIFIED' && (updatedBody.status=='REOPEN'||  updatedBody.status=='RETEST'||updatedBody.status=='PENDING_RETEST'||updatedBody.status=='FIXED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('A bug thats VERIFIED cannot have its status updates as REOPEN OR RETETST OR PENDING_RETEST OR FIXED or OPEN or NEW or ASSIGNED');
          return;
        }


        else if(this.oldStatus=='CLOSED' && (updatedBody.status=="VERIFIED"||updatedBody.status=='REOPEN'||  updatedBody.status=='RETEST'||updatedBody.status=='PENDING_RETEST'||updatedBody.status=='FIXED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('A CLOSED bug cannot cannot be updated to status of VERIFIED or REOPEN or RETEST or PENDING RETEST, FIXED or OPEN or NEW or ASSIGNED');
          return;
        }
        this.etaCheck()



        console.log(error);
        alert("Error Happened!");

      }
    )

  }
  ngOnInit(): void {
  }

}
