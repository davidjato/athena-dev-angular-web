import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-investment-focus',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './investment-focus.html',
  styleUrl: './investment-focus.scss',
})
export class InvestmentFocus {

}
