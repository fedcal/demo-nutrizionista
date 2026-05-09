import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Nutrizione personalizzata,<br>evidence-based</h1>
        <p class="hero-tagline">
          Piani alimentari basati su prove scientifiche solide. Niente mode, niente diete impossibili.
          Solo strategie nutrizionali efficaci e sostenibili nel tempo.
        </p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota una consulenza</a>
          <a routerLink="/servizi" class="btn btn-secondary">Scopri i servizi</a>
        </div>
        <p class="hero-trust">
          Dr.ssa Elena Conte — Biologa Nutrizionista iscritta ONB n. 087234
        </p>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Un approccio diverso alla nutrizione</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🔬</span>
          <h3>Evidence-based</h3>
          <p>Solo raccomandazioni supportate da studi scientifici peer-reviewed. Nessuna pseudoscienza.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎯</span>
          <h3>Personalizzato</h3>
          <p>Il piano è costruito sulla tua storia, le tue preferenze e il tuo stile di vita. Non esiste una dieta per tutti.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📊</span>
          <h3>Misurabile</h3>
          <p>Analisi InBody per monitorare composizione corporea reale: massa grassa, muscolare e idratazione.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">♻️</span>
          <h3>Sostenibile</h3>
          <p>Piani alimentari che si integrano nella vita reale: lavoro, famiglia, sport, ristoranti.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredServizi$ | async as servizi">
      <div class="section-header">
        <h2>I servizi principali</h2>
        <a routerLink="/servizi" class="link-more">Tutti i servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <div class="servizio-card__head">
            <h3>{{ s.nome }}</h3>
            <span class="servizio-card__price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
          </div>
          <p class="servizio-card__desc">{{ s.descrizione }}</p>
          <div class="servizio-card__meta">
            <span class="meta-item">{{ s.durata }}</span>
            <span *ngIf="s.disponibileOnline" class="badge badge--online">Disponibile online</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Inizia il tuo percorso nutrizionale</h2>
        <p>Prima visita €100 · Follow-up €50 · Consulenza online disponibile</p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota ora</a>
          <a routerLink="/risorse" class="btn btn-secondary">Risorse gratuite</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
        line-height: 1.2;
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 auto 2rem;
        max-width: 600px;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
      }
      .hero-trust {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #4d7c0f;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .servizio-card__head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
      }
      .servizio-card__head h3 {
        margin: 0;
        font-size: 1rem;
        line-height: 1.3;
      }
      .servizio-card__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
        font-size: 1.1rem;
      }
      .servizio-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .servizio-card__meta {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        flex-wrap: wrap;
      }
      .meta-item {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--online {
        background: #dcfce7;
        color: var(--color-success);
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.3);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredServizi$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.filter((s) =>
      ['prima-visita', 'dieta-sportiva', 'intolleranze'].includes(s.id)
    ))
  );
}
