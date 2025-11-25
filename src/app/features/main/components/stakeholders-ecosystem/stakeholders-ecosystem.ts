import { Component } from '@angular/core';
import { TranslatePipe, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-stakeholders-ecosystem',
  standalone: true,
  imports: [TranslateModule, TranslatePipe],
  templateUrl: './stakeholders-ecosystem.html',
  styleUrl: './stakeholders-ecosystem.scss',
})
export class StakeholdersEcosystem {

}
