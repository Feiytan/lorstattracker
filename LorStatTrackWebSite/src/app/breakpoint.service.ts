import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  public breakPointObserver: Observable<string>;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakPointObserver = this.breakpointObserver.observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      map(res => {
        for(let key of Object.keys(res.breakpoints)){
          if(res.breakpoints[key]){
              return key;
          };
        }
      })
    );
  }
}
