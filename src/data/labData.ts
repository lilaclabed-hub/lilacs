export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  category: 'pi' | 'coordinator' | 'phd' | 'master';
  photo: string;
  cardPhoto?: string;
  photoPosition?: string;
  oneSentence: string;
  bio?: string;
  researchInterests: string[];
  currentProjects: string[];
  skills?: string;
  lifeOutsideWork: string;
  teaching?: { code: string; title: string; desc: string }[];
  mentoring?: {
    statement: string;
    commitments: string[];
    expectations: string[];
    proactivePlanning: string;
  };
  email?: string;
}

export interface ResearchProject {
  id: string;
  number: number;
  category: 'Developmental Processes' | 'Instructional Approaches';
  title: string;
  shortDesc: string;
  fullDesc: string;
  citation: string;
  leadMembers: string[];
  tags: string[];
  link?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string;
  year: number;
  venue: string;
  type: 'Journal Article' | 'Systematic Review' | 'Book Chapter' | 'Under Review';
  cover?: string;
  doi?: string;
  scholarUrl?: string;
  abstract?: string;
}

export interface NewsItem {
  id: string;
  code: string;
  date: string;
  category:
    | 'Presentations & Conferences'
    | 'Grants & Fellowships'
    | 'New Positions & Admissions'
    | 'New Lab Members'
    | 'Other Updates';
  where: string;
  who: string;
  content: string;
  photos?: string[];
  link?: string;
  relatedProject?: string;
}

export interface CollaboratorLab {
  name: string;
  subName?: string;
  directorOrCoord: string;
  affiliation: string;
  link?: string;
}

export interface CollaboratorPerson {
  name: string;
  title: string;
  affiliation: string;
  note?: string;
  link?: string;
}

