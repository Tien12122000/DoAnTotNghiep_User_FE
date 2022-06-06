import { Component, Injector, OnInit,NgZone  } from '@angular/core';
import { BaseComponent } from 'src/app/core/base/base.component';
import alertifyjs from 'alertifyjs';
import * as $ from 'jquery'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector, private ngZone: NgZone) {
    super(injector);
  }
  Stt:any;
  static listCartItem:any;
  ngOnInit(): void {
    this.getlistCartItem ();
    this.Stt=0;
    // console.log(this._cart.getItems());
  }
  getlistCartItem (){
    console.log(this._cart.getItems());
    return this._cart.getItems();
  }
  updateCartQuanty(){

    // let list=JSON.parse("listViewCartItem");
    let lisCartItem = [];
            $("table tbody tr td").each(function() {
                $(this).find('input').each(function() {
                    var element = {
                        id: $(this).attr('id'),
                        quantity: $(this).val()
                    };
                    lisCartItem.push(element);
                })
            });
    console.log(lisCartItem);
    for (let index = 0; index < lisCartItem.length; index++) {
      this._cart.addQty(lisCartItem[index]);
    }
    this._cart.total();
    alertifyjs.success('Cập nhật giỏ hàng thành công');
    console.log("list");
    console.log(this._cart.getItems());
  }
  deleteItem (id){
    this._cart.deleteItem(id);
    this._cart.total();
    alertifyjs.success('Xóa sản phẩm thành công');
  }
  total(){
    return this._cart.total();
  }
  ShowOrderNumber(stt){
    return ++stt;
  }
}
