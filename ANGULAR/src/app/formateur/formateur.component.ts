import { Component } from '@angular/core';

import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.scss']
})
export class FormateurComponent {

    public sessionId : string | null = '';

    constructor( private session : SessionService ) {

        this.sessionId = this.session.get();
    }
}