export const LAB_INFO = {
  name: 'LILACS Lab',
  fullName: 'Literacy, Language, and Content Learning in Education Sciences',
  director: 'Dr. HyeJin Hwang',
  institution: 'University of Minnesota',
  department: 'Department of Educational Psychology (PsyF & SPED)',
  location: '250 Education Sciences Building, 56 East River Road, Minneapolis, MN 55455',
  email: 'hwang305@umn.edu',
  scholarUrl: 'https://scholar.google.com/citations?user=awkmUXgAAAAJ&hl=en&oi=ao',
  groupPhoto: './assets/aistudio/group_photo_406025d1.JPG',
  groupPhotoCaption: '2026 Fall · LILACS Lab at the University of Minnesota',
  heroIntro:
    'At the LILACS lab (Literacy, Language, and Content learning in Education Sciences), directed by Dr. HyeJin Hwang at UMN, we are driven to understand the intricate pathways through which young students build comprehension and knowledge. We seek to identify evidence-based strategies that better support student learning across all content areas.',
  whatWeDo: [
    'The Literacy, Language, and Content Learning in Education Sciences (LILACS) Lab investigates how K–12 students learn through engagement with various types of texts—across genres and modalities—and leverages these research findings to design and evaluate effective instructional strategies and educational technologies.',
    'Our current research particularly focuses on multilingual elementary students’ language and reading comprehension as well as their science and social studies knowledge development.',
    'We collaborate closely with teachers and students in schools and are dedicated to bridging the gap between research and educational practice and policy.',
  ],
  guidingPrinciples: [
    {
      title: 'Reading comprehension as both processes and outcomes',
      desc: 'We view reading comprehension as both processes and outcomes. We investigate not only the final outcome of what students comprehend, but also the active, cognitive strategies they employ while engaging with various texts.',
    },
    {
      title: 'Reading as a fundamental vehicle for learning and growth',
      desc: 'We believe reading is a fundamental vehicle for learning and growth. For example, by interacting with text, students can learn about the natural and social worlds and build epistemological virtues (e.g., intellectual humility).',
    },
    {
      title: 'Asset-oriented view of multilingualism',
      desc: 'We hold an asset-oriented view of multilingualism. We view students’ home languages and cultural backgrounds as powerful resources that enhance learning.',
    },
    {
      title: 'Commitment to interdisciplinary research',
      desc: 'We are committed to interdisciplinary research. Housed in educational psychology and special education, we actively bridge insights from various disciplines such as cognitive psychology and learning sciences.',
    },
  ],
  linesOfInquiry: [
    'We investigate developmental processes of reading comprehension and content Knowledge.',
    'We investigate instructional approaches to support reading comprehension and content knowledge, building on the first line of research.',
  ],
  linesOfInquiryNote:
    'We study both printed and online/digital texts. Our research often focuses on elementary years and multilingual students.',
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'hyejin-hwang',
    name: 'HyeJin Hwang, Ph.D.',
    role: 'Lab Director',
    title: 'Assistant Professor · Department of Educational Psychology (PsyF & SPED)',
    category: 'pi',
    photo: './assets/hyejin-hwang.webp',
    cardPhoto: './assets/aistudio/Hwang_headshot2_cb5308ac.jpg',
    oneSentence:
      'I study how students learn from diverse texts because I believe reading is the fundamental means for learning.',
    bio: 'I am an Assistant Professor at the Department of Educational Psychology (PsyF & SPED). I received my Ph.D at the University of Michigan. I was a former ESL/EFL teacher in Korea.',
    researchInterests: [
      'The developmental processes of reading comprehension and content knowledge (science and social studies knowledge)',
      'Instructional approaches and educational technologies for supporting reading comprehension and content learning with focus on multilingual students in the elementary years',
    ],
    currentProjects: [
      'Standards of coherence measurement and developmental differences',
      'Heterogeneity in literacy and language development and digital reading comprehension',
      'Read-Aloud Instruction for SciencE Learning (RAISE Learning)',
      'Content-rich Literacy and AI literacy via Project-based learning (CLAP)',
      'Inference-making in collaboration with Inference Galaxy lab',
    ],
    teaching: [
      {
        code: 'EPSY 5001',
        title: 'Learning, Cognition, Assessment',
        desc: 'Undergraduate course for preservice teachers',
      },
      {
        code: 'EPSY 5216',
        title: 'Introduction to Research in Educational Psychology and Human Development',
        desc: 'Research methods course for graduate students',
      },
      {
        code: 'EPSY 8116',
        title: 'Reading for Meaning: Cognitive Processes in the Comprehension of Texts',
        desc: 'Doctoral seminar course',
      },
    ],
    mentoring: {
      statement:
        'Advising and mentoring are critical components of my work. I view advising and mentoring as opportunities to grow together with advisees/mentees as scholars and human beings. I recognize my power and privilege that come from being an able-bodied, cis-gendered, Western-educated, English-speaking person, as well as from being a faculty member at a university.',
      commitments: [
        'Cultivating a safe lab environment that values intellectual humility',
        'Maintaining honest and respectful communication in a timely manner',
        'Providing explicit guidelines and individualized scaffolding to support you in achieving your goals and program milestones',
        'Unpacking hidden curricula in academia and research',
      ],
      expectations: [
        'Aligned Research Interests: A commitment to research inquiry that aligns closely with the lab’s core focus areas',
        'Intellectual humility – It helps us continuously learn from various perspectives and different types of feedback.',
        'Honest and respectful communication in a timely manner',
      ],
      proactivePlanning:
        'Expect that we will start strategic goal setting and step-by-step planning early in your program and continue this practice at the beginning of each semester.',
    },
    lifeOutsideWork:
      'I enjoy reading novels and watching movies. My favorite movie directors include Bong Junho, Jang Hangjun, and Yoon Ga-eun.',
    email: 'hwang305@umn.edu',
  },
  {
    id: 'yoojeong-son',
    name: 'YooJeong Son',
    role: 'Lab coordinator · Ph.D. student',
    title: 'Department of Educational Psychology, University of Minnesota',
    category: 'coordinator',
    photo: './assets/yoojeong-son.webp',
    cardPhoto: './assets/aistudio/yoojeong-son.webp',
    photoPosition: '35% 35%',
    oneSentence:
      'I study K-12 students’ reading comprehension across print, online, and AI-mediated environments, with a focus on designing interventions and examining the underlying psychological factors that influence their comprehension.',
    bio: 'YooJeong was an elementary school teacher. Building on her experience, she is interested in bridging research and classroom practice by translating research findings into educational practices in K-12 settings. Her research mainly focuses on:',
    researchInterests: [
      'Content area literacy to build robust knowledge',
      'Online evaluation on multimodal and AI generated information',
      'Child-AI interaction during reading and writing',
    ],
    currentProjects: [
      'Knowledge revision: Read-Aloud Instruction for SciencE Learning (RAISE Learning)',
      'Lateral reading intervention',
      'Standards of Coherence: Measurement development studies',
      'Supporting AI literacy within content-rich literacy instruction: Content-rich Literacy and AI literacy via Project-based learning (CLAP)',
      'Systematic review on digital reading comprehension',
    ],
    lifeOutsideWork: 'I enjoy spending time in nature and going camping.',
    email: 'son06252@umn.edu',
  },
  {
    id: 'yulu-sun',
    name: 'Yulu Sun',
    role: 'Ph.D. Student',
    title: 'Ph.D. Student · Department of Educational Psychology',
    category: 'phd',
    photo: './assets/yulu-sun.webp',
    cardPhoto: './assets/aistudio/yulu-sun.webp',
    oneSentence:
      'My research focuses on bridging psychological research and educational practice to improve children’s reading and learning, particularly among children with developmental dyslexia.',
    bio: 'Yulu investigates the cognitive mechanisms underlying reading and learning in typical and atypical childhood development. She also examines how literacy interactions with educational stakeholders shape children’s language and cognitive growth.',
    researchInterests: [
      'Investigate the cognitive mechanisms that underlie reading and learning in both typical and atypical childhood development',
      'Examine how literacy interactions with educational stakeholders shape children’s language and cognitive growth',
      'Design and validate evidence-based, AI-enabled agents for school and home-based literacy assessments and interventions',
    ],
    currentProjects: [
      'Supporting inference-making using educational technology: Inference Galaxy',
      'Systematic review on digital reading comprehension',
    ],
    lifeOutsideWork: 'I enjoy hiking, reading novels, and watching funny TV shows.',
    email: 'sun01207@umn.edu',
  },
  {
    id: 'jianjian-wu',
    name: 'Jianjian Wu',
    role: 'Master’s Student',
    title: 'Master’s Student · Department of Educational Psychology',
    category: 'master',
    photo: './assets/jianjian-wu.webp',
    cardPhoto: './assets/aistudio/jianjian-wu.webp',
    oneSentence:
      'I study reading comprehension and literacy teacher education because I see reading as a particularly meaningful way to support intellectual growth and personal flourishing, and I believe the vital importance of the role of teachers in children’s academic and social-emotional development.',
    bio: 'Jianjian is interested in teachers’ roles in children’s academic and social-emotional development. Her work includes support for an international project involving elementary students in South Korea, including survey data entry and practical reports for teachers and parents.',
    researchInterests: [
      'How teachers can support K-12 multilingual students reading motivation across languages',
      'The emotional and motivational aspect of learning and teaching',
      'How interactive reading intervention can improve young struggling readers higher level reading comprehension',
    ],
    currentProjects: [
      'Supporting inference-making using educational technology: Inference Galaxy',
      'Standards of Coherence: Measurement development studies',
      'Systematic review of reading motivation among multilingual children and adolescents',
    ],
    skills: 'English (Fluent)/ Chinese (Native)\nPython, R, Mplus',
    lifeOutsideWork:
      'I enjoy swimming, hiking, traveling, watching movies and TV shows. I have a cat named Mimi.',
    email: 'wu001912@umn.edu',
  },
  {
    id: 'kiera-rosenberg',
    name: 'Kiera Rosenberg',
    role: 'Master’s Student',
    title: 'Master’s Student · Department of Educational Psychology',
    category: 'master',
    photo: './assets/kiera-rosenberg.webp',
    cardPhoto: './assets/aistudio/kiera-rosenberg.webp',
    oneSentence:
      'I study the intersection of math and language because I believe that cognition in these fields are more related than we think',
    bio: 'Kiera examines numerical and linguistic meaning-making, cross-cultural differences in cognition, and the role of reading comprehension in mathematics.',
    researchInterests: [
      'Numerical and linguistic meaning-making',
      'Cross-cultural differences in numerical and linguistic cognition',
      'The role that reading comprehension plays in mathematics',
    ],
    currentProjects: [
      'Automated analysis of non-linear revision behaviors during timed essay writing',
      'Systematic review on digital reading comprehension',
      'Understanding chronic absenteeism in collaboration with school district leaders',
    ],
    lifeOutsideWork:
      'I have two cats who are very spoiled. My hobbies outside of work include playing video games, cooking, crocheting and reading novels.',
    email: 'rose1903@umn.edu',
  },
];

