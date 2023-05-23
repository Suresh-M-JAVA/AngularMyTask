import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, 
              private toastr: ToastrService,
              private service:AuthService,
              private router: Router){

  }
  
  registerform = this.builder.group({
    firstname: this.builder.control('',Validators.required),
    lastname: this.builder.control('',Validators.required),
    gender: this.builder.control('male'),
    email: this.builder.control('',Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
    password: this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))
  });

 proceedregisteration(){
  if(this.registerform.valid){
    this.service.proceedRegister(this.registerform.value).subscribe(res=>{
      this.toastr.success('Registered Successfully');
      this.router.navigate(['login']);
     // console.log(res);
    });
  }else{
    this.toastr.warning('please enter valid data');
  }
 }

}
