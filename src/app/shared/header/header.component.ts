import { Environment } from './../../stores/environment.store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/stores/auth.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public auth: AuthStore,
    private router:Router,
    public env:Environment
    // private campus:Campus,
    // private store:Institute
  ) { }

  logOut() {
    this.auth.signOut();
  } 

  ngOnInit() {
    // this.campus.fetchCampus()
  }

}
