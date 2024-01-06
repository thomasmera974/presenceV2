import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Fiche, Session } from 'src/app/type';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss']
})
export class FicheComponent {

    @Input('session') session! : Session;
    @ViewChild('List') List! : ElementRef;

    public data! : Fiche;

    constructor( private http : HttpClient ) {}

    setList() {

        let html = [];

        for (let index = 0; index < this.data.length; index++) html.push([this.data[index].date])
    }

    getFiche() {

        let url = 'http://localhost/presencev2/presence';

        this.http.get(url, { params : { 'id' : this.session.id, 'id_section' : this.session.sectionId } } )

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
