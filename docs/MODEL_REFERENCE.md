# Model reference

## 1. Model class

The application is a deterministic-seed, stochastic-agent visualization coupled to a weighted phenomenological ledger.

- The **agent layer** controls movement, contacts, glyphs and local visual events.
- The **response layer** calculates normalized activities on biological time.
- The **ledger layer** converts activities into weighted populations and hidden soluble outputs.
- The **render layer** samples the biological state without defining it.

All normalized activities use:

\[
\operatorname{sat}(x)=\min(1,\max(0,x)).
\]

Time \(t\) is measured in simulated days. Inputs are normalized to \([0,1]\) unless noted.

## 2. Host-age factor

The age slider uses an illustrative lifespan response function:

\[
f_{age}(x)=
\begin{cases}
0.68 + 0.32\,x/0.18, & x<0.18,\\
1, & 0.18\le x\le0.62,\\
1-0.38\,(x-0.62)/0.38, & 0.62<x\le1.
\end{cases}
\]

This is intentionally not a demographic or clinical ageing model. It represents reduced early-life competence, a young-adult plateau and later immunosenescence.

## 3. Antigen activity

Let \(D\) be exposure magnitude, \(P\) persistence, \(R\) prior immunity and \(r_{rep}\) the scenario replication multiplier.

\[
A_0 = D(1+0.6r_{rep})
\]

\[
A_{decay}(t)=A_0\exp[-t(0.13+0.16R)(1-0.55P)]
\]

A replicating scenario adds:

\[
A_{rep}(t)=A_0r_{rep}(1-e^{-1.6t})e^{-t(0.12+C(t))}
\]

with

\[
C(t)=0.12+0.22R+0.025f_{age}\max(0,t-3).
\]

The displayed antigen activity is:

\[
A(t)=\operatorname{sat}(A_{decay}+A_{rep}).
\]

The chronic scenario applies a persistence floor:

\[
A(t)\ge 0.16+0.60P.
\]

## 4. Inflammation and antigen presentation

Let \(I_0\) be innate stimulation and \(r_{inn}\) the scenario innate multiplier.

\[
I(t)=\operatorname{sat}\left(\left[0.72A(t)+0.45I_0r_{inn}\right]
 e^{-\max(0,t-5)(0.08+0.08R)} + I_{chronic}\right)
\]

where \(I_{chronic}=0.30P\) only for the chronic scenario.

Migratory/resident dendritic-cell activity is represented by:

\[
DC(t)=\operatorname{sat}\left(\frac{t-0.25}{1.5}\right)
 e^{-0.12\max(0,t-4)}D r_{inn}.
\]

## 5. T-cell priming, expansion and cytotoxic function

Priming combines an early bounded pulse and a broader later component:

\[
T_{prime}(t)=
\operatorname{sat}\left(\frac{t-0.7}{1.7}\right)
\operatorname{sat}\left(\frac{4.5-t}{2.5}\right)
+0.45\operatorname{sat}\left(\frac{t-1.2}{2.5}\right).
\]

Expansion is:

\[
T_{expand}(t)=\operatorname{sat}\left(\frac{t-1.7}{4}\right)
 e^{-0.13\max(0,t-8)}D f_{age}(0.75+0.45R).
\]

Effector activity is:

\[
E(t)=\operatorname{sat}\left(\frac{t-4}{4}\right)
 e^{-0.10\max(0,t-12)}D f_{age}
 (0.55+0.45r_{CD8}+0.30R).
\]

The chronic scenario maintains a persistent effector population floor. Exhaustion is then calculated as:

\[
X(t)=\operatorname{sat}\left(\frac{t-9}{28}\right)
\operatorname{sat}[0.68A(t)+0.42I(t)+0.34P].
\]

Functional cytotoxic activity is separated from population activity:

\[
E_{function}(t)=\operatorname{sat}[E(t)(1-0.68X(t))].
\]

## 6. Germinal-centre activity

GC onset and persistence are represented as:

\[
G_{start}(t)=\operatorname{sat}\left(\frac{t-3.5}{3}\right)
\]

\[
G_{decay}(t)=e^{-\max(0,t-(14+35P))(0.035+0.04(1-P))}
\]

\[
G(t)=\operatorname{sat}\left[G_{start}G_{decay}D r_{GC}f_{age}
 (0.9+0.2I_0)(1-0.12R)\right].
\]

The model does not interpret the onset or decay constants as universal biological values. They are visual-response defaults chosen to reproduce plausible ordering and persistence.

## 7. Plasma, antibody and memory activities

\[
P_{cell}(t)=\operatorname{sat}\left(\frac{t-3}{4}\right)
 e^{-0.045\max(0,t-18)}(0.85D+0.55R)
\]

\[
Ab(t)=\operatorname{sat}\left[0.70R+P_{cell}(t)
 (1-e^{-0.12\max(0,t-4)})\right]
\]

\[
M(t)=\operatorname{sat}\left[0.65R+0.75Df_{age}
 \operatorname{sat}\left(\frac{t-10}{15}\right)\right].
\]

The Observatory decomposes relative titre into:

\[
T_{total}=T_{pre}+T_{early}+T_{GC}+T_{persistent}.
\]

Functional binding is:

\[
B_{functional}=T_{total}(0.30+0.70F_{affinity})m_{scenario}.
\]

## 8. Affinity and clonal summary

Median affinity is a bounded composite of prior immunity, GC activity, elapsed GC time and age:

\[
F_{affinity}=\operatorname{sat}\{0.18+0.42R+G(t)
 [0.30+0.22\operatorname{sat}((t-7)/18)]f_{age}\}.
\]

The displayed distribution is a mixture of two Gaussian-like components with seed-controlled jitter. It is a visual repertoire distribution, not a fitted B-cell receptor sequence model.

## 9. Tertiary lymphoid organisation

A chronic drive is formed from persistence, antigen and inflammation:

\[
D_{TLS}=\operatorname{sat}[0.70P+0.50A(t)+0.40I(t)]r_{TLS}-0.52.
\]

TLS activity is:

\[
TLS(t)=\operatorname{sat}\left(\frac{t-7}{30}\right)
\operatorname{sat}(D_{TLS}m_{chronic})(0.88+0.12f_{age}).
\]

This is deliberately conditional. Most acute and vaccine scenarios should not produce a mature TLS.

## 10. Weighted population ledger

Each cell class uses a baseline or response-scaled weighted abundance, for example:

\[
N_{neutrophil}=5200\,I(t)\,r_{neutrophil}\,J(t)
\]

\[
N_{GC\,B}=7900\,G(t)\,J(t)
\]

\[
N_{CD8}=5900\,E(t)\,r_{CD8}\,J(t)
\]

where \(J(t)\) is bounded seed-controlled biological variability. Compartment proportions are then applied through a fixed allocation matrix. The rendered number of sprites is calculated separately.

## 11. Numerical and rendering architecture

- Fixed movement step: 1/60 s.
- Render interpolation between previous and current positions.
- Biological ledger: sampled at 151 points across the selected duration.
- Deterministic xorshift32 random generator for repeatable seeds.
- Canvas DPR capped at 2.
- Backing-pixel budget: approximately 3.2 million desktop pixels and 1.5 million narrow-screen pixels.
- Maximum visible agents: 1,800.

## 12. Reuse guidance

These equations are most useful as:

- visual-response envelopes;
- scenario prototypes;
- synthetic teaching datasets;
- UI testing fixtures;
- initial hypotheses for a later fitted model.

They should not be reused as calibrated immune kinetics without replacing the coefficients with parameters estimated from a defined species, tissue, antigen, route, assay and dataset.
