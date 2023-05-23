import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {
  registerform: any;

  constructor(private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private dialog: MatDialogRef<UpdatepopupComponent>) {

  }

  ngOnInit(): void {
    //console.log(this.user);
    this.registerform = this.builder.group({
      id: this.builder.control(this.user.id),
      firstname: this.builder.control(this.user.firstname, Validators.required),
      lastname: this.builder.control(this.user.lastname, Validators.required),
      gender: this.builder.control(this.user.gender),
      email: this.builder.control(this.user.email, Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      password: this.builder.control(this.user.password, Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]))
    });
  }

  updateUser() {
    if (this.registerform.valid) {
      this.service.updateUser(this.registerform.value.id, this.registerform.value).subscribe(res =>{
        this.toastr.success('Updated Successfully');
        this.dialog.close();
      });
    } else {
      this.toastr.error('Failed to Updated');
    }
  }

}
