# Data, URL state and browser API

## Weighted-ledger CSV

The **Export CSV** button downloads 151 time points spanning the configured response duration. Values are generated from the biological ledger and are independent of visual density.

The complete dictionary is available in [`model-output-schema.csv`](model-output-schema.csv).

Key output families:

- response activities: antigen, inflammation, dendritic-cell activity, T-cell priming and expansion;
- chronic state: CD8 population activity, CD8 function and exhaustion;
- adaptive response: germinal-centre, plasma, antibody, memory and TLS activities;
- humoral decomposition: pre-existing, early, GC-derived and persistent titre;
- repertoire summaries: median affinity, functional binding, diversity, dominant-clone share and positive selection;
- grouped signals: antiviral, inflammatory, priming, follicular, resolution and exhaustion;
- weighted cell populations for every represented lineage.

All activities are relative model units unless a field is explicitly a weighted population.

## Shareable URL

The application stores the complete current state in query parameters. Example:

```text
?scenario=viral&dose=70&persistence=30&innate=65&prior=10&age=42
&randomness=45&duration=42&bioSpeed=42&density=58&seed=27183
&trails=1&fields=1&labels=1&hoverLabels=1&day=8.00
&focus=node&tab=composition&compartment=all&intro=0&autoplay=0
```

Supported state parameters:

| Parameter | Meaning |
|---|---|
| `scenario` | `vaccine`, `viral`, `bacterial`, `recall` or `chronic` |
| `dose` | Exposure slider value, 10–100 |
| `persistence` | Antigen persistence, 0–100 |
| `innate` | Innate stimulation, 10–100 |
| `prior` | Prior immunity, 0–100 |
| `age` | Illustrative immune-age position, 0–100 |
| `randomness` | Biological variability, 0–100 |
| `duration` | Response duration, 21–90 days |
| `bioSpeed` | Biological-time playback speed slider |
| `density` | Visual density only |
| `seed` | Reproducibility seed, 1–99999 |
| `day` | Current biological day |
| `focus` | `all`, `periphery`, `node`, `gc` or `tls` |
| `tab` | `composition`, `humoral` or `signals` |
| `compartment` | `all`, `periphery`, `node`, `gc` or `circulation` |
| `intro` | `0` suppresses first-run guide |
| `autoplay` | `1` starts playback; `0` remains paused |

## Browser API

The application exposes:

```js
const api = window.immuneChoreography;
```

### `snapshot()`

Returns the current state:

```js
const state = api.snapshot();
console.log(state.day);
console.log(state.response.antigen);
console.log(state.ledger.humoral.titre);
console.log(state.config.scenario);
```

Returned top-level keys:

- `day`
- `agents`
- `fps`
- `response`
- `ledger`
- `config`

### `setDay(day)`

Moves the response to a biological day and reconstructs the visual state deterministically.

```js
api.setDay(12);
```

### Playback

```js
api.play();
api.pause();
```

### Sharing and export

```js
const url = api.shareURL();
api.exportCSV();
```

`shareURL()` returns the encoded URL. It does not upload the state anywhere.

## Programmatic synthetic-data use

A simple browser-console workflow:

```js
const rows = [];
for (let day = 0; day <= 42; day += 1) {
  window.immuneChoreography.setDay(day);
  const s = window.immuneChoreography.snapshot();
  rows.push({
    day,
    antigen: s.response.antigen,
    gc: s.response.gc,
    titre: s.ledger.humoral.titre,
    affinity: s.ledger.humoral.affinity
  });
}
console.table(rows);
```

This is suitable for interface prototyping or teaching examples, not as a substitute for experimental data.
