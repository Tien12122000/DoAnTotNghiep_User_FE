import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-product-deltail',
  templateUrl: './product-deltail.component.html',
  styleUrls: ['./product-deltail.component.css']
})
export class ProductDeltailComponent extends BaseComponent implements OnInit {

  constructor(private router:ActivatedRoute, private inject:Injector) {
    super(inject);
  }
  tuixach:any;
  relatedProducts:any;
  ngOnInit(): void {
    var value:any;
    this.router.params.subscribe(res=>{
      value=res['id'];
    })
    combineLatest([
      this._api.get('/api/TuiXach/Get-Tui-by-ID/'+value),
    ]).subscribe(res => {
      this.tuixach = res[0];
      // this.relatedProducts = res[1];
      // console.log(this.relatedProducts);
      combineLatest([
        this._api.get('/api/TuiXach/Get-related-products/'+ this.tuixach.maLoaiTuiXach)
      ]).subscribe(result=>{
        this.relatedProducts = result[0];
        console.log(this.relatedProducts);
      });
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { throw err; });
  }
  addToCart(id){
    combineLatest([
      this._api.get('/api/Cart/Create-Sale-Prod/'+ id),
    ]).subscribe(res => {
      this._cart.addToCart(res[0]);
      // console.log(res[0]);
      // console.log(this._cart.getItems());
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { throw err; });
    this._cart.total();
    alertifyjs.success('Đã thêm giỏ hàng');
    // HeaderComponent.arr.unshift(1);
  }
}
