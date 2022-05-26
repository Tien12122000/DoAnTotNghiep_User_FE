import { Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {

  constructor(private render2: Renderer2,private injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.formG= new FormGroup({
      Seacrh:new FormControl('',Validators.maxLength(100))
    });
    let local_storage = JSON.parse(localStorage.getItem('cart'));
    console.log(local_storage);
    combineLatest([
      this._api.get('/api/LoaiTuiXaches/danhsach/'),
    ]).subscribe(res => {
      this.category=res[0];
      console.log(this.category);
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { throw err; });
    // console.log(HomeComponent.pageHomeIndex);
  }
  static value;
  category:any;
  formG:FormGroup;
  search(getData){
    HomeComponent.state=1;
    HeaderComponent.value=getData.Seacrh;
    combineLatest([
      this._api.get('/api/TuiXach/Search-Tui-Paginate/'+ '1'+'/'+HeaderComponent.value),
      this._api.get('/api/TuiXach/Search-Record-count/'+HeaderComponent.value),
    ]).subscribe(res => {
      HomeComponent.list_item = res[0];
      HomeComponent.list=res[0];
      HomeComponent.listTotalHomeRecord=res[1];
      HomeComponent.pageHomeIndex=1;
      console.log(HomeComponent.list_item);
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { throw err; });
    this.formG= new FormGroup({
      Seacrh:new FormControl('',Validators.maxLength(100))
    });
  }
  static cateid;
  getTuiByCate(id){
    HomeComponent.state=2;
    HeaderComponent.cateid=id;
    combineLatest([
      this._api.get('/api/TuiXach/getTuiByCateIdPaginate/'+ '1'+'/'+id),
      this._api.get('/api/TuiXach/getTuiByCateId_all/'+id),
    ]).subscribe(res => {
      HomeComponent.list_item = res[0];
      HomeComponent.listTotalHomeRecord=res[1];
      HomeComponent.pageHomeIndex=1;
      console.log(HomeComponent.list_item);
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { throw err; });
    // alert("ok");
  }
  static arr=[];
  getArrcartItem (){
    return HeaderComponent.arr;
  }
  getArrcartItemLength (){
    return HeaderComponent.arr.length;
  }
  getlistCartItem (){
    return this._cart.getItems();
  }
  getnumberOfItems (){
    return this._cart.numberOfItems();
  }

  deleteItem (id){
    this._cart.deleteItem(id);
  }
}
