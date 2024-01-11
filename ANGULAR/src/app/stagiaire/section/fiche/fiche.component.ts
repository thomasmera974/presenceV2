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
    public abs : Array<Array<string>> = [];




    constructor( private http : HttpClient ) {}




    private setHour(i : number) : void {
        
        let element! : any;

        for (let index = 0; index < this.hour.length; index++) {

            element = this.hour[index].nativeElement;
            
            if( typeof this.data[i].hour != 'undefined' ) element.value = this.data[i].hour[element.name];
            else element.value = '00:00:00';
        }
    }

    private setList() : void {

        let html = [];
        let i! : number;

        let abs : Array<number> = [];

        for (let index = 0; index < this.data.length; index++) {

            if( i === undefined ) i = index;
            html.push([ `<option value="${index}">${this.data[index].date}</option>` ]);

            if( typeof this.data[index].abs != 'undefined' ) abs.push(index);
        }

        this.list.nativeElement.innerHTML = html;
        this.setHour(i);

        // ---

        for (let index = 0; index < abs.length; index++) {

            this.abs[ abs[index] ] = this.data[index].abs;
        }

        // ---

        this.list.nativeElement.addEventListener('change', (e : any) => {

            let i = e.target.value;
            this.setHour(i);
        } );
    }




    private getFiche() : void {

        let url = 'http://localhost/presencev2-PHP/presence';

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




    private changeData(index : number, inputData : DataPrototype) : void {

        let name! : string;

        for (let u = 0; u < this.input.length; u++) {

            name = this.input[u].nativeElement.name;

            if( typeof this.data[index].hour == 'undefined' ) this.data[index].hour = { 'name' : inputData[name] };
            this.data[index].hour[name] = inputData[name];
        }
    }

    public sendFiche() : void {

        let url : string = 'http://localhost/presencev2-PHP/presence/';
        let index : number = this.list.nativeElement.value;

        // ---

        let inputData : DataPrototype;

        if( typeof this.abs[index] != 'undefined' ) {

            let block : Array<string> = [];

            if( this.abs[index].indexOf('matin') != -1 ) {

                block.push('ham');
                block.push('hsm');
            }

            if( this.abs[index].indexOf('aprem') != -1 ) {

                block.push('haa');
                block.push('hsa');
            }

            inputData = Object.assign(getData(this.input, block), { abs : this.abs[index] });
        }

        else inputData = getData(this.input, null);
        
        // ---

        inputData['id_fiche'] = this.data[index].id;
        let body : string = JSON.stringify(Object.assign({ 'id' : this.session.id, 'id_session' : this.session.sessionId, 'date_jour' : this.data[index].date }, inputData));

        // ---

        let request! : any;
        let bodyParse! : DataPrototype;

        if( typeof this.data[index].hour == 'undefined' ) {
            
            url = url + 'add';
            request = this.http.post(url, body);
        }
        else {
            
            url = url + this.data[index].id;

            bodyParse = JSON.parse(body);
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
    



    public setAbs(type : string) : void {

        let index : number = this.list.nativeElement.value;
        let find : number;

        if( typeof this.abs[index] == 'undefined' ) {

            this.abs[index] = [];
            this.abs[index].push( type );
        }

        else {

            find = this.abs[index].indexOf(type);

            if( find != -1 ) {

                this.abs[index].splice(find, 1);
                if( !this.abs[index][0] ) this.abs.splice(index, 1);
            }
            else {

                this.abs[index].push( type );
            }
        }
    }




    ngOnInit() {

        this.getFiche();
    }

    ngAfterViewInit() {

        this.input = this.input._results;
        this.hour = this.hour._results;
    }

}
