import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleComponent } from './module/module.component';
import { DesignListComponent } from './design-list/design-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModuleListComponent,
    ModuleComponent,
    DesignListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
