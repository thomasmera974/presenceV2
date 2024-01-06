import { Component } from '@angular/core';

import { SessionService } from '../service/session.service';
import { Session } from '../type';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.scss']
})
export class FormateurComponent {

    public session! : Session;

    constructor( private sessionService : SessionService ) {

        this.session = this.sessionService.get();
    }
}