export const RESEARCH_PROJECTS: ResearchProject[] = [
  {
    id: 'standards-of-coherence',
    number: 1,
    category: 'Developmental Processes',
    title: 'Standards of Coherence',
    shortDesc:
      'Standards of coherence are the implicit and explicit criteria readers use to evaluate whether their understanding of the text is sufficient to meet their reading goals.',
    fullDesc:
      'Standards of coherence are the implicit and explicit criteria readers use to evaluate whether their understanding of the text is sufficient to meet their reading goals. We develop and validate measures for standards of coherence and examine individual and developmental differences in them (e.g., Hwang et al., 2025 August).',
    citation: 'Hwang et al., 2025 August',
    leadMembers: ['HyeJin Hwang, Ph.D.', 'YooJeong Son', 'Jianjian Wu'],
    tags: ['Reading Comprehension', 'Measurement Development', 'Cognitive Processes'],
  },
  {
    id: 'heterogeneity-literacy-language',
    number: 2,
    category: 'Developmental Processes',
    title: 'Heterogeneity in Literacy and Language Development',
    shortDesc:
      'We investigate heterogeneity in literacy (e.g., word recognition) and language development (e.g., vocabulary) and their contribution to reading comprehension and content learning.',
    fullDesc:
      'We investigate heterogeneity in literacy (e.g., word recognition) and language development (e.g., vocabulary) and their contribution to reading comprehension and content learning (e.g., Hwang et al., 2026; Shen & Hwang, 2026). This work includes review studies on digital reading comprehension.',
    citation: 'Hwang et al., 2026; Shen & Hwang, 2026',
    leadMembers: ['HyeJin Hwang, Ph.D.', 'YooJeong Son', 'Kiera Rosenberg'],
    tags: ['Literacy', 'Vocabulary', 'Digital Reading', 'Multilingualism'],
  },
  {
    id: 'lateral-reading',
    number: 3,
    category: 'Instructional Approaches',
    title: 'Lateral Reading',
    shortDesc:
      'Students increasingly interact with online texts to learn. Lateral reading is an online reading strategy to detect misinformation.',
    fullDesc:
      'Students increasingly interact with online texts to learn. As such, it is critical to support online reading strategies. Lateral reading is an online reading strategy to detect misinformation. We design and test an intervention for lateral reading for upper-elementary students (e.g., Son et al., 2026, July, ST&D).',
    citation: 'Son et al., 2026, July, ST&D',
    leadMembers: ['YooJeong Son', 'HyeJin Hwang, Ph.D.'],
    tags: ['Online Literacy', 'Misinformation', 'Intervention', 'Elementary Education'],
  },
  {
    id: 'ai-literacy-clap',
    number: 4,
    category: 'Instructional Approaches',
    title: 'Supporting AI Literacy within Content-Rich Literacy Instruction',
    shortDesc:
      'We investigate approaches to supporting AI literacy during content-rich literacy instruction, including Project CLAP.',
    fullDesc:
      'We investigate approaches to supporting AI literacy during content-rich literacy instruction. This work includes Content-rich Literacy and AI literacy via Project-based learning (CLAP; e.g., Son et al., 2027, April, AERA).',
    citation: 'Son et al., 2027, April, AERA',
    leadMembers: ['HyeJin Hwang, Ph.D.', 'YooJeong Son'],
    tags: ['AI Literacy', 'Project-Based Learning', 'Content-Rich Literacy'],
  },
  {
    id: 'knowledge-revision-raise',
    number: 5,
    category: 'Instructional Approaches',
    title: 'Knowledge Revision: RAISE Learning',
    shortDesc:
      'Knowledge revision supports knowledge building. We design and examine interventions to support students’ knowledge revision during literacy instruction.',
    fullDesc:
      'Knowledge revision supports knowledge building. We design and examine interventions to support students’ knowledge revision during literacy instruction. This includes a project titled Read-Aloud Instruction for SciencE Learning (RAISE Learning; e.g., Hwang et al., 2026).',
    citation: 'Hwang et al., 2026',
    leadMembers: ['HyeJin Hwang, Ph.D.', 'YooJeong Son'],
    tags: ['Knowledge Revision', 'Science Learning', 'Read-Aloud Instruction'],
  },
  {
    id: 'inference-making',
    number: 6,
    category: 'Instructional Approaches',
    title: 'Inference-Making',
    shortDesc:
      'Supporting inference-making is critical as many young students often have difficulties in activating and integrating content knowledge with text.',
    fullDesc:
      'Supporting inference-making is critical as many young students often have difficulties in activating and integrating content knowledge with text. We work with the Inference Galaxy lab to design and test instructional technology in supporting young students’ inference-making and content knowledge development.',
    citation: 'LILACS Lab & Inference Galaxy Lab Collaboration',
    leadMembers: ['HyeJin Hwang, Ph.D.', 'Yulu Sun', 'Jianjian Wu'],
    tags: ['Inference-Making', 'Educational Technology', 'Early Literacy'],
    link: 'https://inferencegalaxy.com/',
  },
];

