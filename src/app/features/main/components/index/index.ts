import { Component } from '@angular/core';
import { HomePage } from "../../pages/home/home";
import { About } from "../../pages/about/about";
import { Opinions } from "../../pages/opinions/opinions";
import { Offer } from "../../pages/offer/offer";
import { Partners } from "../../pages/partners/partners";
import { Contact } from "../../pages/contact/contact";

@Component({
  selector: 'app-index',
  imports: [HomePage, About, Opinions, Offer, Partners, Contact],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class IndexMainFeature {

}
