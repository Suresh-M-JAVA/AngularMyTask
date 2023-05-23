import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // apiurl = 'http://localhost:3000/user';
  apiurl = 'http://localhost:8084/api/user';

  // getAllUsers() {
  //   return this.http.get(this.apiurl);
  // }

  getAllUsers() {
    return this.http.get(this.apiurl + '/getAllUser');
  }

  // getById(id: any) {
  //   return this.http.get(this.apiurl + '?email=' + id);
  // }

  getById(id: any) {
    return this.http.get(this.apiurl + '/login?email=' + id);
  }

  // proceedRegister(inputdata: any) {
  //   return this.http.post(this.apiurl, inputdata);
  // }

  proceedRegister(inputdata: any) {
    return this.http.post(this.apiurl+'/save', inputdata, {responseType: 'text'});
  }

  // updateUser(id: any, inputdata: any) {
  //   return this.http.put(this.apiurl + '/' + id, inputdata);
  // }

  updateUser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/update', inputdata, {responseType: 'text'});
  }

  // deleteUser(id: any) {
  //   return this.http.delete(this.apiurl + '/' + id);
  // }

  deleteUser(id: any) {
    return this.http.delete(this.apiurl + '/deleteuser/' + id, {responseType: 'text'});
  }

  isLoggedIn() {
    return sessionStorage.getItem('useremail') !== null;
  }

}
