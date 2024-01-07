import { Component, ElementRef, Input, ViewChild, ViewChildren } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { DataPrototype, Fiche, Session, getData } from 'src/app/type';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.component.html',
  styleUrls: ['./fiche.component.scss']
})
export class FicheComponent {

    @Input('session') session! : Session;




    @ViewChild('list') list! : ElementRef;

    @ViewChildren('input') input! : any;
    @ViewChildren('hour') hour! : any;




    public data! : Fiche;
    public data_hour! : any;




    constructor( private http : HttpClient ) {}




    private setHour(i : number) {
        
        let element! : any;

        for (let index = 0; index < this.hour.length; index++) {

            element = this.hour[index].nativeElement;
            
            if( typeof this.data[i].hour != 'undefined' ) element.value = this.data[i].hour[element.name];
            else element.value = '00:00:00';
        }
    }

    private setList() {

        let html = [];
        let i! : number;

        for (let index = 0; index < this.data.length; index++) {

            if( i === undefined ) i = index;
            html.push([ `<option value="${index}">${this.data[index].date}</option>` ]);
        }

        this.list.nativeElement.innerHTML = html;
        this.setHour(i);

        // ---

        this.list.nativeElement.addEventListener('change', (e : any) => {

            let i = e.target.value;
            this.setHour(i);
        } );
    }




    private getFiche() {

        let url = 'http://localhost/presencev2/presence';

        // ---

        this.http.get(url, { params : { 'id' : this.session.id, 'id_session' : this.session.sessionId, 'id_section' : this.session.sectionId } } )

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




    private changeData(index : number, inputData : DataPrototype) {

        let name! : string;

        for (let u = 0; u < this.input.length; u++) {

            name = this.input[u].nativeElement.name;

            if( typeof this.data[index].hour == 'undefined' ) this.data[index].hour = { 'name' : inputData[name] };
            this.data[index].hour[name] = inputData[name];
        }
    }

    public sendFiche() {

        let url : string = 'http://localhost/presencev2/presence/';

        // ---

        let inputData = getData(this.input);
        let index : number = this.list.nativeElement.value;

        inputData['id_fiche'] = this.data[index].id;

        // ---

        let request! : any;
        let body : string = JSON.stringify(Object.assign({ 'id' : this.session.id, 'id_session' : this.session.sessionId }, inputData));

        if( typeof this.data[index].hour == 'undefined' ) {
            
            url = url + 'add';
            request = this.http.post(url, body);
        }
        else {
            
            url = url + this.data[index].id;

            let bodyParse : DataPrototype = JSON.parse(body);
            delete bodyParse['id_fiche'];
            
            request = this.http.patch(url, JSON.stringify(bodyParse));
        }

        // ---

        this.changeData(index, inputData);

        request.subscribe( {

            next : (result : any) => {

                //
            },

            error : () => {

                //
            }

        } );

    }




    ngOnInit() {

        this.getFiche();
    }

    ngAfterViewInit() {

        this.input = this.input._results;
        this.hour = this.hour._results;
    }

}
