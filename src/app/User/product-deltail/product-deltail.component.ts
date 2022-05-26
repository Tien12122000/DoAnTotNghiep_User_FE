import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { BaseComponent } from 'src/app/core/base/base.component';

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
  ngOnInit(): void {
    var value:any;
    this.router.params.subscribe(res=>{
      value=res['id'];
    })
    combineLatest([
      this._api.get('/api/TuiXach/Get-Tui-by-ID/'+value),
    ]).subscribe(res => {
      this.tuixach = res[0];
      console.log(this.tuixach);
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { throw err; });
  }

}
