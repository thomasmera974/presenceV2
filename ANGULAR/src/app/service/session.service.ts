import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

      public id : string | null = null;

      constructor() { }

      // ---

      public set(id : string) : void {

          this.id = id;
      }

      public get() : string | null {

          return this.id;
      }
}
