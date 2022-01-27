import { Component, OnInit } from '@angular/core';
import {of, Subscription} from "rxjs";
import {AppareilService} from "../appareil.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {
  isAuth = false;
  appareils!: any[];
  appareilSubscription!: Subscription;

  lastUpdate = of(new Date()).pipe(delay(2000))


  constructor(private appareilService: AppareilService) { }

  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onAllumer() {
    this.appareilService.switchOnAll();
  }

  onEteindre() {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareils ?')) {
      this.appareilService.switchOffAll();
    } else {
      return null;
    }
    return undefined;
  }

  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }
}
