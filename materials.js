/**
 * Centralized Subject Materials Data
 * Used by home.html for search and resources.html for filtered views.
 */

export const subjectMaterials = {
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
            { name: 'Object Oriented SE Full', file: 'oose/oose_notes.pdf' },
            { name: 'Unit 1 Basics', file: 'oose/oose_unit1.pdf' },
            { name: 'Unit 3 Design', file: 'oose/oose_u3.pdf' },
            { name: 'Unit 4 Implementation', file: 'oose/oose_u4.pdf' },
            { name: 'Unit 5 Testing', file: 'oose/oose_u5.pdf' },
            { name: 'Unit 4 Advanced (VI)', file: 'oose/VI_CSE_CCS356_OOSE_Unit4.pdf' },
            { name: 'Unit 5 Advanced (VI)', file: 'oose/VI_CSE_CCS356_OOSE_Unit5.pdf' },
            { name: '2-Mark Master List', file: 'oose/oose_2m.pdf' },
            { name: 'Assignment Front Page', file: 'oose/OOSE-Assignment front page.docx' }
        ],
        importantQuestions: [
            { unit: 'Unit 1', questions: ['Agile Process', 'Software Process', 'Extreme Programming (XP) Process'] },
            { unit: 'Unit 2', questions: ['Software Requirement Specification (SRS)', 'Requirement Gathering and Analysis', 'Object Modeling using UML (Class, Activity, Use Case, Sequence, State Chart, Component, Deployment Diagrams)', 'Case Study'] },
            { unit: 'Unit 3', questions: ['UI Interface Design', 'MVC Architecture', 'Types of Cohesion and Coupling', 'Architectural Styles'] },
            { unit: 'Unit 4', questions: ['Regression Testing', 'Unit Testing and Integration Testing', 'Types of Software Testing', 'Debugging', 'Comparison of White and Black Box Testing'] },
            { unit: 'Unit 5', questions: ['Software Project Management', 'Deployment Pipeline Architecture', 'DevOps'] }
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
    },
    'esia': {
        fullName: 'Environmental Impact Assessment',
        shortName: 'ESIA',
        courseCode: 'OCE351',
        icon: 'fas fa-microchip',
        materials: [
            { name: 'ESIA Comprehensive', file: 'esia/ESIA_merged.pdf' },
            { name: 'Unit 1 & 2 Assessment', file: 'esia/esia_notes.pdf' },
            { name: 'Unit 3 Monitoring', file: 'esia/esia_u3.pdf' },
            { name: 'Unit 4 Audit', file: 'esia/esia_u4.pdf' },
            { name: 'Term Assignment 2', file: 'esia/ESIA Assignment 2.pdf' }
        ]
    },
    'ppl': {
        fullName: 'Programming Languages',
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
            { name: 'Video Creation Guide', file: 'vce/CCS371-Video Creation and Editing.pdf' },
            { name: 'Unit 1 Pre-production', file: 'vce/vce_unit1.pdf' },
            { name: 'Unit 2 Production', file: 'vce/vce_unit2.pdf' },
            { name: 'Unit 3 Post-production', file: 'vce/VCE_U3.pdf' },
            { name: 'Unit 4 Effects', file: 'vce/VCE_U4.pdf' },
            { name: 'Unit 5 Distribution', file: 'vce/VCE_U5.pdf' },
            { name: '2-Mark Questions', file: 'vce/vce_2m.pdf' },
            { name: '2-Mark Detailed', file: 'vce/CCS371-Video Creation and Editing 2 Marks.pdf' },
            { name: 'Unit 2 Specifics', file: 'vce/CCS371 VCE Unit-2.pdf' }
        ]
    }
};
