import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of as observableOf, Subject } from 'rxjs';
import { ApiService } from '../service/api.service';
import { CartServiceService } from '../service/cart-service.service';
import { CheckoutServiceService } from '../service/checkout-service.service';
import {NotificationsService} from '../service/notifications.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  public unsubscribe = new Subject();
   public _renderer:any;
   public _api: ApiService;
   public _route: ActivatedRoute;
   public _cart: CartServiceService;
   public _checkOut:CheckoutServiceService;
   public _notification: NotificationsService;
   constructor(injector: Injector) {
      this._renderer = injector.get(Renderer2);
      this._api = injector.get(ApiService);
      this._route = injector.get(ActivatedRoute);
      this._cart = injector.get(CartServiceService);
      this._checkOut = injector.get(CheckoutServiceService);
      this._notification = injector.get(NotificationsService);
      }
   public loadScripts() {
         this.renderExternalScript('assets/js/main.js').onload = () => {
         }
       }
   public renderExternalScript(src: string): HTMLScriptElement {
         const script = document.createElement('script');
         script.type = 'text/javascript';
         script.src = src;
         script.async = true;
         script.defer = true;
         this._renderer.appendChild(document.body, script);
         return script;
       }

}
