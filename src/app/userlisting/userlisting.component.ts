import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css']
})
export class UserlistingComponent {

  constructor(private service: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService) {
    this.listUsers();
  }

  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  listUsers() {
    this.service.getAllUsers().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'gender', 'email', 'action'];

  updateUser(user: any) {
    //console.log(user);
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '60%',
      data: user
    })
    popup.afterClosed().subscribe(res => {
    this.listUsers();
    });
  }

  openDialog() {
    
  }

  deleteUser(user:any){
    this.service.deleteUser(user.id).subscribe(res =>{
    this.toastr.success(user.firstname + ' is Deleted');
    this.listUsers();      
    });
  }

}
