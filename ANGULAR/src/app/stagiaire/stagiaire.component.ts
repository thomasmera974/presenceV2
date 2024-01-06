import { Component } from '@angular/core';

import { Session } from '../type';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.scss']
})
export class StagiaireComponent {

    public session! : Session;

    constructor( sessionService : SessionService ) {

        this.session = sessionService.get();
    }

    // ---

    
}
