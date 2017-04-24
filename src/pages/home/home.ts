import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  label1 = 'alsjdfl';

  txs = [
    {id: 1, amount: 1.234 },
    {id: 2, amount: 0.234 },
    {id: 3, amount: 5.123 },
    {id: 4, amount: 9.000 },
  ]

  constructor(public navCtrl: NavController) {

  }

}
