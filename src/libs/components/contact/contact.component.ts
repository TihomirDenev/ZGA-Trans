import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CONTACT_CHANNELS, LOAD_TYPES } from '@libs/constants/contact.constants';
import { PRIVACY_POLICY_PATH } from '@libs/constants/routes.constants';
import { buildQuoteEmailLink } from '@libs/helpers/contact.helpers';
import {
  createScopedAnimations,
  isReducedMotionPreferred,
  revealOnScroll,
} from '@libs/helpers/animation.helpers';
import { QuoteRequest } from '@libs/models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly contactChannels = CONTACT_CHANNELS;
  protected readonly loadTypes = LOAD_TYPES;
  protected readonly privacyPolicyPath = PRIVACY_POLICY_PATH;
  protected readonly isSubmitted = signal(false);

  protected readonly quoteForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    company: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    collectionPostcode: ['', Validators.required],
    deliveryPostcode: ['', Validators.required],
    loadType: [LOAD_TYPES[0], Validators.required],
    collectionDate: [''],
    details: [''],
  });

  constructor() {
    afterNextRender(() => {
      if (isReducedMotionPreferred()) {
        return;
      }

      createScopedAnimations(this.elementRef.nativeElement, this.destroyRef, () => {
        revealOnScroll('.contact-intro > *', '.contact');
        revealOnScroll('.quote-card', '.contact');
      });
    });
  }

  hasFieldError(fieldName: keyof QuoteRequest): boolean {
    const field = this.quoteForm.controls[fieldName];

    return field.invalid && field.touched;
  }

  onSubmit(): void {
    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      return;
    }

    const quoteRequest: QuoteRequest = this.quoteForm.getRawValue();

    window.location.href = buildQuoteEmailLink(quoteRequest);
    this.isSubmitted.set(true);
  }

  onSendAnother(): void {
    this.quoteForm.reset();
    this.isSubmitted.set(false);
  }
}
