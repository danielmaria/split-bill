import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemModelComponent } from './components/item-model/item-model.component';
import { CleanTableComponent } from './components/clean-table/clean-table.component';
import { ManagePeopleComponent } from './components/manage-people/manage-people.component';
import { DeletePersonComponent } from './components/delete-person/delete-person.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemModelComponent,
    CleanTableComponent,
    ManagePeopleComponent,
    DeletePersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
