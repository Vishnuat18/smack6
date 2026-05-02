/**
 * Centralized Subject Materials Data
 * Used by home.html for search and resources.html for filtered views.
 */

export const subjectMaterials = {
    'oose': {
        fullName: 'Object Oriented Software Engineering',
        shortName: 'OOSE',
        courseCode: 'CCS356',
        icon: 'fas fa-code-branch',
        syllabus: [
            {
                unit: 'UNIT I',
                title: 'SOFTWARE PROCESS AND AGILE DEVELOPMENT',
                topics: 'Introduction to Software Engineering, Software Process, Perspective and Specialized Process Models –Introduction to Agility-Agile process-Extreme programming-XP Process-Case Study.'
            },
            {
                unit: 'UNIT II',
                title: 'REQUIREMENTS ANALYSIS AND SPECIFICATION',
                topics: 'Requirement analysis and specification – Requirements gathering and analysis – Software Requirement Specification – Formal system specification – Finite State Machines – Petrinets –Object modelling using UML – Use case Model – Class diagrams – Interaction diagrams – Activity diagrams – State chart diagrams – Functional modelling – Data Flow Diagram- CASE TOOLS.'
            },
            {
                unit: 'UNIT III',
                title: 'SOFTWARE DESIGN',
                topics: 'Software design – Design process – Design concepts – Coupling – Cohesion – Functional independence – Design patterns – Model-view-controller – Publish-subscribe – Adapter – Command – Strategy – Observer – Proxy – Facade – Architectural styles – Layered - Client Server - Tiered - Pipe and filter- User interface design-Case Study.'
            },
            {
                unit: 'UNIT IV',
                title: 'SOFTWARE TESTING AND MAINTENANCE',
                topics: 'Testing – Unit testing – Black box testing– White box testing – Integration and System testing– Regression testing – Debugging - Program analysis – Symbolic execution – Model Checking- Case Study'
            },
            {
                unit: 'UNIT V',
                title: 'PROJECT MANAGEMENT',
                topics: 'Software Project Management- Software Configuration Management - Project Scheduling- DevOps: Motivation-Cloud as a platform-Operations- Deployment Pipeline:Overall Architecture Building and Testing-Deployment- Tools- Case Study'
            }
        ],
        materials: [
            { name: 'Unit 1: Software Process & Agile', file: 'oose/notes/oose_u1.pdf' },
            { name: 'Unit 2: Requirements Analysis', file: 'oose/notes/oose_u2.pdf' },
            { name: 'Unit 3: Software Design', file: 'oose/notes/oose_u3.pdf' },
            { name: 'Unit 4: Testing & Maintenance', file: 'oose/notes/oose_u4.pdf' },
            { name: 'Unit 5: Project Management', file: 'oose/notes/oose_u5.pdf' },
            { name: '2-Mark Question Bank', file: 'oose/2m/oose_2m.pdf' }
        ],
        previousYearQuestions: [
            { year: 'Apr/May 2024', file: 'oose/qn/CCS356-Object-Oriented-Software-Engineering-Apr-May-2024-Question-Paper-Download.pdf' }
        ],
        importantQuestions: [
            { 
                unit: '1', 
                firstHalf: [
                    'Software Process Models (Waterfall, RAD, Spiral) (or) Perspective Models'
                ],
                secondHalf: [
                    'Agile Process Models and Principles',
                    'Extreme Programming (XP) Process'
                ]
            },
            { 
                unit: '2', 
                firstHalf: [
                    'Software Requirement Analysis and Gathering', 
                    'Software Requirement Specification (SRS)'
                ],
                secondHalf: [
                    'Object Modelling using UML (Case Study) (15 Marks)', 
                    'Petrinets'
                ]
            },
            { 
                unit: '3', 
                firstHalf: [
                    'Software Design Principles: Coupling and Cohesion'
                ],
                secondHalf: [
                    'Architectural Styles (Layered, Client-Server, Pipe and Filter)', 
                    'Design Patterns: MVC, Observer, Proxy, Facade'
                ]
            },
            { 
                unit: '4', 
                firstHalf: [
                    'Compare Black-box and White-box Testing', 
                    'Levels of Testing: Unit, Integration, and System Testing'
                ],
                secondHalf: [
                    'Regression Testing and its Importance', 
                    'Debugging Process and Techniques'
                ]
            },
            { 
                unit: '5', 
                firstHalf: [
                    'Software Project Management (SPM)', 
                    'Project Scheduling'
                ],
                secondHalf: [
                    'DevOps: Motivation and Deployment Architecture', 
                    'Cloud as a Platform (Case Study)'
                ]
            }
        ]
    },
    'vce': {
        fullName: 'Video Creation and Editing',
        shortName: 'VCE',
        courseCode: 'CCS371',
        icon: 'fas fa-video',
        syllabus: [
            {
                unit: 'UNIT I',
                title: 'FUNDAMENTALS',
                topics: 'Evolution of filmmaking - linear editing - non-linear digital video - Economy of Expression - risks associated with altering reality through editing.'
            },
            {
                unit: 'UNIT II',
                title: 'STORYTELLING',
                topics: 'Storytelling styles in a digital world through jump cuts, L-cuts, match cuts, cutaways, dissolves, split edits - Consumer and pro NLE systems - digitizing images - managing resolutions - mechanics of digital editing - pointer files - media management.'
            },
            {
                unit: 'UNIT III',
                title: 'USING AUDIO AND VIDEO',
                topics: 'Capturing digital and analog video importing audio putting video on exporting digital video to tape recording to CDs and VCDs.'
            },
            {
                unit: 'UNIT IV',
                title: 'WORKING WITH FINAL CUT PRO',
                topics: 'Working with clips and the Viewer - working with sequences, the Timeline, and the canvas - Basic Editing - Adding and Editing Testing Effects - Advanced Editing and Training Techniques - Working with Audio - Using Media Tools - Viewing and Setting Preferences.'
            },
            {
                unit: 'UNIT V',
                title: 'WORKING WITH AVID XPRESS DV 4',
                topics: 'Starting Projects and Working with Project Window - Using Basic Tools and Logging - Preparing to Record and Recording - Importing Files - Organizing with Bins - Viewing and Making Footage - Using Timeline and Working in Trim Mode - Working with Audio - Output Options.'
            }
        ],
        materials: [
            { name: 'Unit 1: Fundamentals', file: 'vce/notes/VCE_U1.pdf' },
            { name: 'Unit 2: Storytelling', file: 'vce/notes/VCE_U2.pdf' },
            { name: 'Unit 3: Using Audio and Video', file: 'vce/notes/VCE_U3.pdf' },
            { name: 'Unit 4: Working with Final Cut Pro', file: 'vce/notes/VCE_U4.pdf' },
            { name: 'Unit 5: Working with Avid Xpress DV4', file: 'vce/notes/VCE_U5.pdf' },
            { name: '2-Mark Question Bank', file: 'vce/2m/VCE_2M.pdf' }
        ],
        previousYearQuestions: [
            { year: 'Apr/May 2024', file: 'vce/qn papers/April May 2024.pdf' },
            { year: 'Nov/Dec 2024', file: 'vce/qn papers/Nov Dec 2024.pdf' },
            { year: 'Apr/May 2025', file: 'vce/qn papers/April May 2025.pdf' }
        ],
        importantQuestions: [
            { 
                unit: '1', 
                firstHalf: [
                    'Evolution of Film Making', 
                    'Linear Editing',
                    'Non-Linear Editing'
                ],
                secondHalf: [
                    'Video Editing Process', 
                    'Economy of expression'
                ]
            },
            { 
                unit: '2', 
                firstHalf: [
                    'Storytelling Techniques', 
                    'Various Cuts in Video Editing (jump cuts, L-cuts, match cuts, cutaways, dissolves, split edits)'
                ],
                secondHalf: [
                    'Storyboard in Digital Video Editing', 
                    'Digitizing Images', 
                    'Media Management'
                ]
            },
            { 
                unit: '3', 
                firstHalf: [
                    'Capture Digital Video and Analog Video',
                    'Importing Audio'
                ],
                secondHalf: [
                    'Exporting Digital video to tape', 
                    'Recording Techniques in CD and VCD ',
                    'Storing Files in CD and VCD / Process of Burning DVDs'

                ]
            },
            { 
                unit: '4', 
                firstHalf: [
                    'Steps to Use Final Cut Pro, Tools Used in Final Cut Pro', 
                    'Working with Clips and Viewer', 
                    'Working with Sequence, Timeline & Canvas'
                ],
                secondHalf: [
                    'Advanced Editing and Trimming Techniques',
                    'Working with audio'
                ]
            },
            { 
                unit: '5', 
                firstHalf: [
                    'Working with Project Window, basic tools and logging in Avid Xpress Dv 4', 
                    'Organizing / Importing Files'
                ],
                secondHalf: [
                    'Using Timeline and Working in Trim Mode', 
                    'Viewing and Making Footage'
                ]
            }
        ]
    },
    'esia': {
        fullName: 'Environmental and Social Impact Assessment',
        shortName: 'ESIA',
        courseCode: 'OCE351',
        icon: 'fas fa-leaf',
        syllabus: [
            {
                unit: 'UNIT I',
                title: 'INTRODUCTION',
                topics: 'Impacts of Development on Environment – Rio Principles of Sustainable Development Environmental Impact Assessment (EIA) – Objectives – Historical development – EIA Types – EIA in project cycle –EIA Notification and Legal Framework–Stakeholders and their Role in EIA– Selection & Registration Criteria for EIA Consultants'
            },
            {
                unit: 'UNIT II',
                title: 'ENVIRONMENTAL ASSESSMENT',
                topics: 'Screening and Scoping in EIA – Drafting of Terms of Reference,Baseline monitoring, Prediction and Assessment of Impact on land, water, air, noise and energy, flora and fauna - Matrices – Networks – Checklist Methods - Mathematical models for Impact prediction – Analysis of alternatives'
            },
            {
                unit: 'UNIT III',
                title: 'ENVIRONMENTAL MANAGEMENT PLAN',
                topics: 'Plan for mitigation of adverse impact on water, air and land, water, energy, flora and fauna – Environmental Monitoring Plan – EIA Report Preparation – Review of EIA Reports – Public Hearing-Environmental Clearance Post Project Monitoring'
            },
            {
                unit: 'UNIT IV',
                title: 'SOCIO ECONOMIC ASSESSMENT',
                topics: 'Baseline monitoring of Socio economic environment – Identification of Project Affected Personal – Rehabilitation and Resettlement Plan- Economic valuation of Environmental impacts – Cost benefit Analysis'
            },
            {
                unit: 'UNIT V',
                title: 'CASE STUDIES',
                topics: 'EIA case studies pertaining to Infrastructure Projects – Real Estate Development - Roads and Bridges – Mass Rapid Transport Systems - Ports and Harbor – Airports - Dams and Irrigation projects - Power plants – CETPs- Waste Processing and Disposal facilities – Mining Projects.'
            }
        ],
        materials: [
            { name: 'ESIA Comprehensive', file: 'esia/notes/ESIA_merged.pdf' },
            { name: 'Unit 1 & 2 Assessment', file: 'esia/notes/esia_notes.pdf' },
            { name: 'Unit 3 Monitoring', file: 'esia/notes/esia_u3.pdf' },
            { name: 'Unit 4 Audit', file: 'esia/notes/esia_u4.pdf' },
            { name: 'Unit 5 Case Studies', file: 'esia/notes/esia_u5.pdf' },
            { name: '2-Mark Question Bank', file: 'esia/2m/esia_2m.pdf' }
        ],
        previousYearQuestions: [],
        importantQuestions: [
            { 
                unit: 'Unit 1', 
                questions: [
                    'Rio Principles of Sustainable Development', 
                    'Environmental Impact Assessment (EIA) concepts', 
                    'EIA Types'
                ] 
            },
            { 
                unit: 'Unit 2', 
                questions: [
                    'Checklist Method',
                    'Baseline Monitoring', 
                    'Prediction and Assessment of impact on: Land, Water, Air, Noise, and Energy'
                ] 
            },
            { 
                unit: 'Unit 3', 
                questions: [
                    'Plan for mitigation/adverse impact on land, water, and air', 
                    'Environmental Monitoring Plan',
                    'Cost-Benefit Analysis (CBA)',
                    'EIA Report Preparation'
                ] 
            },
            { 
                unit: 'Unit 4', 
                questions: [
                    'Cost-Benefit Analysis', 
                    'Rehabilitation and Resettlement Plan', 
                    'Economic Valuation of environmental impacts'
                ] 
            },
            { 
                unit: 'Unit 5', 
                questions: [
                    'Case Studies'
                ] 
            }
        ]
    },
    'ppl': {
        fullName: 'Principles of Programming Languages',
        shortName: 'PPL',
        courseCode: 'CCS358',
        icon: 'fas fa-terminal',
        materials: [
            { name: 'Principles of PL Full', file: 'ppl/PPL.pdf' },
            { name: 'Unit 1 Overview', file: 'ppl/ppl_unit 1.pdf' },
            { name: 'Unit 2 Data Types', file: 'ppl/ppl_unit 2.pdf' },
            { name: 'Unit 3 Subprograms', file: 'ppl/ppl_unit 3.pdf' },
            { name: 'Unit 4 Object Orientation', file: 'ppl/ppl_u4.pdf' },
            { name: 'Unit 5 Exception Handling', file: 'ppl/ppl_u5.pdf' },
            { name: 'Cheat Sheet', file: 'ppl/ppl_cs.pdf' },
            { name: 'PPL Full Draft', file: 'ppl/ppl_full.pdf' },
            { name: 'Full Lecture Notes 1', file: 'ppl/CCS358-Principles-of-Programming-Languages-Lecture-Notes-1.pdf' }
        ]
    },
    'ba': {
        fullName: 'Business Analytics',
        shortName: 'BA',
        courseCode: 'CCW331',
        icon: 'fas fa-chart-line',
        materials: [
            { name: 'Unit 1 & 2 Notes', file: 'ba/Ba_notes.pdf' },
            { name: 'Full Lecture Notes', file: 'ba/CCW331-Business-Analytics-Lecture-Notes-2.pdf' },
            { name: 'Unit 3 Notes', file: 'ba/BA_u3.pdf' },
            { name: 'Unit 4 Notes', file: 'ba/BA_u4.pdf' },
            { name: 'Unit 5 Notes', file: 'ba/BA_u5.pdf' },
            { name: '2-Mark Questions', file: 'ba/BA_2m.pdf' },
            { name: 'Additional Notes (2)', file: 'ba/Ba_notes (2).pdf' }
        ]
    },
    'eh': {
        fullName: 'Ethical Hacking',
        shortName: 'EH',
        courseCode: 'CCS344',
        icon: 'fas fa-user-secret',
        syllabus: [
            {
                unit: 'UNIT I',
                title: 'INTRODUCTION',
                topics: 'Ethical Hacking Overview - Role of Security and Penetration Testers .- Penetration-Testing Methodologies- Laws of the Land - Overview of TCP/IP- The Application Layer - The Transport Layer - The Internet Layer - IP Addressing .- Network and Computer Attacks - Malware - Protecting Against Malware Attacks.- Intruder Attacks - Addressing Physical Security'
            },
            {
                unit: 'UNIT II',
                title: 'FOOT PRINTING, RECONNAISSANCE AND SCANNING NETWORKS',
                topics: 'Footprinting Concepts - Footprinting through Search Engines, Web Services, Social Networking Sites, Website, Email - Competitive Intelligence - Footprinting through Social Engineering - Footprinting Tools - Network Scanning Concepts - Port-Scanning Tools - Scanning Techniques - Scanning Beyond IDS and Firewall'
            },
            {
                unit: 'UNIT III',
                title: 'ENUMERATION AND VULNERABILITY ANALYSIS',
                topics: 'Enumeration Concepts - NetBIOS Enumeration – SNMP, LDAP, NTP, SMTP and DNS Enumeration - Vulnerability Assessment Concepts - Desktop and Server OS Vulnerabilities - Windows OS Vulnerabilities - Tools for Identifying Vulnerabilities in Windows- Linux OS Vulnerabilities- Vulnerabilities of Embedded Oss'
            },
            {
                unit: 'UNIT IV',
                title: 'SYSTEM HACKING',
                topics: 'Hacking Web Servers - Web Application Components- Vulnerabilities - Tools for Web Attackers and Security Testers Hacking Wireless Networks - Components of a Wireless Network – Wardriving- Wireless Hacking - Tools of the Trade -'
            },
            {
                unit: 'UNIT V',
                title: 'NETWORK PROTECTION SYSTEMS',
                topics: 'Access Control Lists. - Cisco Adaptive Security Appliance Firewall - Configuration and Risk Analysis Tools for Firewalls and Routers - Intrusion Detection and Prevention Systems - Network-Based and Host-Based IDSs and IPSs - Web Filtering - Security Incident Response Teams – Honeypots.'
            }
        ],
        materials: [
            { name: 'Ethical Hacking Full', file: 'eh/Eh_notes.pdf' },
            { name: 'Unit 1 Intro', file: 'eh/eh_unit1.pdf' },
            { name: 'Unit 2 Footprinting', file: 'eh/eh_unit2.pdf' },
            { name: 'Unit 3 Scanning', file: 'eh/eh_unit3.pdf' },
            { name: 'Advanced EH-16', file: 'eh/EH-16.pdf' }
        ]
    }
};

