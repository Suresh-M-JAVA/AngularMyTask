import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiurl = 'http://localhost:3000/user';

  getAllUsers() {
    return this.http.get(this.apiurl);
  }

  getById(id: any) {
    return this.http.get(this.apiurl + '?email=' + id);
  }

  proceedRegister(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  updateUser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }

  deleteUser(id: any){
    return this.http.delete(this.apiurl +'/'+ id);
  }

  isLoggedIn() {
    return sessionStorage.getItem('useremail') !== null;
  }

}
