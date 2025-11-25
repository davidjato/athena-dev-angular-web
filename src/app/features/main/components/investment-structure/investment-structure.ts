import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-investment-structure',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './investment-structure.html',
  styleUrl: './investment-structure.scss',
})
export class InvestmentStructure {

}
