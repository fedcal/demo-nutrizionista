import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Biologhe e biologi nutrizionisti con un approccio scientifico e umano alla nutrizione.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Studio Bilancio Nutrizionale</h2>
        <p>
          Studio Bilancio nasce nel 2019 dall'esperienza pluriennale della Dr.ssa Elena Conte, biologa
          nutrizionista specializzata in nutrizione clinica e sportiva. La missione è semplice: rendere
          la nutrizione accessibile, scientifica e pratica. Basta con le diete di moda, basta con i
          consigli non fondati sulle evidenze.
        </p>
        <p>
          Ogni piano alimentare è costruito sulla persona: la sua storia clinica, le sue preferenze,
          il suo stile di vita e i suoi obiettivi reali. Non esiste "una dieta per tutti". Esiste una
          strategia nutrizionale personalizzata, verificata con follow-up periodici e adattata nel tempo.
        </p>
        <p>
          Lo studio è situato a Roma, in Via Nomentana 120, con accesso facilitato a persone con mobilità
          ridotta. Le consulenze online sono disponibili su piattaforma certificata GDPR-compliant.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Scienza</h3>
            <p>Solo raccomandazioni supportate da letteratura peer-reviewed. Aggiornamento continuo su linee guida ISSN, ESPEN, SINU.</p>
          </li>
          <li>
            <h3>Trasparenza</h3>
            <p>Spieghiamo sempre il perché di ogni scelta nutrizionale. Il paziente capisce e condivide il proprio piano.</p>
          </li>
          <li>
            <h3>Personalizzazione</h3>
            <p>Non esistono protocolli standard. Ogni piano è costruito su misura, rispettando cultura alimentare e preferenze.</p>
          </li>
          <li>
            <h3>Sostenibilità</h3>
            <p>Piani che funzionano nel lungo termine, integrabili nella vita reale: lavoro, famiglia, viaggi.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as teamData">
        <h2>Il nostro team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of teamData.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__qualifica">{{ m.qualifica }}</p>
            <p class="team-card__albo">{{ m.iscrizioneAlbo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specializzazioni">{{ s }}</li>
            </ul>
            <div class="team-card__formazione">
              <h4>Formazione</h4>
              <ul>
                <li *ngFor="let f of m.formazione">{{ f }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
        font-size: 1.2rem;
      }
      .team-card__role {
        margin: 0 0 0.25rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__qualifica {
        margin: 0 0 0.25rem;
        font-size: 0.85rem;
        font-style: italic;
        color: var(--color-fg-muted);
      }
      .team-card__albo {
        margin: 0 0 0.75rem;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        background: var(--color-bg-subtle);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius-sm);
        display: inline-block;
      }
      .team-card__bio {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin-bottom: 1rem;
        line-height: 1.6;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0 0 1rem;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .team-card__skills li {
        font-size: 0.72rem;
        background: #dcfce7;
        color: var(--color-success);
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .team-card__formazione {
        border-top: 1px solid var(--color-border);
        padding-top: 0.75rem;
      }
      .team-card__formazione h4 {
        margin: 0 0 0.5rem;
        font-size: 0.85rem;
        color: var(--color-fg-default);
      }
      .team-card__formazione ul {
        margin: 0;
        padding-left: 1.25rem;
      }
      .team-card__formazione li {
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.25rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
}
