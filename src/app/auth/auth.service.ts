import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }

  authRef(){
    return this.auth.auth
  }
  canActiveRef(){
    return this.auth.user
  }
}
