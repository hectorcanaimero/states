import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: boolean;
  uiSubs: Subscription;
  formLogin: FormGroup;

  constructor(
    public authService: AuthService,
    public store: Store<AppState>,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.uiSubs = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }


  ngOnDestroy() {
    this.uiSubs.unsubscribe();
  }

  onSubmit() {
    if(this.formLogin.invalid) { return; }
    this.authService.signIn(
      this.formLogin.value.email,
      this.formLogin.value.password
    );
  }

}
