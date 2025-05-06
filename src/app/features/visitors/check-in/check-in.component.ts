import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckInDto, VisitorService } from 'app/core/services/visitor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-in',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-in.component.html',
  styleUrl: './check-in.component.css'
})
export class CheckInComponent {
  checkInForm: FormGroup;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private visitorService: VisitorService
  ) {
    this.checkInForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      reason: ['']
    });
  }

  submit() {
    if (this.checkInForm.invalid) return;
    const data: CheckInDto = this.checkInForm.value;

    this.visitorService.checkInVisitor(data).subscribe({
      next: () => {
        this.message = `${data.fullName} checked in successfully.`;
        this.checkInForm.reset();
      },
      error: () => {
        this.message = `Failed to check in ${data.fullName}`;
      }
    });
  }
}
