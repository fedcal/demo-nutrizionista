# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Nutrizionista'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `nutrizionista` con nome cliente (`acme-nutrizione`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account

---

## Possibili Sviluppi Customizzabili per Nutrizionista/Dietologo

### 1. AI Macro Balance Realtime + LLaVA Food Recognition
**Scope**: ~24h | **Tier**: Avanzato | **Valore**: Conversion adherence +35%, competitive advantage

Ollama + LLaVA: foto piatto → instant macro breakdown (proteine, carboidrati, grassi, fibre). Target visualization interattiva. Italian CFood DB + INRAN. Dietetico empowerment.

### 2. Wearable Integration + Adherence ML Prediction
**Scope**: ~28h | **Tier**: Avanzato | **Valore**: Proactive retention, churn -30%

Apple Health/Fitbit/Oura OAuth2. Spring LightGBM: weight trajectory + passi + deficit calorico → predict dropout week 3. Nutrizionista SMS intervention proattiva.

### 3. Meal Plan Optimization with OR-Tools
**Scope**: ~26h | **Tier**: Avanzato | **Valore**: Personalization at scale, dietista tempo -40%

Google OR-Tools constraint solver: target macro/calorie/sodio + allergie/preferenze paziente + ricette DB italiano → auto-generate meal plan 7-14 giorni. Weekly re-optimize.

### 4. Body Composition Tracking + LLaVA Posture Feedback
**Scope**: ~19h | **Tier**: Avanzato | **Valore**: Holistic health, engagement +25%

Selfie weekly + INBODY BLE (opzionale). LLaVA 7B feedback strutturale (postura, tono muscolare, progresso visuale). Compound score weekly. Psychological boost.

### 5. Meal Prep Video Library 50+ HD
**Scope**: ~30h | **Tier**: Premium | **Valore**: Conversion +20%, educational differentiation

50+ video HD (cucina sana, plating, rapporti macro). TensorFlow.js PoseNet realtime: tecnica coltello, sicurezza postura. Modalità interattiva tutorial.

### 6. AI Coaching Chat 24h + Escalation
**Scope**: ~18h | **Tier**: Avanzato | **Valore**: Support continuity, engagement 24h

Ollama chat trained Italian nutrition knowledge. Classifier: routine (AI answer) vs clinical (escalate nutrizionista). Zero medical claims, sempre "education only".

### 7. Compliance Art.9 + Consent Wizard GDPR
**Scope**: ~12h | **Tier**: Avanzato | **Valore**: GDPR audit-ready, FNOB integration

Consent wizard specializzato dati medici (Art.9). Storage foto alimenti, wearable integration, AI processing. FNOB albo auto-verification. Revocation audit trail.

### 8. Invoice IVA Smart Logic + FatturaPA
**Scope**: ~14h | **Tier**: Avanzato | **Valore**: Tax compliance, patient clarity

Auto-detect clinica vs privata. IVA 10% (dietetica clinica) vs 22% (consulenza privata). FatturaPA XML + SdI. Compliance Agenzia Entrate.

### 9. Group Nutrition Workshop + Certificate
**Scope**: ~22h | **Tier**: Premium | **Valore**: Community, revenue new stream €800-2k/month

Monthly live webinar moderated (macro myths, seasonal eating, allergen management). Recorded library. Certificate completion. Upsell individual plan. CPD credits.

### 10. Corporate Wellness B2B Integration
**Scope**: ~25h | **Tier**: Premium | **Valore**: B2B revenue €3k-8k/company/year

HR system integration (Personio, BambooHR): employee baseline assessment → personalized micro-learning + group challenge (step, acqua). Employer dashboard metrics ROI.

**Total customizzazioni**: 10 idee, €5.5k-9.5k, ROI 3-8 mesi per dietista PMI 2-8 professionisti.
