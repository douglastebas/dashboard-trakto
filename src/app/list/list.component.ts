import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { DesignService } from '@app/_services';
import { Design } from '@app/_models';

@Component({
    templateUrl: 'list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    allDesigns?: any[];

    constructor(private designService: DesignService) {}

    ngOnInit() {
        this.designService.getAllDesigns()
            .pipe(first()).subscribe(response => this.allDesigns = response.data);
    }

    
    openPresentation(id: string) {
        this.designService.getPresentation(id);
    }
}