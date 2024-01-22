// login-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  email = new FormControl("", [Validators.required, Validators.email]);

  password = new FormControl("", [
    Validators.required,
    // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm),
  ]);

  loginFormGroup = new FormGroup({
    email: this.email,
    password: this.password,
  })


  submitted: boolean = false;
  errorMessage!: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoLogin()
  }


  // Method to enable the form controls
  enableFormControls() {
    this.email.enable();
    this.password.enable();
  }

  // Method to disable the form controls
  disableFormControls() {
    this.email.disable();
    this.password.disable();
  }

  loginUser() {
    this.submitted = true;
    this.disableFormControls();

    if (this.loginFormGroup.invalid) return;

    const { email, password } = this.loginFormGroup.value

    if (!email || !password) return;



    this.authService.login({ email, password }).subscribe({
      next: loginResponse => {
        this.authService.saveToken(loginResponse);
      },
      error: err => {
        console.log(err);
        // Check if Http failure response for http://localhost:9481/login: 403 OK
        if (err.status === 403) {
          this.errorMessage = "Email or password incorrect !!!";
        } else {
          this.errorMessage = err.message;
        }
      }

    })
  }

}
