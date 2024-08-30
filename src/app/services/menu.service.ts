import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private toggleMenuSource = new Subject<void>();

  toggleMenu$ = this.toggleMenuSource.asObservable();

  triggerToggleMenu() {
    this.toggleMenuSource.next();
  }
}
