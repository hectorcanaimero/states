import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { AppState } from '../app.reducers';
import * as ui from '../shared/states/ui.accions';
import * as auth from './auth.actions';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private user: User;
  userSubscription: Subscription;


  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if ( fbUser ) {
        this.userSubscription = this.afDb.doc(`${ fbUser.uid }/user`).valueChanges()
        .subscribe( (usuarioObj: any) => {
          const newUser = new User( usuarioObj );
          this.store.dispatch( new auth.SetUserAction(newUser) );
          this.user = newUser;
        });
      } else {
        this.user = null;
        this.userSubscription.unsubscribe();
      }
    });
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

  signIn( email: string, password: string ) {
    this.store.dispatch(new ui.ActivarLoadingAction()  );
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then( resp => {
      this.store.dispatch( new ui.DesactivarLoadingAction()  );
      this.router.navigate(['/']);
    })
    .catch( error => {
      this.store.dispatch(new ui.DesactivarLoadingAction());
      Swal.fire('Error en el login', error.message, 'error');
    });
  }

  signOut() {}
  isAuth() {
    return this.afAuth.authState
    .pipe(
      map( fbUser => {
        if ( fbUser == null ) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  getUser() { return { ...this.user }; }
}
