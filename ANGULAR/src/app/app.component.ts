import { Component, ViewChildren } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from './service/session.service';

import { getData } from './type';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

    title = 'ANGULAR';

    // ---

    public isLogin : boolean = false;
    @ViewChildren('input') input! : any;

    // ---

    constructor(private http : HttpClient, private router : Router, private session : SessionService) {}


    public login() : void {

        let url = 'http://localhost/presencev2-PHP/login';

        // ---

        this.http.get(url, { params : getData(this.input, null) })

        .subscribe( {

            next : (result : any) => {

                this.isLogin = true;

                this.session.set(result);
                this.router.navigate([`${result.session}`]);
            },

            error : (error : any) => {

                // if( error.res == 'user_not_found' ) 
            }
        } );
    }

    ngAfterViewInit() {

        this.input = this.input._results;
    }
}
