import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-opinions',
  imports: [TranslatePipe],
  templateUrl: './opinions.html',
  styleUrl: './opinions.scss',
})
export class Opinions { }
