import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  label1 = 'Some data here!!!';

  constructor(public navCtrl: NavController) {

  }

}