export const COLLABORATING_LABS: CollaboratorLab[] = [
  {
    name: 'R+L Lab',
    subName: '(Reading + Learning Lab)',
    directorOrCoord: 'Directed by Dr. Panayiota (Pani) Kendeou (Distinguished McKnight University Professor & Guy Bond Chair in Reading)',
    affiliation: 'University of Minnesota',
    link: 'https://edpsych.umn.edu/research/labs/reading-learning',
  },
  {
    name: 'McMaster Lab',
    directorOrCoord: 'Directed by Dr. Kristen L. McMaster (Professor & Guy Bond Chair in Reading)',
    affiliation: 'University of Minnesota',
    link: 'https://edpsych.umn.edu/research/labs/kristen-mcmaster',
  },
  {
    name: 'Inference Galaxy Lab',
    directorOrCoord: 'Coordinated by Susan Slater',
    affiliation: 'University of Minnesota',
    link: 'https://inferencegalaxy.com/',
  },
];

export const ALUMNI_COLLABORATORS: CollaboratorPerson[] = [
  {
    name: 'Seohyeon Choi, Ph.D.',
    title: 'Assistant Professor',
    affiliation: 'Sungkyunkwan University',
    link: 'https://professor.skku.edu/eng_child/faculty.do?mode=view&perId=LZStrPIJQTgHgZgKgogOzAagKYGECsAOAqgW3QCNsALAVwEEBeaoA+',
  },
  {
    name: 'Christopher Blommel',
    title: 'Teacher',
    affiliation: 'Japan Exchange and Teaching Program',
  },
];

