import { Component } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { UserService } from '../services/json-reader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'home-work';

  // submit(form: any){
  // if(form.valid){
  //   console.log(form.value);
  //   } else {
  //    form.control.markAllAsTouched()
  //   }
  //  }

  users: any[] = [];

  constructor(private userService: UserService) {}
  form!: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$'),
      ]),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.checkEmail]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  checkEmail = (control: any): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userEmail = control.value;
        const userExists = this.users.some((user) => user.email === userEmail);

        if (userExists) {
          control.markAllAsTouched();
          resolve({ uniqEmail: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  };
  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
