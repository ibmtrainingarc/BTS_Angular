import { Component, OnInit } from '@angular/core';
import { Bug } from '../Bug';
import { BugService } from '../bug.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  title:String ="UPDATE BUG";
  bug:Bug=new Bug();
bugResult:any;
  bugArray:Bug[]=[];
  name: string ='';
  constructor(private bugService:BugService) { }
  update()
  {const promise = this.bugService.update(this.bug,this.bug.id);
     promise.subscribe((response: any)=> {
    console.log(response);
    alert('Bug added..')

  },
    (  error: { ok: any; })=> {
    console.log(error);
    if(!error.ok)

    alert('error Happened')
  })

}

getBugs() {
  // if (!this.bug.name.trim()) {
  //   alert("Please provide bug name");
  // }

    const promise = this.bugService.update(this.bug, this.bug.id);
    promise.subscribe(response => {
      console.log(response);
      alert('Bug Updated..')
    },
      error => {
        console.log(error);
        if (!error.ok)
          alert("Error !! : " + error.headers.get("error"))
      })
  }



  ngOnInit(): void {
  }

}
