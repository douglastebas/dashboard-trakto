import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { CoursewareComponent } from './courseware';
import { CommonModule } from '@angular/common';
import { ListComponent } from '@app/list';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        AngularSvgIconModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        CoursewareComponent,
        ListComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
// import { ModuleListComponent } from './module-list/module-list.component';
// import { ModuleComponent } from './module/module.component';
// import { DesignListComponent } from './design-list/design-list.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { VMessageModule } from './shared/components/vmessage/vmessage.module';

// @NgModule({
//     declarations: [
//         AppComponent,
//         LoginComponent,
//         ModuleListComponent,
//         ModuleComponent,
//         DesignListComponent,
//         // VMessageComponent
//     ],
//     providers: [],
//     bootstrap: [AppComponent],
//     imports: [
//         AppRoutingModule,
//         BrowserModule,
//         CommonModule,
//         ReactiveFormsModule,
//         VMessageModule
//     ]
// })
// export class AppModule { }