export const examEvents = [
    { id: 'oose-exam', name: 'OOSE Exam', date: '2026-04-28T10:00:00', reviewDate: '2026-04-28T13:00:00', color: '#6366f1' },
    { id: 'vce-exam-2', name: 'VCE Exam ', date: '2026-05-02T10:00:00', reviewDate: '2026-05-02T15:00:00', color: '#ec4899' },
    { id: 'esia-exam', name: 'ESIA Exam', date: '2026-05-07T10:00:00', reviewDate: '2026-05-07T13:00:00', color: '#10b981' },
    { id: 'ppl-exam', name: 'PPL Exam', date: '2026-05-11T14:00:00', reviewDate: '2026-05-11T17:00:00', color: '#fbbf24' },
    { id: 'ba-exam', name: 'BA Exam', date: '2026-05-14T10:00:00', reviewDate: '2026-05-14T13:00:00', color: '#8b5cf6' },
    { id: 'eh-exam', name: 'EH Exam', date: '2026-05-19T10:00:00', reviewDate: '2026-05-19T13:00:00', color: '#f43f5e' }
];

export const girlEmails = [
    "mahesviswa22@gmail.com", "bhavanapriya878@gmail.com", "harinimitra31@gmail.com", 
    "ranjani107107@gmail.com", "priyapriya26591@gmail.com", "sanjurenuka8296@gmail.com", 
    "kowsalyark28@gmail.com", "nikithaelangovan22@gmail.com", "sanjanameenagp@gmail.com", 
    "sandhiya.sandhu2911@gmail.com", "ran9342583446@gmail.com", "priyaanitha458@gmail.com", 
    "ksowmi2023@gmail.com", "sarumathy1108@gmail.com", "hemamalini653k@gmail.com",
    "vishnuasvichu14@gmail.com"
];
