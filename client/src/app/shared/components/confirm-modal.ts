import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss'
})
export class ConfirmModalComponent {
  @Input() isOpen = false;
  @Input() title = 'Confirm Delete';
  @Input() message = 'Are you sure you want to delete this record? This action cannot be undone.';
  @Input() confirmLabel = 'Delete';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
}