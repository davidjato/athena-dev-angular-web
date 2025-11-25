import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

}
