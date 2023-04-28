import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './_services/acount.service';
import { User } from './_models/user';

@Component({ selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['./app.component.scss'] })
export class AppComponent {
    user?: User | null;
    today?: number =  Date.now();

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }
}
