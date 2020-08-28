import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2'

import { User } from './user.model';
import { AppState } from '../app.reducers';
import * as ui from '../shared/states/ui.accions';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: User

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) { }

  initAuthListener() {

  }

  createUser(name: string, email: string, password: string) {
    this.store.dispatch( new ui.ActivarLoadingAction());
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const user: User = {
        uid: res.user.uid,
        email: res.user.email,
        name,
      };
      this.afDb.doc(`${ user.uid }/user`).set(user)
      .then( () => {
        this.router.navigate(['/']);
        this.store.dispatch( new ui.DesactivarLoadingAction());

      });
    })
    .catch( error => {
      this.store.dispatch( new ui.DesactivarLoadingAction() );
      Swal.fire('Error', error.message, 'error');
    });
  }

  signIn() {}
  signOut() {}
  isAuth() {}
  getUser() {}
}
