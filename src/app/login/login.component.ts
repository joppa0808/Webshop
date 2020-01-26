import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authenticationService';
import {User} from '../model/user';
import {UserService} from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  show: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.show = false;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

// for accessing to form fields
  getLoginFormControls() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    const user: User = new User(0, '', '', '');
    user.setEmail(this.getLoginFormControls().email.value);
    user.setPassword(this.getLoginFormControls().password.value);

    this.userService.login(user, false);
  }

  password() {
    this.show = !this.show;
  }
}
