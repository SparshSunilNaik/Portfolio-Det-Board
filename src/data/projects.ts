import type { Category, Project, Relationship } from '../types'

const gh = (repo: string) => ({ label: 'Repository', url: `https://github.com/SparshSunilNaik/${repo}`, kind: 'repository' as const })

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All evidence' }, { id: 'experience', label: 'Professional experience' }, { id: 'robotics', label: 'Autonomy' }, { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'agents', label: 'Agents & RAG' }, { id: 'research', label: 'ML research' }, { id: 'achievement', label: 'Achievements' }, { id: 'education', label: 'Foundations' },
]

export const projects: Project[] = [
  {
    id:'entropy-systems', caseNo:'E-001', title:'Entropy Systems — Software Engineering Internship', shortTitle:'Entropy Systems', category:'experience', status:'Employment', year:'JUL 2026 — PRESENT*', kind:'dossier', featured:true, recordType:'experience', employer:'Entropy Systems', jobTitle:'Software Engineering Intern', employmentDates:'July 2026 – Present (start month owner-provided; active affiliation publicly listed)',
    position:{x:1045,y:570,width:390,height:315,rotation:-1.4}, summary:'Software engineering internship contributing to computer-vision modules, software services, integration, testing, and engineering documentation.',
    problem:'Translate engineering requirements into working, testable software components inside an active robotics-engineering environment.',
    engineered:['Built and evaluated computer-vision modules and software services for AI-driven pipelines','Participated in software-component integration and automated test validation','Supported debugging, troubleshooting, and technical documentation'],
    approach:['Bridge algorithms and application software through testable implementations','Validate components during integration rather than treating models as isolated demos'],
    challenges:['Integrating AI and software components across an evolving engineering system','Diagnosing implementation and test failures without overstating confidential work'],
    results:['Public portfolio confirms computer-vision, software-service, integration, testing, and documentation contributions','No performance metrics or customer outcomes are claimed'],
    technologies:['Python','Computer Vision','AI Systems','Software Engineering','Test Automation'], links:[{label:'Company profile',url:'https://www.linkedin.com/company/entropy-systems-org/',kind:'profile'}], source:'Owner-provided prior résumé date + public personal portfolio + Entropy Systems LinkedIn employee listing'
  },
  {
    id:'entropy-assignment', caseNo:'E-001/A', title:'Engineering Assignment Record — Vision & Software Integration', shortTitle:'Assignment Record', category:'experience', status:'Supporting evidence', year:'2026', kind:'note', recordType:'assignment', employer:'Entropy Systems', jobTitle:'Technical Contribution Record', employmentDates:'During Software Engineering Internship',
    position:{x:1110,y:920,width:330,height:235,rotation:2.2}, summary:'A bounded record of verified contribution areas: computer vision, backend software, integration, test validation, debugging, and documentation.',
    problem:'Capture professional contribution areas without exposing private source, customer information, or unverified ownership claims.',
    engineered:['Computer-vision pipeline modules','Backend and application functionality','Integration, automated tests, debugging, and documentation'],
    approach:['Publish contribution boundaries rather than proprietary implementation details'], challenges:['Separating public evidence from confidential engineering context'],
    results:['Contribution scope is documented; specific client systems and metrics remain intentionally undisclosed'], technologies:['Python','Computer Vision','Backend Development','Testing','Documentation'], links:[], source:'Public personal portfolio; scoped to non-confidential contribution areas'
  },
  {
    id:'cobot', caseNo:'R-03', title:'COBOT — Collaborative Project Assessment Bot', shortTitle:'COBOT', category:'agents', status:'In development', year:'2026', kind:'blueprint', featured:true,
    position:{x:1010,y:1190,width:440,height:345,rotation:-1.1}, summary:'A faculty-controlled academic assessment platform that grounds adaptive vivas and evaluations in bounded project evidence.',
    projectRole:'Full-stack and AI systems contributor; repository history also records collaborators, so sole authorship is not claimed.',
    problem:'Assess individual understanding and contribution within team projects while preserving faculty authority, project boundaries, and evidence traceability.',
    engineered:['Next.js faculty/student workflows backed by FastAPI services','Bounded static GitHub ingestion that never executes student repositories','Adaptive viva and mixed-assessment workflows using local Ollama inference','Hierarchical role and project authorization, faculty approvals, retests, and published results'],
    approach:['Separate deterministic assessment control from bounded LLM question generation','Use opaque revocable HttpOnly sessions and backend-enforced project/team scope','Persist academic workflows with SQLAlchemy, SQLite WAL, and Alembic migrations'],
    challenges:['Grounding questions in approved project and curriculum evidence','Coordinating concurrent local-model requests without duplicate questions','Maintaining isolation across students, teams, projects, departments, and colleges'],
    results:['Private repository documents production Next.js and FastAPI startup workflows','Repository includes extensive backend and frontend verification suites','Current workstation configuration documents bounded concurrent local inference; no public deployment is claimed'],
    technologies:['Python','FastAPI','Next.js','TypeScript','SQLAlchemy','Alembic','SQLite','Ollama','Qwen3','RBAC'], links:[], source:'Private Cobot repository README, architecture documentation, code tree, and commit history reviewed 2026-10-26'
  },
  {
    id:'egonav', caseNo:'R-01', title:'Vision-Language-Action Autonomous Robotics System', shortTitle:'EgoNav VLA', category:'robotics', status:'Built', year:'2026', kind:'polaroid', featured:true,
    position:{x:420,y:390,width:390,height:320,rotation:-2.2}, summary:'A hybrid perception-to-action platform for zero-shot indoor object-goal navigation on consumer hardware.',
    problem:'Navigate toward natural-language object goals without task-specific training or a pre-built map while keeping slow VLM inference from compromising safety.',
    engineered:['Three-camera panoramic perception and stateful ego-context memory','Asynchronous Qwen2.5-VL deliberation with deterministic momentum control','FastAPI robot actuation and an independent YOLO obstacle veto'],
    approach:['Separate semantic reasoning from reactive safety','Validate every proposed action before timed motor pulses','Close the loop with post-action visual observations'],
    challenges:['4–7 second VLM inference latency','RGB-only distance cues and dynamic indoor obstacles'],
    results:['Repository documents a 12.5 Hz control loop and 45 ms mean action latency','Manual override, person detection, bounded recovery, and stale-frame handling'],
    technologies:['Python','FastAPI','OpenCV','Qwen2.5-VL','YOLOv8n','Raspberry Pi 5'], links:[gh('EgoNav'),gh('VLA-Bot-Controller')], source:'Resume + public EgoNav repositories'
  },
  {
    id:'polaris', caseNo:'R-02', title:'Polaris: RGB-Only Autonomous Drone Navigation', shortTitle:'Polaris', category:'robotics', status:'In development', year:'2026', kind:'telemetry', featured:true,
    position:{x:310,y:910,width:410,height:300,rotation:1.4}, summary:'GPS-denied drone navigation using monocular vision, offboard control, confidence-aware recovery, and no dedicated depth sensor.',
    problem:'Build a navigation stack for visually challenging, GPS-denied environments using only RGB perception.',
    engineered:['PX4 SITL integration with Gazebo Harmonic and MAVSDK','Telemetry and ego-state collection across pose, velocity, orientation, and battery','Local-goal navigation with reactive avoidance and deterministic yaw-scan recovery'],
    approach:['Desired-motion generation feeds a safety-supervised offboard controller','Active viewpoint selection is used when confidence or progress drops'],
    challenges:['Monocular depth uncertainty','Safe recovery during weak perception'], results:['Connection, arming, takeoff, telemetry, landing, and disarming workflows validated in simulation'],
    technologies:['Python','PX4','MAVSDK','Gazebo Harmonic','Monocular Depth','Offboard Control'], links:[gh('Polaris'),gh('Polaris-ground')], source:'Resume + public Polaris repositories'
  },
  {
    id:'network-slicing', caseNo:'I-01', title:'QoS-Aware 5G Network Slicing & Edge Orchestration', shortTitle:'5G Edge Orchestrator', category:'infrastructure', status:'Built', year:'2026', kind:'blueprint', featured:true,
    position:{x:2720,y:350,width:430,height:325,rotation:1.1}, summary:'A 5G Standalone experimentation platform for eMBB, URLLC, and mMTC traffic classes across a Kubernetes MEC cluster.',
    problem:'Allocate shared edge resources while preserving differentiated QoS for competing traffic classes.',
    engineered:['Open5GS and UERANSIM 5G SA slicing environment','Multi-node Kubernetes MEC with containerized network functions','Predictive orchestration, telemetry, and workload-level QoS policies'],
    approach:['Instrument traffic and resource pressure','Adapt scheduling while retaining repeatable Linux/container deployment'], challenges:['Cross-layer observability','Tail-latency and packet-loss control'],
    results:['Resume reports over 40% lower tail latency and 70% fewer packet-loss events'], technologies:['Linux','Open5GS','UERANSIM','Kubernetes','Docker','Python','Prometheus'], links:[], source:'Resume'
  },
  {
    id:'gpu-platform', caseNo:'I-02', title:'GPU Resource Scheduling & Autoscaling Platform', shortTitle:'GPU Scheduler', category:'infrastructure', status:'Built', year:'2026', kind:'terminal',
    position:{x:3260,y:780,width:400,height:300,rotation:-1.5}, summary:'Kubernetes scheduling and metrics-driven autoscaling for containerized ML training and inference workloads.',
    problem:'Make scarce GPU capacity visible, schedulable, observable, and repeatably deployable.', engineered:['Linux GPU workers and NVIDIA container runtime','GPU resource advertisement and workload validation','Monitoring services and metrics-based autoscaling'],
    approach:['Treat accelerator setup as reproducible infrastructure','Capture troubleshooting procedures alongside deployment'], challenges:['Runtime and driver alignment','Resource utilization versus workload reliability'], results:['Validated GPU-enabled workloads inside Kubernetes'],
    technologies:['Kubernetes','Docker','Linux','NVIDIA Container Runtime','Autoscaling'], links:[gh('GPU-Slicing-Platform-Documentation')], source:'Resume + public documentation repository'
  },
  {
    id:'edge-retraining', caseNo:'I-03', title:'Edge–Cloud Retraining Infrastructure', shortTitle:'MLOps Pipeline', category:'infrastructure', status:'Supporting evidence', year:'2026', kind:'blueprint',
    position:{x:2780,y:1190,width:390,height:270,rotation:2}, summary:'Public engineering documentation for an edge–cloud GPU retraining pipeline and its operational architecture.', problem:'Connect edge data and cloud/GPU retraining as an inspectable, repeatable workflow.',
    engineered:['Architecture and deployment documentation','Operational boundaries for GPU-backed retraining'], approach:['Document the system as infrastructure, not an unverified product claim'], challenges:['Cross-environment reproducibility'], results:['Public documentation repository available'],
    technologies:['Python','MLOps','Edge Computing','GPU Infrastructure'], links:[gh('MLOps-Pipeline-Documentation')], source:'Public repository metadata'
  },
  {
    id:'splitbrain', caseNo:'A-01', title:'SplitBrain-RAG: Cross-Device Retrieval System', shortTitle:'SplitBrain-RAG', category:'agents', status:'Built', year:'2026', kind:'terminal', featured:true,
    position:{x:770,y:1540,width:420,height:310,rotation:1.3}, summary:'Distributed RAG: document processing and retrieval on Windows, local Qwen inference on macOS over HTTP.', problem:'Keep document processing local to one machine while using dedicated local inference hardware on another.',
    engineered:['Haystack ingestion, cleaning, splitting, embedding, and retrieval','FastAPI query/ingestion endpoints and Streamlit interface','Remote Ollama generator with InMemory or Qdrant document stores'], approach:['Separate retrieval and generation by a narrow HTTP boundary','Expose health checks and repeatable smoke/integration tests'],
    challenges:['Cross-OS networking and configuration','Data locality with independently operated components'], results:['Public repository includes unit, integration, and end-to-end smoke-test structure'],
    technologies:['Python','Haystack','FastAPI','Streamlit','Ollama','Qwen','Qdrant'], links:[gh('SplitBrain-RAG')], source:'Resume + public repository'
  },
  {
    id:'sentinel', caseNo:'A-02', title:'Sentinel: Financial AI Agent Governance', shortTitle:'Sentinel', category:'agents', status:'Built', year:'2026', kind:'report', featured:true,
    position:{x:1380,y:1700,width:430,height:330,rotation:-1.2}, summary:'A control plane that evaluates autonomous financial-agent actions before execution.', problem:'Prevent autonomous agents from bypassing identity, permission, budget, risk, and policy controls.',
    engineered:['FastAPI decision pipeline and configurable policy engine','Next.js operator dashboard with live request monitoring','JWT authentication, SQLAlchemy persistence, approvals, and immutable audit records'], approach:['Identity → permission → budget → risk → decision','Expose policy outcomes and risk factors for each decision'],
    challenges:['Human escalation without losing traceability','Dynamic spend limits and emergency intervention'], results:['Implements approval workflows, behaviour monitoring, and a kill switch'],
    technologies:['FastAPI','Next.js','React','TypeScript','SQLAlchemy','SQLite','JWT','Pydantic'], links:[gh('Sentinel')], source:'Resume + public repository'
  },
  {
    id:'sage', caseNo:'A-03', title:'Sage: Local Coding Agent in C', shortTitle:'Sage', category:'agents', status:'In development', year:'2026', kind:'terminal',
    position:{x:350,y:2040,width:370,height:285,rotation:-2}, summary:'A lightweight terminal coding agent with a portable C architecture, beginning on macOS.', problem:'Create a practical local coding loop without hiding process, file, or shell authority.',
    engineered:['Architecture roadmap for context, tools, model interaction, and responses','Safety boundaries for shell execution and repository-aware file operations'], approach:['Incremental systems implementation with explicit destructive-action confirmation'], challenges:['Portable process management','Clear error propagation and bounded authority'], results:['Repository and architecture roadmap created; implementation remains in development'],
    technologies:['C','CMake','macOS','CLI Design','Process Management'], links:[], source:'Resume; repository is private'
  },
  {
    id:'peter', caseNo:'A-04', title:'PETER: Permissioned Desktop AI Companion', shortTitle:'PETER', category:'agents', status:'In development', year:'2026', kind:'polaroid',
    position:{x:1270,y:2200,width:400,height:300,rotation:1.8}, summary:'A private Windows desktop companion built around deterministic routing, local voice, explicit memory, and one-use approvals.', problem:'Combine useful local assistance with inspectable security boundaries rather than unconstrained agent authority.',
    engineered:['PySide6 companion UI and offline review-before-routing voice','Typed capability registry with deterministic intent routing','Bounded web/document operations and one-use approval binding'], approach:['Keep model output outside authorization paths','Fail closed on changed targets, stale approvals, and protected paths'], challenges:['Desktop safety and race resistance','Local-model latency and privacy'], results:['Private repository documents deterministic tests and staged validation; project remains private'],
    technologies:['Python','PySide6','SQLite','Ollama','whisper.cpp','Pydantic'], links:[], source:'Private repository reviewed locally; no public link'
  },
  {
    id:'dynamic-pricing', caseNo:'M-01', title:'Dynamic Pricing Using Reinforcement Learning', shortTitle:'RL Dynamic Pricing', category:'research', status:'Research', year:'2025–2026', kind:'clipping', featured:true,
    position:{x:2130,y:1540,width:430,height:330,rotation:-1.7}, summary:'Single- and multi-agent pricing research comparing PPO, SAC, DDPG, and MASAC under changing demand.', problem:'Adapt prices under interacting agents, non-stationary demand, and competing objectives.',
    engineered:['Experimentation across PPO, SAC, and DDPG','Multi-agent SAC formulation for coordinated pricing','Evaluation across revenue, stability, demand response, and convergence'], approach:['Compare policies under shared evaluation criteria'], challenges:['Multi-agent non-stationarity','Balancing revenue with stable pricing'],
    results:['Best Paper Award at COMSIA 2026','Accepted for publication; publication link not yet verified'], technologies:['Python','PPO','SAC','DDPG','Multi-Agent RL','Data Analysis'], links:[], source:'Resume'
  },
  {
    id:'domainbed', caseNo:'M-02', title:'Domain Generalization Benchmarking with DomainBed', shortTitle:'DomainBed Study', category:'research', status:'Research', year:'2025', kind:'report',
    position:{x:2200,y:2110,width:380,height:280,rotation:1.1}, summary:'Reproducible benchmarking of model behavior under source-to-target distribution shift.', problem:'Measure how learning methods generalize to unseen domains rather than only held-out in-distribution samples.', engineered:['Baseline algorithm and dataset configuration','Cross-domain training and evaluation workflows','Structured analysis of generalization gaps'], approach:['Use DomainBed for comparable experimental protocols'], challenges:['Model selection under distribution shift'], results:['Experimental findings documented in a technical report'],
    technologies:['Python','PyTorch','DomainBed','Experiment Tracking'], links:[gh('domain-bed')], source:'Resume + repository (upstream DomainBed fork/codebase)'
  },
  {
    id:'compression', caseNo:'M-03', title:'Deep Learning Model Compression Study', shortTitle:'Model Compression', category:'research', status:'Research', year:'2025', kind:'report',
    position:{x:2690,y:1900,width:370,height:280,rotation:-1}, summary:'A comparative SVHN study of pruning, post-training quantization, QAT, and knowledge distillation.', problem:'Reduce deployment cost while making the accuracy and efficiency trade-offs measurable.', engineered:['Repeatable compression experiments','Accuracy, size, inference-efficiency, and trade-off evaluation'], approach:['Compare four compression families against a common baseline'], challenges:['Preserving predictive quality under compression'], results:['Comparative study completed on SVHN'],
    technologies:['TensorFlow','Python','SVHN','Pruning','Quantization','Distillation'], links:[], source:'Resume'
  },
  {
    id:'cifar-cnn', caseNo:'M-04', title:'Custom CNN Architecture for CIFAR-100', shortTitle:'CIFAR-100 CNN', category:'research', status:'Built', year:'2025', kind:'blueprint',
    position:{x:3170,y:1670,width:380,height:275,rotation:1.5}, summary:'An efficient CNN combining depthwise-separable residual blocks with Squeeze-and-Excitation attention.', problem:'Balance representation quality and computational cost for fine-grained 100-class recognition.', engineered:['Custom residual architecture','Channel-wise feature recalibration','Training and architecture-level evaluation'], approach:['Pair efficient convolutions with residual learning and SE attention'], challenges:['Fine-grained class separation within a compact network'], results:['Training and evaluation workflow completed'],
    technologies:['Python','TensorFlow','CNN','Depthwise Convolution','Squeeze-and-Excitation'], links:[], source:'Resume'
  },
  {
    id:'smart-helmet', caseNo:'M-05', title:'Smart Helmet with Embedded Activity Classification', shortTitle:'Smart Helmet', category:'research', status:'Prototype', year:'2024–2025', kind:'telemetry',
    position:{x:3180,y:2240,width:390,height:270,rotation:-1.6}, summary:'ESP32 and IMU prototype for lightweight activity and motion-state classification.', problem:'Turn inertial sensor readings into useful embedded motion-state predictions.', engineered:['Sensing, preprocessing, classification, and device logic','Compact 16–8–4 multilayer perceptron'], approach:['Use sensor-derived features suitable for constrained inference'], challenges:['Noisy motion signals and embedded limits'], results:['Integrated IoT prototype completed'],
    technologies:['ESP32','IMU','Python','Neural Networks','IoT'], links:[], source:'Resume'
  },
  {
    id:'the-web', caseNo:'X-01', title:'THE-WEB: Interactive Investigation Board', shortTitle:'THE-WEB', category:'agents', status:'Built', year:'2026', kind:'polaroid',
    position:{x:1770,y:2600,width:390,height:275,rotation:-1}, summary:'A React/Vite spatial evidence-wall experiment exploring graph-based storytelling and direct canvas interaction.', problem:'Make a large connected narrative explorable without conventional page structure.', engineered:['Pannable, zoomable board and SVG graph layer','Typed evidence relationships and hash-addressable focus','GitHub Pages deployment workflow'], approach:['Use a data-driven graph over a fixed spatial coordinate system'], challenges:['Balancing dense visual composition with navigation'], results:['Live public deployment on GitHub Pages'],
    technologies:['React','TypeScript','Vite','SVG','Vitest'], links:[gh('THE-WEB'),{label:'Live site',url:'https://sparshsunilnaik.github.io/THE-WEB/',kind:'demo'}], source:'Public repository and deployment'
  },
]

