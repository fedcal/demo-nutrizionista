import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { RisorsaItem, RicettaBlog, GuidaPdf } from '../../data/types';

interface RisorseView {
  ricette: RicettaBlog[];
  guide: GuidaPdf[];
}

@Component({
  selector: 'app-risorse',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Risorse gratuite</h1>
        <p>Ricette bilanciate, guide pratiche e contenuti evidence-based per mangiare meglio ogni giorno.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="view$ | async as view">
      <section class="risorse-section">
        <div class="section-header">
          <h2>Ricette bilanciate</h2>
          <span class="badge-count">{{ view.ricette.length }} ricette</span>
        </div>
        <ul class="ricette-grid">
          <li *ngFor="let r of view.ricette" class="ricetta-card">
            <div class="ricetta-card__category">{{ r.categoria }}</div>
            <h3 class="ricetta-card__title">{{ r.titolo }}</h3>
            <p class="ricetta-card__desc">{{ r.descrizione }}</p>
            <div class="ricetta-card__meta">
              <span class="meta-chip">{{ r.tempoPreparazione }}</span>
              <span class="meta-chip">{{ r.calorie }} kcal</span>
            </div>
            <div class="ricetta-card__tags">
              <span *ngFor="let tag of r.tags" class="tag">{{ tag }}</span>
            </div>
            <p class="ricetta-card__date">{{ r.dataPublicazione | date: 'd MMMM yyyy' : '' : 'it' }}</p>
          </li>
        </ul>
      </section>

      <section class="risorse-section">
        <div class="section-header">
          <h2>Guide PDF scaricabili</h2>
          <span class="badge-count">{{ view.guide.length }} guide</span>
        </div>
        <ul class="guide-list">
          <li *ngFor="let g of view.guide" class="guida-card">
            <div class="guida-card__icon" aria-hidden="true">📄</div>
            <div class="guida-card__body">
              <div class="guida-card__argomento">{{ g.argomento }}</div>
              <h3 class="guida-card__title">{{ g.titolo }}</h3>
              <p class="guida-card__desc">{{ g.descrizione }}</p>
              <div class="guida-card__meta">
                <span class="meta-chip">{{ g.pagine }} pagine</span>
                <span *ngFor="let tag of g.tags" class="tag">{{ tag }}</span>
              </div>
            </div>
            <div class="guida-card__download">
              <button class="btn btn-download" type="button" aria-label="Scarica guida (demo)">
                Scarica PDF
              </button>
              <p class="download-note">Demo — nessun file reale</p>
            </div>
          </li>
        </ul>
      </section>

      <aside class="newsletter-box">
        <h3>Ricevi nuove risorse ogni mese</h3>
        <p>
          Iscriviti alla newsletter dello studio per ricevere ricette, guide e aggiornamenti
          nutrizionali direttamente nella tua inbox.
        </p>
        <p class="newsletter-disclaimer">
          Demo non funzionale. I dati non vengono raccolti.
        </p>
      </aside>
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
      .risorse-section {
        margin-bottom: 4rem;
      }
      .section-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .section-header h2 {
        margin: 0;
      }
      .badge-count {
        font-size: 0.8rem;
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .ricette-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
      }
      .ricetta-card {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .ricetta-card__category {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-accent);
        margin-bottom: 0.5rem;
      }
      .ricetta-card__title {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
        line-height: 1.3;
      }
      .ricetta-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .ricetta-card__meta {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        margin-bottom: 0.5rem;
      }
      .meta-chip {
        font-size: 0.75rem;
        background: var(--color-bg-subtle);
        padding: 0.2rem 0.5rem;
        border-radius: var(--radius-sm);
        color: var(--color-fg-muted);
        font-weight: 600;
      }
      .ricetta-card__tags {
        display: flex;
        gap: 0.35rem;
        flex-wrap: wrap;
        margin-bottom: 0.5rem;
      }
      .tag {
        font-size: 0.7rem;
        background: #f0fdf4;
        color: var(--color-success);
        padding: 0.15rem 0.45rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .ricetta-card__date {
        font-size: 0.75rem;
        color: var(--color-fg-muted);
        margin: 0;
      }
      .guide-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .guida-card {
        display: flex;
        gap: 1.25rem;
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
        align-items: flex-start;
        flex-wrap: wrap;
      }
      .guida-card__icon {
        font-size: 2.5rem;
        flex-shrink: 0;
      }
      .guida-card__body {
        flex: 1;
        min-width: 200px;
      }
      .guida-card__argomento {
        font-size: 0.72rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-accent);
        margin-bottom: 0.25rem;
      }
      .guida-card__title {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
        line-height: 1.3;
      }
      .guida-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
      }
      .guida-card__meta {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .guida-card__download {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.25rem;
        flex-shrink: 0;
      }
      .btn {
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.9rem;
      }
      .btn-download {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-download:hover {
        background: #4d7c0f;
      }
      .download-note {
        font-size: 0.7rem;
        color: var(--color-fg-muted);
        margin: 0;
        font-style: italic;
      }
      .newsletter-box {
        margin-top: 2rem;
        padding: 2rem;
        background: #f0fdf4;
        border-radius: var(--radius-lg);
        border: 1px solid #bbf7d0;
        text-align: center;
      }
      .newsletter-box h3 {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
      }
      .newsletter-box p {
        margin: 0 0 0.5rem;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .newsletter-disclaimer {
        font-size: 0.75rem;
        font-style: italic;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RisorseComponent {
  private readonly mockData = inject(MockDataService);

  readonly view$ = this.mockData.risorse$.pipe(
    map((data): RisorseView => ({
      ricette: data.risorse.filter((r): r is RicettaBlog => r.tipo === 'ricetta'),
      guide:   data.risorse.filter((g): g is GuidaPdf => g.tipo === 'guida')
    }))
  );
}
