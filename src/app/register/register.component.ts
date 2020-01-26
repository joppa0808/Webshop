import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {AuthenticationService} from '../service/authenticationService';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AlertService} from '../service/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  show: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  ) {
    this.show = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.post(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('hi', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
          this.alertService.error(error);
        });
  }
  password() {
    this.show = !this.show;
  }
}
