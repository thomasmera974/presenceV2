import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

import { Session } from '../type';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

      public session! : Session;

      constructor() { }

      // ---

      public set(res : any) : void {

          this.session = res;
      }

      public get() : Session {

          return this.session;
      }
}
