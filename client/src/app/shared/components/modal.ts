import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}