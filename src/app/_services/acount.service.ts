import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environments';
import { User } from '@app/_models';
import { Design } from '@app/_models';
import { Response } from '@app/_models/response';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/auth/signin`, { email, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                console.log('usuárioooow', localStorage.getItem('user'));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }
    
    getAllDesigns() {
        return this.http.get<Design>(`${environment.apiUrl}/document?`);
    }
    
    getRecentDesigns() {
        //created_at
        //order_by=updated_at
        //order_orientation=desc
        //total_per_page=10
        // console.log("UÉ", this.http.get<Design[]>(`${environment.apiUrl}/document?nextCursor=&total_per_page=10&order_by=updated_at&order_orientation=desc`))
        return this.http.get<Response>(`${environment.apiUrl}/document?nextCursor=&total_per_page=10&order_by=updated_at&order_orientation=desc`); // Criar model de design
    }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/users`);
    }

    getPresentation(id: string) {
        const url = `https://editor.trakto.io/presentation/p/${id}`;
        window.open(url, '_blank')?.focus();
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id: string, params: any) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue?.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue?.id) {
                    this.logout();
                }
                return x;
            }));
    }
}