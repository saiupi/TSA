import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/finally';
// import 'rxjs/add/operator/do';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl: string = 'http://192.168.3.211:4000'
  // /userDetails/adminLogin
  constructor(public http: HttpClient) { }
  get(url) {


    return this.http.get(this.apiUrl + url)
  }
  post(url, body) {


    return this.http.post(this.apiUrl + url, body)
  }
}
  //   let loading =   this.loadingController.create({
  //     spinner: 'crescent',
  //    // duration: 2000,
  //     message: 'Please wait...',
  //   });
  //   loading.then(loading => loading.present());


  //   // return this.http.get('http://192.168.2.57:4000/offence/getAll')
  //   return this.http.get(this.apiUrl+url)
  //     .finally(() => {
  //        loading.then(loading => loading.dismiss());

  //     });
  // }


