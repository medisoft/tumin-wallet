import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-scanqr',
  templateUrl: 'scanqr.html'
})
export class ScanQRPage {

  label1 = 'Some data here!!!';

  constructor(public navCtrl: NavController) {

  }

}
