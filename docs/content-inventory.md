# CASE 000 content inventory

Reviewed: 2026-11-10. The portfolio separates claims from presentation in `src/data/projects.ts`.

## Sources and handling

| Source | Status | Use |
| --- | --- | --- |
| `SUPER RESUME.pdf` (3 pages) | Private local source; ignored by Git | Baseline biography, education, skills, 11 project descriptions, achievements, and leadership |
| [SparshSunilNaik GitHub](https://github.com/SparshSunilNaik) | Public, verified | Repository links and supporting project documentation |
| [THE-WEB](https://github.com/SparshSunilNaik/THE-WEB) | Public, read-only reference | Interaction architecture study and supporting portfolio evidence |
| `peter-companion`, `peter-windows`, `sage` | Private repositories, reviewed through authenticated read-only access | Status/architecture evidence only; no repository links or private content published |
| `Cobot` | Private repository, reviewed through authenticated read-only access | Product meaning, architecture, implemented workflows, validation surface, status, and contribution history; no private link or infrastructure details published |
| Owner-supplied `image.jpg` | Private local source; ignored by Git | Optimized to a metadata-free 600×750 WebP portrait for the central identity dossier |

The raw resume is not committed. It contains a phone number and direct email address. The website links to the owner-approved [public résumé on Google Drive](https://drive.google.com/file/d/15UN1z4oPUHHgRHgBR304ekByyrhwGFF0/view?usp=drive_link), while the printable recruiter briefing is labeled separately as the Portfolio Summary.

The original portrait file is not committed. Only `public/profile/sparsh-naik.webp` is published; it preserves the supplied photograph and orientation without facial alteration.

Verified public identity links:

- [LinkedIn](https://www.linkedin.com/in/sparsh-naik-032362267/)
- [GitHub](https://github.com/SparshSunilNaik)
- [Official public résumé](https://drive.google.com/file/d/15UN1z4oPUHHgRHgBR304ekByyrhwGFF0/view?usp=drive_link)

## Primary project evidence

| ID | Project | Status shown | Provenance | Public link |
| --- | --- | --- | --- | --- |
| R-01 | Vision-Language-Action Autonomous Robotics / EgoNav | Built | Resume + repository README | EgoNav, VLA-Bot-Controller |
| R-02 | Polaris RGB-only autonomous drone navigation | In development | Resume + public repository metadata / ground-station README | Polaris, Polaris-ground |
| R-03 | COBOT — Collaborative Project Assessment Bot | In development | Private repository README, architecture documentation, code tree, and commit history | Private; intentionally no link |
| I-01 | QoS-aware 5G slicing and edge orchestration | Built | Resume | None verified |
| I-02 | GPU scheduling and autoscaling | Built | Resume + repository metadata | GPU documentation |
| I-03 | Edge–cloud retraining infrastructure | Supporting evidence | Public repository metadata | MLOps documentation |
| A-01 | SplitBrain-RAG | Built | Resume + repository README | SplitBrain-RAG |
| A-02 | Sentinel financial-agent governance | Built | Resume + repository README | Sentinel |
| A-03 | Sage local coding agent in C | In development | Resume + private repository status | Intentionally omitted |
| A-04 | PETER desktop AI companion | In development | Private repository READMEs | Intentionally omitted |
| M-01 | Dynamic pricing using reinforcement learning | Research | Resume | Publication URL not verified |
| M-02 | Domain generalization with DomainBed | Research | Resume + repository | DomainBed repository |
| M-03 | Deep-learning model compression | Research | Resume | None verified |
| M-04 | CIFAR-100 custom CNN | Built | Resume | None verified |
| M-05 | Smart helmet activity classification | Prototype | Resume | None verified |
| X-01 | THE-WEB | Built | Public repository and deployment | Repository + live site |

### COBOT evidence boundary

The accessible private repository establishes that COBOT means **Collaborative Project Assessment Bot**, not collaborative robot. It is therefore presented as an AI-agent and full-stack academic assessment system, despite retaining the requested `R-03` case identifier and prominent placement beside the autonomy cluster.

Verified implementation evidence includes:

- production Next.js frontend and FastAPI backend;
- SQLAlchemy/SQLite persistence with Alembic migrations and WAL configuration;
- bounded GitHub static ingestion that does not execute student repositories;
- adaptive viva, contextual MCQ, mixed assessment, retest, faculty review, and result workflows;
- backend-enforced hierarchical and project/team authorization;
- opaque revocable HttpOnly sessions;
- local Ollama `qwen3:30b` inference with per-session locking and bounded global concurrency;
- extensive backend and frontend verification suites documented in the repository.

The commit history shows substantial contributions from Sparsh across ingestion, assessment workflows, local-model support, RBAC, concurrency, faculty interfaces, and evidence handling. It also contains contributions from collaborators, so the portfolio does not claim sole authorship. The repository is private; no repository or demo link is published. No physical robot, robot arm, robotics hardware, or public deployment is claimed.

## Professional experience evidence

Professional experience is modeled separately from personal projects and leadership.

| ID | Record | Public status | Provenance |
| --- | --- | --- | --- |
| E-002 | Elma Labs — SmartGlass Systems Engineering | Current; descriptive scope, not a claimed contractual title | Owner confirmation plus authenticated review of the private SmartGlass OS repository, architecture documentation, CI configuration, code tree, and Sparsh's commit history on 2026-11-10 |
| E-001 | Entropy Systems — Software Engineering Intern | Completed in 2026 | Owner-confirmed transition and approximate 4.5-month duration; prior résumé verifies the July 2026 start; public Polaris and Polaris Ground histories support the contribution scope |
| E-001/A | Polaris & Software Integration assignment record | Supporting evidence | Owner-confirmed professional scope plus public Polaris and Polaris Ground repositories, bounded to non-confidential engineering contributions |

Elma Labs is current, but neither an official contractual title nor an employment start month was available in the reviewed records. The portfolio therefore uses **SmartGlass Systems Engineering (descriptive scope)** and the conservative range **2026–Present**. The evidence verifies a portable C core, modular ESP-IDF/FreeRTOS architecture for ESP32-S3, lifecycle and state contracts, deterministic HUD and annotation layers, QEMU and host simulation, webcam and YOLOv8n host/browser workflows, shared rendering contracts, automated tests, firmware build checks, and CI. ESP32-S3 firmware is compile- and QEMU-verified; physical SmartGlass hardware, display, embedded camera, power behavior, production readiness, consumer deployment, and hardware performance are not claimed.

Entropy's July 2026 start is retained from the prior résumé. The owner confirms the engagement is complete, lasted approximately 4.5 months, and included Polaris and Polaris Ground. Because the exact end month could not be independently verified, the public range remains **July 2026–2026** rather than inferring a month. A typed `CONTRIBUTED_TO` relationship connects Entropy only to Polaris, while the bounded assignment record names both Polaris codebases. No customer details, confidential source, credentials, private infrastructure, hardware metrics, or business outcomes are published.

## Verified achievements and education

- COMSIA 2026 Best Paper Award for Dynamic Pricing using Reinforcement Learning; resume also states accepted for publication. No publication URL is claimed.
- Global Rank 17 in the international Women in Data Science Datathon.
- B.E. Computer Science and Engineering (Artificial Intelligence), KLE Technological University, 2023–present; CGPA 9.00/10.
- Arjuna Science PU College, 2021–2023; PCM 92%.
- Former President — Data Science Club. The presidency has ended; no exact end month is published.
- AWS Student Builder Club core team member, 2025–present.

## Excluded or qualified material

- No employer, internship, publication URL, or production deployment is inferred.
- Repository names alone are not treated as equivalent projects.
- Private repositories are not linked.
- Forked/upstream DomainBed capabilities are not claimed as original implementation work; the portfolio describes the documented benchmarking study.
- Quantitative EgoNav and 5G results identify their source context rather than presenting them as independently re-tested here.
- GitHub repositories without enough explanatory evidence are omitted from the main board.
