import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation-order',
  templateUrl: './confirmation-order.component.html',
  styleUrls: ['./confirmation-order.component.css']
})
export class ConfirmationOrderComponent implements OnInit {
  fullName :  string = '';
  totalPrice : number = 0.00;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.fullName = params.get("fullname") || "";
      this.totalPrice = Number(params.get("totalprice")) || 0.00;
    })
  }

}
