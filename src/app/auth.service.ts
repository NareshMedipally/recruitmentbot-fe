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

  private loginAPI = "https://recruitment-bot-demo.herokuapp.com/user";
  private getEnterpriseAPI = "https://recruitment-bot-demo.herokuapp.com/getuser";

  getToken() {
    this.AccessToken = localStorage.getItem('token')
    if(this.AccessToken) {
      this.headers.append('Authorization', 'Bearer ' + this.AccessToken)
    }
  }

  login(objUser: any): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    return this.http.post<any>(this.loginAPI, objUser, {headers: headersForAPI, observe: 'response'})
  }

  changePwd(id,objUser): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/user/changePassword/{correl_id}';
    url = url.replace('{correl_id}', id);
    return this.http.put<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
  }

  createUser(objUser): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/createuser';
    return this.http.post<any>(url,objUser, { headers: headersForAPI, observe: 'response' });
  }

  getCompanies(id){
    this.getToken();
    if(this.AccessToken) {
      var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
      headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
      let url =  'https://recruitment-bot-demo.herokuapp.com/company/getuser/{company_name}';
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
      let url =  'https://recruitment-bot-demo.herokuapp.com/getuser/{correl_id}'
      url = url.replace('{correl_id}', id);
      console.log(url);
      return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
    }
  }

  updateCompany(id,data){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/updateuser/{correl_id}';
    url = url.replace('{correl_id}', id);
    console.log(url);
    return this.http.put<any>(url,data, { headers: headersForAPI, observe: 'response' });
  }

  deleteCompany(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/deleteuser/{correl_id}';
    url = url.replace('{correl_id}', id);
    console.log(url);
    return this.http.delete<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  getTags(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/gettags/{company_name}';
    url = url.replace('{company_name}', id);
    console.log(url);
    return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  postTags(objUser: any): Observable<HttpResponse<any>> {
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/createtags';
    console.log(url);
    return this.http.post<any>(url, objUser, { headers: headersForAPI, observe: 'response' });
  }

  getTag(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/gettag/{tag_id}';
    url = url.replace('{tag_id}', id);
    console.log(url);
    return this.http.get<any>(url, { headers: headersForAPI, observe: 'response' });
  }

  UpdateTag(id,data){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/updatetags/{tag_id}';
    url = url.replace('{tag_id}', id);
    console.log(url);
    return this.http.put<any>(url, data, { headers: headersForAPI, observe: 'response' });
  }

  DeleteTag(id){
    var headersForAPI = new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'Authorization': 'Bearer ' + this.AccessToken });
    headersForAPI.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let url =  'https://recruitment-bot-demo.herokuapp.com/deletetags/{tag_id}';
    url = url.replace('{tag_id}', id);
    console.log(url);
    return this.http.delete<any>(url, { headers: headersForAPI, observe: 'response' });
  }
}
