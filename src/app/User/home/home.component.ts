import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, Injector, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';
import { HeaderComponent } from '../header/header.component';
import alertifyjs from 'alertifyjs';


// declare let alertify: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor(private render2: Renderer2,private injector: Injector, private route:Router,private router:ActivatedRoute) {

    super(injector);
  }
  ngAfterViewInit(): void {
    this.loadScripts();
  }
  static state=1;
  public static list=null;
  public static list_item: any;
  static pageHomeIndex=1;
  static listTotalHomeRecord:any;
  ngOnInit(): void {
    var value:any;
    this.router.params.subscribe(res=>{
      value=res['id'];
    });

    console.log(value);
    if(value)
    {
      HomeComponent.list_item=[];
      combineLatest([
        this._api.get('/api/TuiXach/getTuiByCateIdPaginate/'+ '1'+'/'+value),
          this._api.get('/api/TuiXach/getTuiByCateId_all/'+value),
      ]).subscribe(res => {
        HomeComponent.list_item = res[0];

        HomeComponent.listTotalHomeRecord=res[1];
        setTimeout(() => {
          this.loadScripts();
        });
      }, err => { throw err; });
    }
    else
    combineLatest([
      this._api.get('/api/TuiXach/Tui-page/'+ HomeComponent.pageHomeIndex),
      this._api.get('/api/TuiXach/Get-Row-total-tui-records'),
    //  this._api.post('/api/item/search',{page: 1, pageSize: 5, item_group_id: null})
    ]).subscribe(res => {
      HomeComponent.list_item = res[0];
      HomeComponent.listTotalHomeRecord = res[1];
      // console.log(this.listTotalHomeRecord);
      this.staticUrlArray();
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { throw err; });
  }
  next(){
    // debugger;
    if(HomeComponent.state==1){
      if((HomeComponent.list != null)){
        if(HomeComponent.pageHomeIndex<HomeComponent.listTotalHomeRecord.length){
          HomeComponent.pageHomeIndex+=1;
          if(HomeComponent.pageHomeIndex >= HomeComponent.listTotalHomeRecord.length){
            HomeComponent.pageHomeIndex=HomeComponent.listTotalHomeRecord.length;
          }
        }
        combineLatest([
          this._api.get('/api/TuiXach/Search-Tui-Paginate/'+ HomeComponent.pageHomeIndex +'/'+HeaderComponent.value),
        ]).subscribe(res => {
          HomeComponent.list_item = res[0];
          // console.log(HomeComponent.list_item);
          // console.log(HomeComponent.pageHomeIndex);
          setTimeout(() => {
            this.loadScripts();
          });
        }, err => { throw err; });

      }
      else if(HomeComponent.list == null)
      {
        if(HomeComponent.pageHomeIndex<HomeComponent.listTotalHomeRecord.length){
          HomeComponent.pageHomeIndex+=1;
          if(HomeComponent.pageHomeIndex >= HomeComponent.listTotalHomeRecord.length){
            HomeComponent.pageHomeIndex=HomeComponent.listTotalHomeRecord.length;
          }
          combineLatest([
            this._api.get('/api/TuiXach/Tui-page/'+ HomeComponent.pageHomeIndex),
          ]).subscribe(res => {
            HomeComponent.list_item = res[0];
            // console.log(HomeComponent.list_item);
            // console.log(HomeComponent.pageHomeIndex);
            setTimeout(() => {
              this.loadScripts();
            });
          }, err => { throw err; });
        }
      }
    }
    else if(HomeComponent.state==2){
      if(HomeComponent.pageHomeIndex<HomeComponent.listTotalHomeRecord.length){
        HomeComponent.pageHomeIndex+=1;
        if(HomeComponent.pageHomeIndex >= HomeComponent.listTotalHomeRecord.length){
          HomeComponent.pageHomeIndex=HomeComponent.listTotalHomeRecord.length;
        }
        combineLatest([
          this._api.get('/api/TuiXach/getTuiByCateIdPaginate/'+ HomeComponent.pageHomeIndex+'/'+HeaderComponent.cateid),
        ]).subscribe(res => {
          HomeComponent.list_item = res[0];
          // console.log(HomeComponent.list_item);
          // console.log(HomeComponent.pageHomeIndex);
          setTimeout(() => {
            this.loadScripts();
          });
        }, err => { throw err; });
      }
    }
  }
  previous(){
    if(HomeComponent.state==1){
      if(HomeComponent.list != null){
        if(HomeComponent.pageHomeIndex<=HomeComponent.listTotalHomeRecord.length && HomeComponent.pageHomeIndex>1){
          HomeComponent.pageHomeIndex-=1;
        }
        combineLatest([
          this._api.get('/api/TuiXach/Search-Tui-Paginate/'+ HomeComponent.pageHomeIndex +'/'+HeaderComponent.value),
        ]).subscribe(res => {
          HomeComponent.list_item = res[0];
          // console.log(HomeComponent.list_item);
          // console.log(HomeComponent.pageHomeIndex);
          setTimeout(() => {
            this.loadScripts();
          });
        }, err => { throw err; });

      }
      else if(HomeComponent.list == null)
        if(HomeComponent.pageHomeIndex<=HomeComponent.listTotalHomeRecord.length && HomeComponent.pageHomeIndex>1){
          HomeComponent.pageHomeIndex-=1;
          if(HomeComponent.pageHomeIndex<1) HomeComponent.pageHomeIndex=1;
          combineLatest([
            this._api.get('/api/TuiXach/Tui-page/'+ HomeComponent.pageHomeIndex),
          ]).subscribe(res => {
            HomeComponent.list_item = res[0];
            // console.log(HomeComponent.list_item);
            // console.log(HomeComponent.pageHomeIndex);
            setTimeout(() => {
              this.loadScripts();
            });
          }, err => { throw err; });
      }
    }
    else if(HomeComponent.state==2){
      if(HomeComponent.pageHomeIndex<=HomeComponent.listTotalHomeRecord.length && HomeComponent.pageHomeIndex>1){
        HomeComponent.pageHomeIndex-=1;
        if(HomeComponent.pageHomeIndex<1) HomeComponent.pageHomeIndex=1;
        combineLatest([
          this._api.get('/api/TuiXach/getTuiByCateIdPaginate/'+ HomeComponent.pageHomeIndex+'/'+HeaderComponent.cateid),
        ]).subscribe(res => {
          HomeComponent.list_item = res[0];
          // console.log(HomeComponent.list_item);
          // console.log(HomeComponent.pageHomeIndex);
          setTimeout(() => {
            this.loadScripts();
          });
        }, err => { throw err; });
      }
    }

  }
  change(value){
    HomeComponent.pageHomeIndex=value;
    if(HomeComponent.state==1){
      if(HomeComponent.list != null ){

        combineLatest([
          this._api.get('/api/TuiXach/Search-Tui-Paginate/'+ HomeComponent.pageHomeIndex +'/'+HeaderComponent.value),
        ]).subscribe(res => {
          HomeComponent.list_item = res[0];
          // console.log(HomeComponent.list_item);
          // console.log(HomeComponent.pageHomeIndex);
          setTimeout(() => {
            this.loadScripts();
          });
        }, err => { throw err; });

      }
      else{
        combineLatest([
          this._api.get('/api/TuiXach/Tui-page/'+ HomeComponent.pageHomeIndex),
        //  this._api.post('/api/item/search',{page: 1, pageSize: 5, item_group_id: null})
        ]).subscribe(res => {
          HomeComponent.list_item = res[0];
          // console.log(HomeComponent.list_item);
          setTimeout(() => {
            this.loadScripts();
          });
        }, err => { throw err; });
      }
    }
    else if(HomeComponent.state==2){
      combineLatest([
        this._api.get('/api/TuiXach/getTuiByCateIdPaginate/'+ HomeComponent.pageHomeIndex+'/'+HeaderComponent.cateid),
      ]).subscribe(res => {
        HomeComponent.list_item = res[0];
        // console.log(HomeComponent.list_item);
        // console.log(HomeComponent.pageHomeIndex);
        setTimeout(() => {
          this.loadScripts();
        });
      }, err => { throw err; });
    }
  }
  get staticUrlArray() {
    console.log(HomeComponent.list_item);
    return HomeComponent.list_item;
  }
  get staticIndex() {
    return HomeComponent.pageHomeIndex;
  }
  get staticRecordcount() {
    return HomeComponent.listTotalHomeRecord;
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
        alertifyjs.success('Đã thêm giỏ hàng');
      });
    }, err => { throw err; });
    this._cart.total();
    // HeaderComponent.arr.unshift(1);
  }
}
