import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy {

  loading: boolean;
  uiSubs: Subscription;
  formRegister: FormGroup;

  constructor(
    public authService: AuthService,
    public store: Store<AppState>,
    private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.uiSubs = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
    this.formRegister = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }


  ngOnDestroy() {
    this.uiSubs.unsubscribe();
  }

  onSubmit() {
    if(this.formRegister.invalid) { return; }
    this.authService.createUser(
      this.formRegister.value.name,
      this.formRegister.value.email,
      this.formRegister.value.password
    );
  }
}
