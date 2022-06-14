import { HttpHeaders } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector) {
    super(injector);
  }
  formgroup:FormGroup;
  ngAfterViewInit(): void {
    this.loadScripts();
  }
  ngOnInit(): void {
    this.formgroup= new FormGroup({
      HoTenKhachHang: new FormControl('',Validators.required),
      EmailKhachHang:new FormControl('',[Validators.required, Validators.email]),
      pass:new FormControl('',Validators.required),
      // SoDienThoai:new FormControl('',[Validators.required,Validators.pattern("/(0[1|2|3|6|8|9])+([0-9]{8})\b/g")]),
      SoDienThoai:new FormControl('',[Validators.required]),
      DiaChiKhachHang:new FormControl('',Validators.required),
      ghichu:new FormControl(''),
    });
    combineLatest([
      // this._api.post("/api/Cart/CheckOut",options),
      this._api.get("/api/DonHangControllerr/Get-all-Donhang")
    ]).subscribe(res => {
      // console.log(res[0]),
      console.log(res[0])
      // setTimeout(() => {
      //   this.loadScripts();
      // });
    }, err => { throw err; });
  }
  checkButton="";
  checkout(formgroup){
    // debugger;
    // alert("ok");
    let listCartItem=this._cart.getItems();
    // console.log(listCartItem);
    if(listCartItem.length!=0){
      // let CartModel={
      //   products:this._cart.getItems(),
      //   tongSoLuong:this._cart.numberOfItems(),
      //   TongTien:this._cart.total()
      // }
      console.log(formgroup);
      var tempBill={
        ten:formgroup.controls.HoTenKhachHang.value,
        email:formgroup.controls.EmailKhachHang.value,
        phone:formgroup.controls.SoDienThoai.value,
        address:formgroup.controls.DiaChiKhachHang.value,
        pass:formgroup.controls.pass.value,
        note:formgroup.controls.ghichu.value,
        tongtien:this._cart.total(),
        tongsoluong:this._cart.numberOfItems(),
        products: this._cart.getItems()
      };
      console.log(tempBill);

      // console.log(this._cart.getItems());
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: tempBill
      };
      // combineLatest([
      //   this._checkOut.post("/api/Cart/Thanh-Toan",options)
      // ])
      combineLatest([
        this._api.post("/api/Cart/CheckOut/",tempBill),
        // this._api.get("/api/DonHang/Get-all-Donhang")
      ]).subscribe(res => {
        // console.log(res[0]),
        console.log(res[0])
        setTimeout(() => {
          this.loadScripts();
        });
      }, err => { throw err; });
      // // this._notification.createNotification(
      // //   "success",
      // //   "Thành công",
      // //   "Bạn đã thanh toán thành công"
      // // );
      this._cart.clearCart();
      // alert("ok");
      alertifyjs.success('Đặt hàng thành công');
      setTimeout(() => {
        window.location.pathname="/";
      }, 2000);
      }
    else{
      alert("Giỏ hàng trống");
    }
    // alert("ok");
  }

}
