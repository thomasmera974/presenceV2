import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Fiche, Session } from 'src/app/type';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss']
})
export class FicheComponent {

    @Input('session') session! : Session;
    @ViewChild('list') list! : any;

    public data! : Fiche;

    constructor( private http : HttpClient ) {}

    setList() {

        let html = [];

        for (let index = 0; index < this.data.length; index++) html.push([ `<option value="${this.data[index].id}">${this.data[index].date}</option>` ]);

        this.list.nativeElement.innerHTML = html;
    }

    getFiche() {

        let url = 'http://localhost/presencev2/presence';

        // ---


        this.http.get(url, { params : { 'id' : this.session.id, 'id_section' : this.session.sectionId, 'id_session' : this.session.sessionId } } )

        .subscribe( {

            next : (result : any) => {

                this.data = result;
                this.setList();
            },

            error : () => {

                //
            }

        } );
    }
    
    // ---

    ngOnInit() {

        this.getFiche();
    }

}
