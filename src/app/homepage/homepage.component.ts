import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  ImgPath:String= ("./assets/img/bug2.jpg");
  constructor() { }

  ngOnInit(): void {
  }

}
