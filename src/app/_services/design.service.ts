import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environments';
import { User } from '@app/_models';
import { Design } from '@app/_models';
import { Response } from '@app/_models/response';

@Injectable({ providedIn: 'root' })
export class DesignService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    private presentationUrl = 'https://editor.trakto.io/presentation/p/';

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }
    
    getAllDesigns() {
        return this.http.get<Response>(`${environment.apiUrl}/document?`);
    }
    
    getRecentDesigns() {
        return this.http.get<Response>(`${environment.apiUrl}/document?nextCursor=&total_per_page=10&order_by=updated_at&order_orientation=desc`); // Criar model de design
    }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/document?`);
    }

    getPresentation(id: string) {
        const url = `${this.presentationUrl}${id}`;
        window.open(url, '_blank')?.focus();
    }
}