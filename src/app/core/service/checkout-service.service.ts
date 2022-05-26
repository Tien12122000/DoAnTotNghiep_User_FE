import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import alertifyjs from 'alertifyjs';
import {NotificationsService} from '../service/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutServiceService {
  public host=environment.api;
  // public _notification: NotificationsService;
  constructor(private httpclient: HttpClient, private router:Router, private _notification: NotificationsService) { }
  post(url,body){
    this.httpclient.post(this.host+url,body).pipe(
      map((res:any)=>{
        // alertifyjs.success('Thanh toán thành công');
    //     this._notification.createNotification(
    //     "success",
    //     "Thành công",
    //     "Bạn đã thanh toán thành công"
    // );
        return res;
      })
    ).pipe(
      catchError((res)=>{
        alert("error");
        return this.router.navigate["/error"];
      })
    );
  }
}
