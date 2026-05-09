import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

interface CategoriaServizi {
  id: string;
  label: string;
  servizi: import('../../data/types').Servizio[];
}

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Servizi nutrizionali</h1>
        <p>Piani personalizzati evidence-based per ogni obiettivo e fase della vita.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="categorie$ | async as categorie">
      <section *ngFor="let cat of categorie" class="categoria-section">
        <h2>{{ cat.label }}</h2>
        <ul class="servizi-list">
          <li *ngFor="let s of cat.servizi" class="servizio-item">
            <div class="servizio-item__head">
              <h3>{{ s.nome }}</h3>
              <span class="servizio-price">{{ s.prezzo | currency: 'EUR':'symbol':'1.0-0' }}</span>
            </div>
            <p class="servizio-desc">{{ s.descrizione }}</p>
            <div class="servizio-meta">
              <span class="meta-tag">{{ s.durata }}</span>
              <span *ngIf="s.disponibileOnline" class="meta-tag meta-tag--online">Online disponibile</span>
              <span *ngIf="s.evidenceLevel === 'alto'" class="meta-tag meta-tag--evidence">Evidence Level: Alto</span>
            </div>
          </li>
        </ul>
      </section>

      <aside class="disclaimer-box">
        <h3>Nota informativa</h3>
        <p>
          Le prestazioni del Biologo Nutrizionista sono detraibili al 19% nella dichiarazione dei redditi
          tra le spese sanitarie, con pagamento tracciabile. Emettiamo regolare fattura elettronica.
        </p>
        <p>
          Per patologie cliniche complesse (diabete, IRC, disfagie, oncologia) collaboriamo con il medico
          specialista in un approccio multidisciplinare.
        </p>
        <a routerLink="/contatti" class="btn btn-primary">Prenota una visita</a>
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
      .categoria-section {
        margin-bottom: 3rem;
      }
      .categoria-section h2 {
        font-size: 1.4rem;
        margin: 0 0 1.25rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .servizio-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .servizio-item__head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 1rem;
        margin-bottom: 0.5rem;
      }
      .servizio-item__head h3 {
        margin: 0;
        font-size: 1.05rem;
        line-height: 1.3;
      }
      .servizio-price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
        font-size: 1.1rem;
      }
      .servizio-desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        margin: 0 0 0.75rem;
        line-height: 1.55;
      }
      .servizio-meta {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .meta-tag {
        font-size: 0.72rem;
        padding: 0.2rem 0.55rem;
        border-radius: 9999px;
        font-weight: 600;
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
      }
      .meta-tag--online {
        background: #dcfce7;
        color: var(--color-success);
      }
      .meta-tag--evidence {
        background: #fef9c3;
        color: var(--color-warning);
      }
      .disclaimer-box {
        margin-top: 2rem;
        padding: 1.5rem 2rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        border-left: 4px solid var(--color-accent);
      }
      .disclaimer-box h3 {
        margin: 0 0 0.75rem;
        font-size: 1.1rem;
        color: var(--color-accent);
      }
      .disclaimer-box p {
        margin: 0 0 0.75rem;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        margin-top: 0.5rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #4d7c0f;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly categorie$ = this.mockData.servizi$.pipe(
    map((data) => {
      const categorieMap: Record<string, { label: string; ordine: number }> = {
        visita:        { label: 'Visite e consulenze', ordine: 1 },
        composizione:  { label: 'Analisi composizione corporea', ordine: 2 },
        sportiva:      { label: 'Nutrizione sportiva', ordine: 3 },
        clinica:       { label: 'Nutrizione clinica e specialistica', ordine: 4 },
        online:        { label: 'Consulenze online', ordine: 5 }
      };

      return Object.entries(categorieMap)
        .sort(([, a], [, b]) => a.ordine - b.ordine)
        .map(([id, meta]): CategoriaServizi => ({
          id,
          label: meta.label,
          servizi: data.servizi.filter((s) => s.categoria === id)
        }))
        .filter((cat) => cat.servizi.length > 0);
    })
  );
}
