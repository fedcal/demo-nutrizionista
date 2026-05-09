import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Prenota una consulenza</h1>
        <p>Prima visita o follow-up, in studio a Roma o online. Risposta entro 24 ore lavorative.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Studio</h2>
          <p>
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </p>
          <p class="albo-note">{{ info.ordine }}</p>

          <h2>Contatti diretti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono / WhatsApp:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari di ricevimento</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>

          <div class="faq-preview" *ngIf="faq$ | async as faqData">
            <h2>Domande frequenti</h2>
            <details *ngFor="let item of faqData.faq.slice(0, 3)" class="faq-item">
              <summary>{{ item.domanda }}</summary>
              <p>{{ item.risposta }}</p>
            </details>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiesta di appuntamento</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome</label>
              <input id="nome" type="text" formControlName="nome" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="telefono">Telefono</label>
              <input id="telefono" type="tel" formControlName="telefono" autocomplete="tel" required />
            </div>
            <div class="field">
              <label for="tipoVisita">Tipo di consulenza</label>
              <select id="tipoVisita" formControlName="tipoVisita" required>
                <option value="">Seleziona...</option>
                <option value="prima-visita">Prima visita nutrizionale (€100)</option>
                <option value="follow-up">Visita di controllo follow-up (€50)</option>
                <option value="body-composition">Analisi composizione corporea InBody (€40)</option>
                <option value="dieta-sportiva">Nutrizione sportiva (€120)</option>
                <option value="gravidanza">Nutrizione in gravidanza (€120)</option>
                <option value="dimagrimento">Programma dimagrimento (€100)</option>
                <option value="intolleranze">Gestione intolleranze (€100)</option>
                <option value="online">Consulenza online (€90)</option>
              </select>
            </div>
            <div class="field">
              <label for="modalita">Modalità</label>
              <select id="modalita" formControlName="modalita" required>
                <option value="">Seleziona...</option>
                <option value="studio">In studio (Roma, Via Nomentana 120)</option>
                <option value="online">Online (videochiamata)</option>
              </select>
            </div>
            <div class="field">
              <label for="messaggio">Messaggio (obiettivi, note mediche rilevanti)</label>
              <textarea id="messaggio" formControlName="messaggio" rows="4"></textarea>
            </div>

            <div class="privacy-block">
              <div class="field field--checkbox">
                <input id="privacy" type="checkbox" formControlName="privacy" />
                <label for="privacy">
                  Acconsento al trattamento dei miei dati personali ai sensi dell'art. 13 GDPR
                  per la gestione della richiesta di appuntamento.
                </label>
              </div>
              <div class="field field--checkbox">
                <input id="privacySanitaria" type="checkbox" formControlName="privacySanitaria" />
                <label for="privacySanitaria">
                  Acconsento espressamente al trattamento dei dati sanitari (dati particolari ai sensi
                  dell'<strong>Art. 9 GDPR</strong>) necessari per la consulenza nutrizionale. Il
                  conferimento di tali dati è facoltativo ma necessario per l'erogazione del servizio.
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato viene inviato o conservato. Per prenotare realmente
              contattare il numero sopra.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou-icon" aria-hidden="true">✅</span>
              <h3>Richiesta ricevuta, {{ form.value['nome'] }}!</h3>
              <p>
                Hai richiesto una <strong>{{ form.value['tipoVisita'] }}</strong>
                {{ form.value['modalita'] === 'online' ? 'online' : 'in studio a Roma' }}.
              </p>
              <p>
                In un sito reale riceveresti un'email di conferma con le istruzioni per il pagamento
                e il link alla videochiamata (se online).
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">
                Nuova richiesta
              </button>
            </div>
          </ng-template>
        </section>
      </div>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.2rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .info-block p {
        margin: 0 0 0.5rem;
        line-height: 1.6;
        color: var(--color-fg-muted);
      }
      .albo-note {
        font-size: 0.82rem;
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: var(--radius-sm);
        padding: 0.35rem 0.6rem;
        display: inline-block;
        color: var(--color-success) !important;
        font-weight: 600;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .contact-list a {
        color: var(--color-accent);
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .faq-preview {
        margin-top: 1.5rem;
      }
      .faq-item {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        margin-bottom: 0.5rem;
        overflow: hidden;
      }
      .faq-item summary {
        padding: 0.75rem 1rem;
        cursor: pointer;
        font-weight: 600;
        font-size: 0.9rem;
        list-style: none;
        background: var(--color-bg-subtle);
      }
      .faq-item summary:hover {
        background: #f0fdf4;
      }
      .faq-item p {
        padding: 0.75rem 1rem;
        margin: 0;
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
        border-top: 1px solid var(--color-border);
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input[type="checkbox"] {
        margin-top: 0.2rem;
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.83rem;
        color: var(--color-fg-muted);
        line-height: 1.5;
      }
      .privacy-block {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1rem;
        background: #ffffff;
        margin-bottom: 1rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: background 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #4d7c0f;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
      }
      .thankyou {
        text-align: center;
        padding: 2rem 0;
      }
      .thankyou-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin: 0 0 1rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
        font-size: 0.95rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly faq$ = this.mockData.faq$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome:             ['', [Validators.required, Validators.minLength(2)]],
    email:            ['', [Validators.required, Validators.email]],
    telefono:         ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    tipoVisita:       ['', Validators.required],
    modalita:         ['', Validators.required],
    messaggio:        [''],
    privacy:          [false, Validators.requiredTrue],
    privacySanitaria: [false, Validators.requiredTrue]
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false, privacySanitaria: false });
    this.submitted.set(false);
  }
}
