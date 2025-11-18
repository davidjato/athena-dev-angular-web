import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './button.html',
    styleUrl: './button.scss',
})
export class ButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'outline' | 'gold' = 'primary';
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    @Input() disabled: boolean = false;
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() fullWidth: boolean = false;

    @Output() clicked = new EventEmitter<Event>();

    onClick(event: Event): void {
        if (!this.disabled) {
            this.clicked.emit(event);
        }
    }
}
