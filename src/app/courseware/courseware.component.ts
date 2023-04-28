import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DesignService } from '@app/_services';
import { Design } from '@app/_models';

@Component({
    templateUrl: 'courseware.component.html',
    styleUrls: ['./courseware.component.scss'] })
export class CoursewareComponent implements OnInit {
    recentDesigns?: any[];

    mostRecentDate?: number =  Date.now();
    lessRecentDate?: number =  Date.now();


    constructor(private designService: DesignService) {}

    ngOnInit() {
        this.designService.getRecentDesigns()
            .pipe(first()).subscribe(response => this.recentDesigns = response.data);
    }

    
    openPresentation(id: string) {
        this.designService.getPresentation(id);
    }
}