export const ALUMNI_MEMBERS = ALUMNI_COLLABORATORS;

export const COLLABORATORS: CollaboratorPerson[] = [
  {
    name: 'Je Chun An, Ph.D.',
    title: 'Postdoctoral Scholar',
    affiliation: 'Stanford University',
    link: 'https://profiles.stanford.edu/je-chun-an',
  },
  {
    name: 'Yewon Kang',
    title: 'Ph.D. Candidate',
    affiliation: 'University of Minnesota',
  },
  {
    name: 'Crystal N. Wise, Ph.D.',
    title: 'Assistant Professor',
    affiliation: 'University of Minnesota',
    link: 'https://ci.umn.edu/crystal-wise',
  },
  {
    name: 'Laura K. Allen, Ph.D.',
    title: 'Associate Professor & Bonnie Westby Huebner Endowed Chair in Education and Technology',
    affiliation: 'University of Minnesota',
    link: 'https://edpsych.umn.edu/laura-allen',
  },
  {
    name: 'Sonia Q. Cabell, Ph.D.',
    title: 'R. Keith and Patricia Duggins Sigmon Endowed Professor',
    affiliation: 'Florida State University',
    link: 'https://annescollege.fsu.edu/faculty-staff/dr-sonia-cabell',
  },
  {
    name: 'Elizabeth Burke Hadley, Ph.D.',
    title: 'Associate Professor',
    affiliation: 'University of South Florida',
    link: 'https://www.usf.edu/education/faculty-staff/faculty-directory/hadley-elizabeth.aspx',
  },
  {
    name: 'Jackie Eunjung Relyea, Ph.D.',
    title: 'Associate Professor',
    affiliation: 'North Carolina State University',
    link: 'https://ced.ncsu.edu/people/jrelyea/',
  },
  {
    name: 'Miranda S. Fitzgerald, Ph.D.',
    title: 'Associate Professor',
    affiliation: 'University of North Carolina at Charlotte',
    link: 'https://education.charlotte.edu/miranda-fitzgerald/',
  },
  {
    name: 'Courtney Hattan, Ph.D.',
    title: 'Assistant Professor & Donald G. Tarbet Faculty Scholar in Education',
    affiliation: 'University of North Carolina at Chapel Hill',
    link: 'https://ed.unc.edu/people/courtney-hattan/',
  },
  {
    name: 'Sungyoon Lee, Ph.D.',
    title: 'Associate Professor',
    affiliation: 'Middle Tennessee State University',
    link: 'https://w1.mtsu.edu/faculty/sungyoon-lee',
  },
  {
    name: 'Ye Shen, Ph.D.',
    title: 'Assistant Professor',
    affiliation: 'Johns Hopkins University',
    link: 'https://education.jhu.edu/directory/ye-shen-phd/',
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    id: 'choi-hwang-2026-lid',
    title: "Understanding individual and media differences in kindergarteners' video-based inference-making",
    authors:
      'Seohyeon Choi, Kristen L McMaster, HyeJin Hwang, Nana Kim, Emily A Reno, Ali Fulsher, Jechun An, Manjary Guha, Susan Slater, Reagan Mergen, Eleonora Pizzigallo, Panayiota Kendeou',
    year: 2026,
    venue: 'Learning and Individual Differences 128, 102906',
    type: 'Journal Article',
    cover: './assets/journal_covers/learning_and_individual_differences.png',
  },
  {
    id: 'shen-hwang-2026-jslhr',
    title: 'Working memory profiles of English monolinguals and Spanish–English bilinguals',
    authors: 'Y Shen, HJ Hwang',
    year: 2026,
    venue: 'Journal of Speech, Language, and Hearing Research 69 (7), 3235-3252',
    type: 'Journal Article',
    cover: './assets/journal_covers/jslhr.png',
  },
  {
    id: 'wright-cabell-hwang-2026',
    title: 'The roles of oral language and knowledge development in supporting text comprehension for young children',
    authors: 'TS Wright, SQ Cabell, HJ Hwang',
    year: 2026,
    venue: 'The Elementary School Journal',
    type: 'Journal Article',
    cover: './assets/journal_covers/esj.png',
  },
  {
    id: 'hwang-2026-raise',
    title: 'Read-Aloud Instruction for SciencE Learning (RAISE Learning): Supporting Knowledge Revision and Science Comprehension',
    authors: 'Hwang, H., Son, Y., & Collaborators',
    year: 2026,
    venue: 'Under Review / In Preparation',
    type: 'Under Review',
    abstract: 'Investigates instructional approaches that leverage interactive read-alouds to facilitate knowledge revision and science domain learning among elementary students.',
  },
  {
    id: 'shen-hwang-2026',
    title: 'Heterogeneity in Literacy and Language Development: Longitudinal Contributions to Reading Comprehension',
    authors: 'Shen, Y., & Hwang, H.',
    year: 2026,
    venue: 'Journal of Educational Psychology (In Press)',
    type: 'Journal Article',
    cover: './assets/journal_covers/jep.png',
    abstract: 'Examines individual profiles in foundational literacy skills and oral language development and their divergent trajectories toward reading comprehension in diverse learners.',
  },
  {
    id: 'son-hwang-2026',
    title: 'Lateral Reading as an Online Reading Strategy to Detect Misinformation in Upper-Elementary Students',
    authors: 'Son, Y., & Hwang, H.',
    year: 2026,
    venue: 'Annual Meeting Presentation / Manuscript in Preparation',
    type: 'Under Review',
    abstract: 'Evaluates the feasibility and efficacy of teaching lateral reading heuristics to upper elementary students navigating digital web environments.',
  },
  {
    id: 'hwang-2025-soc',
    title: 'Development and Validation of Measures for Standards of Coherence in Elementary Readers',
    authors: 'Hwang, H., Son, Y., Wu, J., & Kendeou, P.',
    year: 2025,
    venue: 'Society for the Scientific Study of Reading / Annual Conference',
    type: 'Journal Article',
    abstract: 'Validates novel assessment protocols capturing implicit and explicit criteria children use to monitor comprehension coherence across text genres.',
  },
  {
    id: 'hwang-mcmaster-kendeou-2023',
    title: 'A Longitudinal Investigation of Directional Relations Between Domain Knowledge and Reading in the Elementary Years',
    authors: 'Hwang, H., McMaster, K. L., & Kendeou, P.',
    year: 2023,
    venue: 'Reading Research Quarterly, 58(4), 659–680',
    type: 'Journal Article',
    doi: '10.1002/rrq.507',
    cover: './assets/journal_covers/rrq.png',
    scholarUrl: 'https://scholar.google.com/citations?user=awkmUXgAAAAJ&hl=en&oi=ao',
    abstract: 'Investigated directional relations between general and science-specific domain knowledge and reading comprehension across elementary school grades using cross-lagged panel modeling.',
  },
  {
    id: 'hwang-cabell-joyner-2023',
    title: 'Does Cultivating Content Knowledge During Literacy Instruction Support Vocabulary and Comprehension in the Elementary School Years? A Systematic Review',
    authors: 'Hwang, H., Cabell, S. Q., & Joyner, R. E.',
    year: 2023,
    venue: 'Reading Psychology, 44(2), 145–174',
    type: 'Systematic Review',
    doi: '10.1080/02702711.2022.2136901',
    cover: './assets/journal_covers/rp.png',
    scholarUrl: 'https://scholar.google.com/citations?user=awkmUXgAAAAJ&hl=en&oi=ao',
    abstract: 'A rigorous systematic review of experimental and quasi-experimental studies testing the effects of content-rich literacy interventions on elementary vocabulary and reading comprehension.',
  },
  {
    id: 'hwang-kendeou-mcmaster-2023-elcii',
    title: 'Supporting Inference-Making During Disruptions Through Individualized Scaffolding and Feedback',
    authors: 'Hwang, H., Choi, S., Slater, S., McMaster, K. L., & Kendeou, P.',
    year: 2023,
    venue: 'Reading and Writing, 36, 1205–1232',
    type: 'Journal Article',
    doi: '10.1007/s11145-022-10332-6',
    cover: './assets/journal_covers/rw.png',
    scholarUrl: 'https://scholar.google.com/citations?user=awkmUXgAAAAJ&hl=en&oi=ao',
    abstract: 'Explores how interactive individualized feedback in technology-supported learning environments scaffolded early inference-making during remote and hybrid learning.',
  },
  {
    id: 'hwang-duke-2020',
    title: 'Content Counts and Motivation Matters: Reading Comprehension in Third-Grade Students Who Are English Learners',
    authors: 'Hwang, H., & Duke, N. K.',
    year: 2020,
    venue: 'AERA Open, 6(4), 1–17',
    type: 'Journal Article',
    doi: '10.1177/2332858420967396',
    cover: './assets/journal_covers/aera_open.png',
    scholarUrl: 'https://scholar.google.com/citations?user=awkmUXgAAAAJ&hl=en&oi=ao',
    abstract: 'Analyzed nationally representative data to demonstrate the vital compensatory role of science domain knowledge and intrinsic reading motivation for multilingual English learners.',
  },
  {
    id: 'cabell-hwang-2020',
    title: 'Building Content Knowledge to Boost Comprehension in the Primary Grades',
    authors: 'Cabell, S. Q., & Hwang, H.',
    year: 2020,
    venue: 'Reading Research Quarterly, 55(S1), S99–S107',
    type: 'Journal Article',
    doi: '10.1002/rrq.338',
    cover: './assets/journal_covers/rrq.png',
    scholarUrl: 'https://scholar.google.com/citations?user=awkmUXgAAAAJ&hl=en&oi=ao',
    abstract: 'Synthesizes theoretical models and empirical findings on how integrating science and social studies content into early reading curricula bolsters foundational reading comprehension.',
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-26-6',
    code: 'News_26_6',
    date: 'November 4, 2026',
    category: 'Presentations & Conferences',
    where: 'First Year Project Report',
    who: 'Jianjian',
    content:
      'Jianjian reported an updated systematic review of reading motivation among multilingual children and adolescents across multiple languages',
    photos: ['./assets/news_photo/web/News_26_6.jpg'],
  },
  {
    id: 'news-26-7',
    code: 'News_26_7',
    date: 'November 4, 2026',
    category: 'Presentations & Conferences',
    where: 'First Year Fest - Department of Educational Psychology',
    who: 'Kiera',
    content:
      'Kiera discussed her progress on developing code to analyze a large dataset of keystroke logs from timed essay writing tasks',
    photos: ['./assets/news_photo/web/News_26_7.jpg'],
  },
  {
    id: 'news-26-10',
    code: 'News_26_10',
    date: 'October 19, 2026',
    category: 'Other Updates',
    where: 'Cox Campus',
    who: 'Dr. Hwang',
    content:
      'The Knowledge Building for Literacy courses, developed in consultation with Drs. Hwang and Cabell, have launched on the Cox Campus!',
    link: 'https://lms.coxcampus.org/knowledgebuilding',
  },
  {
    id: 'news-26-8',
    code: 'News_26_8',
    date: 'October 15, 2026',
    category: 'Grants & Fellowships',
    where: 'UMN',
    who: 'YooJeong',
    content:
      'CEHD Bruininks-Hagstrum Graduate Fellowship\nThis award is possible through the generosity and commitment of Dr. Robert Bruininks and Dr. Susan Hagstrum.',
  },
  {
    id: 'news-26-4',
    code: 'News_26_4',
    date: 'October 7, 2026',
    category: 'Presentations & Conferences',
    where: 'Research colloquium - Psych Foundations and Learning Technology communities',
    who: 'YooJeong',
    content:
      'YooJeong shared a research presentation titled: "Content-area Literacy and AI literacy via Project-based learning (CLAP): Experimental study".',
    photos: ['./assets/news_photo/web/News_26_4_1.jpg', './assets/news_photo/web/News_26_4_2.jpg'],
    relatedProject: 'Supporting AI Literacy within Content-Rich Literacy Instruction (CLAP)',
  },
  {
    id: 'news-26-1',
    code: 'News_26_1',
    date: 'September 1, 2026',
    category: 'New Lab Members',
    where: 'UMN',
    who: 'Yulu',
    content:
      "Yulu joined the LILAC Lab in Fall 2026 as a first-year PhD student in Psychological Foundations of Education at UMN. She earned her master's degree in Applied Psychology from Peking University, and her research interests include reading development, learning processes, and educational interventions. Welcome, Yulu!",
  },
  {
    id: 'news-26-3',
    code: 'News_26_3',
    date: 'September 1, 2026',
    category: 'New Positions & Admissions',
    where: 'Sungkyunkwan University',
    who: 'Seohyeon',
    content:
      'Congratulations to Seohyeon, who has joined the department of Child Psychology & Education at Sungkyunkwan University (SKKU) as an assistant professor! We wish her all the best in her new faculty role.',
  },
  {
    id: 'news-26-9',
    code: 'News_26_9',
    date: 'September 1, 2026',
    category: 'Grants & Fellowships',
    where: 'UMN',
    who: 'Yulu',
    content:
      'Yulu was awarded two fellowships at UMN: the Grants to Advance Graduate Education (GAGE) Fellowship and the Provost Enhancement Fellowship. Congratulations, Yulu!',
  },
  {
    id: 'news-26-2',
    code: 'News_26_2',
    date: 'August 2026',
    category: 'New Positions & Admissions',
    where: 'Japan',
    who: 'Christopher',
    content:
      'Christopher graduated this past spring and has started a teaching position in Japan. Congratulations, Christopher!',
  },
  {
    id: 'news-26-5',
    code: 'News_26_5',
    date: 'July 31, 2026',
    category: 'Presentations & Conferences',
    where: 'ST&D',
    who: 'YooJeong',
    content:
      'YooJeong shared a research presentation titled: “The Effect of Lateral Reading on Elementary Students\' Evaluation of Credibility on Digital Information” at The Society for Text & Discourse.',
    photos: ['./assets/news_photo/web/News_26_5.jpg'],
    relatedProject: 'Lateral Reading',
  },
  {
    id: 'news-26-boeck',
    code: 'News_26_Boeck',
    date: 'April 20, 2026',
    category: 'Grants & Fellowships',
    where: 'UMN',
    who: 'YooJeong',
    content:
      'The Marjorie Ann Boeck Memorial Fellowship supports one graduate student who contributes to community-based international research or experiences that demonstrates a strong commitment to global engagement. The award aims to advance and support scholarship that is collaborative, community-centered, and internationally engaged.',
    relatedProject: 'Supporting AI Literacy within Content-Rich Literacy Instruction (CLAP)',
  },
];
