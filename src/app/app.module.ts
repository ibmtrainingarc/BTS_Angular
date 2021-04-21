import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BugFormComponent } from './bug-form/bug-form.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchbugComponent } from './searchbug/searchbug.component';
import {Routes, RouterModule} from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { UpdateComponent } from './update/update.component';

const appRoutes:Routes=[
  {path: 'createBug', component:BugFormComponent},
  {path: 'search', component:SearchbugComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'update' , component:UpdateComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BugFormComponent,
    FooterComponent,
    SearchbugComponent,
    ContactComponent,
    UpdateComponent
  ],
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing:true}
  ),
    BrowserModule,FormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
