import { Component, Input } from '@angular/core';

import { Session } from '../type';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

    @Input('session') session! : Session;

    constructor( ) {

        //
    }

    // ---

}
