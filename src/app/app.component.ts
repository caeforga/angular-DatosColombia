import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'ZONAS Y DISTRITOS MILITARES EJERCITO NACIONAL';
  distritos = null;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor( private http: HttpClient) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.http.get("https://www.datos.gov.co/resource/ii2p-naes.json").subscribe(
      result => {
        this.distritos = result;
        this.dtTrigger.next();
      },
      error => {
        console.log('problemas');
        
      }
    )
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
