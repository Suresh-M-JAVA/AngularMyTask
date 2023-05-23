import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private builder: FormBuilder, 
    private toastr: ToastrService,
    private service:AuthService,
    private router: Router){
      sessionStorage.clear();
}

userdata:any;
searchemail:any;
enteredpassword:any;
registeredpassword:any;

loginform = this.builder.group({
  useremail: this.builder.control('', Validators.required),
  password: this.builder.control('', Validators.required)
})

proceedlogin(){
  if(this.loginform.valid){
    this.service.getById(this.loginform.value.useremail).subscribe(res => {
      this.userdata = res;
      this.registeredpassword = this.userdata[0].password;
      this.enteredpassword = this.loginform.value.password;
      if (this.enteredpassword === this.registeredpassword) {
        sessionStorage.setItem('useremail', 'this.loginform.value.useremail');
        this.toastr.success('successfully Logged into Dashboard');
        this.router.navigate(['user']);
      }else{
        this.toastr.error('Invalid Password');
      }
    });
  }else{
    this.toastr.error('Invalid Credentials');
  }
}

}
