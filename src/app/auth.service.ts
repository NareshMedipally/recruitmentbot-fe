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

  private baseUrl: string = 'https://hireswing.com/api';

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
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/user/changePassword/{correl_id}';
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.put<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
    }
  }

  forgotPwd(objUser): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  this.baseUrl + '/user/forgot-password';
    console.log(url);
    return this.http.put<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
  }

  createUser(objUser): Observable<HttpResponse<any>> {
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/createuser';
      return this.http.post<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
    }
  }

  createConsultant(objUser): Observable<HttpResponse<any>> {
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/createconsultant';
      return this.http.post<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
    }
  }

  getallCompanies(){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getallusers';
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
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
      let url =  this.baseUrl + '/getconsultant/{correl_id}'
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  updateCompany(id,data){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/updateuser/{correl_id}';
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.put<any>(url,data, { headers: headersForAPI, observe: 'response' });
    }
  }

  updateConsultant(id,data){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/updateconsultant/{correl_id}';
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.put<any>(url,data, { headers: headersForAPI, observe: 'response' });
    }
  }

  deleteCompany(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/deleteconsultant/{correl_id}';
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.delete<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  botStatus(data){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/botstatus';
      console.log(url);
      return this.http.put<any>(url,data, { headers: headersForAPI, observe: 'response' });
    }
  }

  getTags(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/gettags/{company_name}';
      url = url.replace('{company_name}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  postTags(objUser: any): Observable<HttpResponse<any>> {
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/createtags';
      console.log(url);
      return this.http.post<any>(url, objUser, { headers: headersForAPI, observe: 'response' });
    }
  }

  getTag(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/gettag/{tag_id}';
      url = url.replace('{tag_id}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  UpdateTag(id,data){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/updatetags/{tag_id}';
      url = url.replace('{tag_id}', id);
      console.log(url);
      return this.http.put<any>(url, data, { headers: headersForAPI, observe: 'response' });
    }
  }

  DeleteTag(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/deletetags/{tag_id}';
      url = url.replace('{tag_id}', id);
      console.log(url);
      return this.http.delete<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  createCompany(objUser: any): Observable<HttpResponse<any>>{
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/createEnterprise';
      console.log(url);
      return this.http.post<any>(url, objUser, { headers: headersForAPI, observe: 'response' });
    }
  }

  getEntCompanies(): Observable<HttpResponse<any>>{
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getEnterprise';
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  getEntCompany(id): Observable<HttpResponse<any>>{
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getEnterprise/{correl_id}';
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  delEntCompany(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/deleteEnterprise/{correl_id}';
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.delete<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  updateEntCompany(id,data){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/updateEnterprise/{correl_id}';
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.put<any>(url,data, { headers: headersForAPI, observe: 'response' });
    }
  }

  getRoprts(){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getreportlogs';
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  RoprtsbyCompany(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getreportlogs/{company_name}';
      url = url.replace('{company_name}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  RoprtsbyRec(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getreportlogs/{primary_email_id}';
      url = url.replace('{primary_email_id}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  getDashStatus(){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getallstats';
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  getRecStatus(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/getcompanystats/{company_name}';
      url = url.replace('{company_name}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  EmailAuth(data): Observable<HttpResponse<any>>{
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  this.baseUrl + '/createAuth';
      console.log(url);
      return this.http.post<any>(url, data, { headers: headersForAPI, observe: 'response' });
    }
  }
}