export const relationships: Relationship[] = [
  {id:'entropy-assignment-record',source:'entropy-assignment',target:'entropy-systems',type:'engineered-at',label:'ENGINEERED_AT',note:'The assignment record documents contribution areas performed during the Entropy Systems internship.'},
  {id:'cobot-splitbrain-local-inference',source:'cobot',target:'splitbrain',type:'shares-method',label:'local inference boundary',note:'Both systems place local Ollama inference behind an explicit application-service boundary; their products and data flows remain distinct.'},
  {id:'e-p',source:'egonav',target:'polaris',type:'informs',label:'confidence-aware autonomy',note:'Both separate deliberative perception from bounded safety and recovery control.'},
  {id:'p-g',source:'polaris',target:'gpu-platform',type:'shares-method',label:'simulation → compute',note:'Autonomy validation and accelerated workloads both depend on reproducible infrastructure.'},
  {id:'g-n',source:'gpu-platform',target:'network-slicing',type:'extends',label:'Kubernetes orchestration',note:'Shared cluster scheduling, telemetry, and adaptive resource-allocation methods.'},
  {id:'g-m',source:'gpu-platform',target:'edge-retraining',type:'powers',label:'GPU capacity',note:'GPU scheduling provides the compute substrate for retraining workflows.'},
  {id:'s-p',source:'splitbrain',target:'peter',type:'informs',label:'local inference boundary',note:'Both place local model inference behind explicit cross-process or cross-device boundaries.'},
  {id:'s-s',source:'sage',target:'sentinel',type:'shares-method',label:'bounded agent authority',note:'Tool execution and autonomous actions are constrained by validation and explicit policy.'},
  {id:'p-s',source:'peter',target:'sage',type:'extends',label:'safe local tooling',note:'PETER’s permission model demonstrates the safety questions Sage is designed to address.'},
  {id:'d-c',source:'domainbed',target:'compression',type:'shares-method',label:'controlled evaluation',note:'Both studies emphasize reproducible baselines and trade-off analysis.'},
  {id:'c-c',source:'compression',target:'cifar-cnn',type:'informs',label:'efficient inference',note:'Compression findings inform choices in efficient architecture design.'},
  {id:'h-c',source:'smart-helmet',target:'compression',type:'informs',label:'edge constraints',note:'Embedded deployment constraints motivate compact models and compression.'},
  {id:'r-s',source:'dynamic-pricing',target:'sentinel',type:'informs',label:'financial AI → governance',note:'Autonomous financial decision systems create the governance need Sentinel addresses.'},
  {id:'w-t',source:'the-web',target:'sentinel',type:'shares-method',label:'typed React systems',note:'Both use TypeScript interfaces to keep complex UI state and entities inspectable.'},
]

export const achievements = [
  { value:'BEST PAPER', label:'COMSIA 2026 · Dynamic Pricing using RL' },
  { value:'#17 GLOBAL', label:'Women in Data Science Datathon' },
  { value:'9.00 / 10', label:'B.E. CSE (Artificial Intelligence) CGPA' },
  { value:'FORMER PRESIDENT', label:'Data Science Club' },
]
