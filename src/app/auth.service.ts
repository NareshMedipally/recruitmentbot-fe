import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AccessToken:string = "";
  headers = new Headers();

  constructor(private http: HttpClient) {
    this.getToken()
  }

  private baseUrl: string = 'http://ec2-3-232-186-142.compute-1.amazonaws.com:5000';

  getToken() {
    this.AccessToken = localStorage.getItem('token')
    if(this.AccessToken) {
      this.headers.append('Authorization', 'Bearer ' + this.AccessToken)
    }
  }

  login(objUser: any): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url = this.baseUrl + '/user';
    console.log(url);
    return this.http.post<any>(url, objUser, {headers: headersForAPI, observe: 'response'})
  }

  changePwd(id,objUser): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/user/changePassword/{correl_id}';
    url = url.replace('{correl_id}', id);
    return this.http.put<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
  }

  createUser(objUser): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/createuser';
    return this.http.post<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
  }

  createConsultant(objUser): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/createuser';
    return this.http.post<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
  }

  getCompanies(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/company/getuser/{company_name}';
      url = url.replace('{company_name}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  getCompany(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getuser/{correl_id}'
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  updateCompany(id,data){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/updateuser/{correl_id}';
    url = url.replace('{correl_id}', id);
    console.log(url);
    return this.http.put<any>(url,data, { headers: headersForAPI, observe: 'response' });
  }

  deleteCompany(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/deleteuser/{correl_id}';
    url = url.replace('{correl_id}', id);
    console.log(url);
    return this.http.delete<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  getTags(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/gettags/{company_name}';
    url = url.replace('{company_name}', id);
    console.log(url);
    return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  postTags(objUser: any): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/createtags';
    console.log(url);
    return this.http.post<any>(url, objUser, { headers: headersForAPI, observe: 'response' });
  }

  getTag(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/gettag/{tag_id}';
    url = url.replace('{tag_id}', id);
    console.log(url);
    return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  UpdateTag(id,data){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/updatetags/{tag_id}';
    url = url.replace('{tag_id}', id);
    console.log(url);
    return this.http.put<any>(url, data, { headers: headersForAPI, observe: 'response' });
  }

  DeleteTag(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/deletetags/{tag_id}';
    url = url.replace('{tag_id}', id);
    console.log(url);
    return this.http.delete<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  createCompany(objUser: any): Observable<HttpResponse<any>>{
    var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/createEnterprise';
    console.log(url);
    return this.http.post<any>(url, objUser, { headers: headersForAPI, observe: 'response' });
  }

  getEntCompanies(): Observable<HttpResponse<any>>{
    var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/getEnterprise';
    console.log(url);
    return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  getEntCompany(id): Observable<HttpResponse<any>>{
    var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/getEnterprise/{correl_id}';
    url = url.replace('{correl_id}', id);
    console.log(url);
    return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  delEntCompany(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/deleteEnterprise/{correl_id}';
    url = url.replace('{correl_id}', id);
    console.log(url);
    return this.http.delete<any>(url, { headers: headersForAPI, observe: 'response' });
  }
}
