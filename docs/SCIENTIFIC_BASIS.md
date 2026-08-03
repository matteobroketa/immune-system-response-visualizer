# Scientific basis

## Scope

The visualizer is a literature-constrained, phenomenological model. It is designed to preserve broadly supported ordering, relative movement styles and plausible response timescales. It is not a mechanistic systems-immunology solver and is not fitted to an individual dataset.

The source mapping below distinguishes three levels:

- **Direct constraint:** a value or sequence is explicitly represented in the model.
- **Qualitative constraint:** the source informs direction, ordering or relative behavior.
- **Contextual boundary:** the source supports a limitation or warns against a universal value.

## Literature-to-feature map

| Model feature | Implementation | Evidence role | Selected source |
|---|---|---|---|
| Naive T-cell surveillance | Rapid, persistent random-walk-like movement in the lymph-node T-cell zone | Direct movement constraint | Miller et al., 2003, *PNAS*, DOI: [10.1073/pnas.2628040100](https://doi.org/10.1073/pnas.2628040100) |
| T cells move faster than follicular B cells | Distinct cell-type speed and persistence profiles | Relative movement constraint | Miller et al., 2002, *Science*, PubMed: [12016203](https://pubmed.ncbi.nlm.nih.gov/12016203/) |
| Early B-cell antigen acquisition | Lymph-borne antigen reaches follicular/subcapsular regions rapidly | Sequence and timing constraint | Pape et al., 2007, PubMed: [17379546](https://pubmed.ncbi.nlm.nih.gov/17379546/) |
| T-cell priming phases | Brief scanning, stable contact, release and proliferation | Qualitative state-machine constraint | Shakhar et al., 2005, PMC: [PMC1560107](https://pmc.ncbi.nlm.nih.gov/articles/PMC1560107/) |
| Priming duration | Priming unfolds over several days before activated-cell dissemination | Timing boundary | Bohineust et al., 2018, PMC: [PMC5940264](https://pmc.ncbi.nlm.nih.gov/articles/PMC5940264/) |
| T–B border choreography | Antigen-engaged B cells move toward the T-zone boundary and form cognate contacts | Spatial and interaction constraint | Okada et al., 2005, PubMed: [15857154](https://pubmed.ncbi.nlm.nih.gov/15857154/) |
| Germinal-centre zones | Dark-zone proliferation and light-zone antigen/Tfh selection | Structural constraint | Victora et al., 2010, DOI: [10.1016/j.cell.2010.10.032](https://doi.org/10.1016/j.cell.2010.10.032) |
| GC B-cell zone migration | Preferential, selective inter-zone movement rather than synchronized circulation | Movement constraint | Beltman et al., 2011, PMC: [PMC3102384](https://pmc.ncbi.nlm.nih.gov/articles/PMC3102384/) |
| Tfh help regulates division | Antigen capture and T-cell help regulate proliferation and hypermutation | Selection constraint | Gitlin et al., 2014, PubMed: [24805232](https://pubmed.ncbi.nlm.nih.gov/24805232/) |
| Affinity maturation | Mutation, competition, selection and clonal expansion progressively reshape the repertoire | Qualitative output constraint | Victora & Nussenzweig, 2012, PubMed: [22224772](https://pubmed.ncbi.nlm.nih.gov/22224772/) |
| Plasmablast/antibody ordering | Early plasmablast wave precedes maximal serum antibody and persistent GC output | Timing constraint | Turner et al., 2021, DOI: [10.1038/s41586-021-03738-2](https://doi.org/10.1038/s41586-021-03738-2) |
| Persistent human GC response | GC activity is not forced to end after a universal short interval | Contextual boundary | Turner et al., 2021, DOI above; Kim et al., 2022, DOI: [10.1038/s41586-022-04527-1](https://doi.org/10.1038/s41586-022-04527-1) |
| Chronic CD8 exhaustion | Persistent antigen reduces cytotoxic function without immediately deleting the represented population | Qualitative chronic-state constraint | Wherry, 2011, PubMed: [21739672](https://pubmed.ncbi.nlm.nih.gov/21739672/); McLane et al., 2019, PubMed: [30676822](https://pubmed.ncbi.nlm.nih.gov/30676822/) |
| Immune ageing | Strong young-adult response with reduced early-life and older-adult competence | Contextual, illustrative aggregate | Sage & Sharpe, 2014, PubMed: [24217812](https://pubmed.ncbi.nlm.nih.gov/24217812/); Martinez et al., 2021, PubMed: [33811941](https://pubmed.ncbi.nlm.nih.gov/33811941/) |
| TLS formation | Ectopic organization requires persistent inflammatory/antigenic drive and remains conditional | Structural and contextual constraint | Zhao et al., 2024, PMC: [PMC11358547](https://pmc.ncbi.nlm.nih.gov/articles/PMC11358547/) |

## Model-specific scientific choices

### Relative rather than absolute concentrations

Antigen, cytokine-like programs, antibody titre, affinity and functional binding are normalized model activities. They do not use units such as IU/mL, BAU/mL, pg/mL or molarity because no single conversion is valid across the represented scenarios.

### Representative agents

Visible glyphs are weighted representatives. The ledger carries biological abundance independently of the sprite count. This prevents mobile performance settings from changing reported biology.

### Species and tissue context

Many movement constraints originate from murine lymph-node intravital microscopy. Human evidence is used where longitudinal tissue sampling is available, particularly for vaccine-induced plasmablast, antibody and germinal-centre kinetics.

### No universal TLS clock

TLS maturation varies greatly by organ, disease and inflammatory context. The application therefore uses a scenario-dependent organization timescale rather than presenting one literature value as universal.

### No clinical interpretation

The simulation should not be used to estimate protection, diagnose immune dysfunction, compare real patients or guide treatment. It is intended for visual exploration, education, communication and software prototyping.

## Reusable parameter table

A machine-readable summary is available at [`parameter-source-matrix.csv`](parameter-source-matrix.csv).
