import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOffer } from '../offer.model';

@Component({
  selector: 'jhi-offer-detail',
  templateUrl: './offer-detail.component.html',
})
export class OfferDetailComponent implements OnInit {
  offer: IOffer | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ offer }) => {
      this.offer = offer;
    });
  }

  previousState(): void {
    window.history.back();
  }

  getOfferImage(offerId: number): String {
    const url = SERVER_API_URL + 'files/offer-image/' + offerId;
    return url;
  }
}
