import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SubjectCard from '../components/SubjectCard';
import PageHero from '../components/PageHero';
import subjectsHeroBg from '../assets/subjects-hero.jpg';

import imgMath from '../assets/subjects/mathematics.jpg';
import imgEnglish from '../assets/subjects/english.jpg';
import imgBiology from '../assets/subjects/biology.jpg';
import imgChemistry from '../assets/subjects/chemistry.jpg';
import imgPhysics from '../assets/subjects/physics.jpg';
import imgLanguage from '../assets/subjects/languages.jpg';
import imgExamPrep from '../assets/subjects/exam-prep.jpg';
import imgStudySkills from '../assets/subjects/study-skills.jpg';



const SUBJECTS = [
  {
    id: 1,
    name: 'Mathematics',
    category: 'Core',
    level: 'Primary · Secondary · Exam Prep',
    description:
      'From number sense to advanced calculus build fluency, reasoning and confidence at every level.',
    topics: [
      'Number & Algebra',
      'Geometry & Trigonometry',
      'Statistics & Probability',
      'Calculus',
      'Problem Solving',
    ],
    
    image: imgMath,
    accent: 'brand',
  },
  {
    id: 2,
    name: 'English Language',
    category: 'Core',
    level: 'Primary · Secondary · Exam Prep',
    description:
      'Reading, writing, comprehension and confident communication for academic and everyday success.',
    topics: [
      'Reading Comprehension',
      'Essay Writing',
      'Grammar & Punctuation',
      'Creative Writing',
      'Oral Communication',
    ],
    
    image: imgEnglish,
    accent: 'accent',
  },
  {
    id: 3,
    name: 'Biology',
    category: 'Sciences',
    level: 'Secondary · Exam Prep',
    description:
      'Cells, systems, genetics and ecology taught with real-world examples and exam-focused practice.',
    topics: [
      'Cell Biology',
      'Human Physiology',
      'Genetics & Evolution',
      'Ecology',
      'Practical Skills',
    ],
    
    image: imgBiology,
    accent: 'brand',
  },
  {
    id: 4,
    name: 'Chemistry',
    category: 'Sciences',
    level: 'Secondary · Exam Prep',
    description:
      'Physical, organic and inorganic chemistry made clear through structured problem-solving.',
    topics: [
      'Atomic Structure',
      'Chemical Reactions',
      'Organic Chemistry',
      'Acids & Bases',
      'Lab Techniques',
    ],
    
    image: imgChemistry,
    accent: 'brand',
  },
  {
    id: 5,
    name: 'Physics',
    category: 'Sciences',
    level: 'Secondary · Exam Prep',
    description:
      'Mechanics, electricity, waves and modern physics strong conceptual grounding with applied practice.',
    topics: [
      'Mechanics',
      'Electricity & Magnetism',
      'Waves & Optics',
      'Thermodynamics',
      'Modern Physics',
    ],
   
    image: imgPhysics,
    accent: 'brand',
  },
  {
    id: 6,
    name: 'French',
    category: 'Languages',
    level: 'Beginner · Intermediate · Exam Prep',
    description:
      'Conversation, grammar and culture build fluency step by step with a native-level tutor.',
    topics: [
      'Conversation',
      'Grammar & Vocabulary',
      'Reading & Writing',
      'Listening Skills',
      'Cultural Context',
    ],
    
    image: imgLanguage,
    accent: 'accent',
  },
  {
    id: 7,
    name: 'Exam Preparation',
    category: 'Exam Prep',
    level: 'WAEC · JAMB · IGCSE · SAT · 11+',
    description:
      'Targeted revision, past-paper practice and exam technique coaching across major international exams.',
    topics: [
      'Past Paper Practice',
      'Exam Technique',
      'Time Management',
      'Revision Planning',
      'Mock Exams',
    ],
   
    image: imgExamPrep,
    accent: 'accent',
  },
  {
    id: 8,
    name: 'Study Skills',
    category: 'Enrichment',
    level: 'All ages',
    description:
      'Note-taking, time management, memory techniques and exam-stress strategies for lifelong learners.',
    topics: [
      'Note-Taking Methods',
      'Time Management',
      'Memory Techniques',
      'Focus & Motivation',
      'Exam Stress Strategies',
    ],
    
    image: imgStudySkills,
    accent: 'brand',
  },
];

const ALL_CATEGORIES = 'All';

export default function Subjects() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL_CATEGORIES);

  // Derive the list of categories from the data — stays in sync automatically
  const categories = useMemo(() => {
    const unique = new Set(SUBJECTS.map((s) => s.category).filter(Boolean));
    return [ALL_CATEGORIES, ...Array.from(unique)];
  }, []);

  // Filter the list based on the search term and selected category
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return SUBJECTS.filter((s) => {
      const matchesCategory =
        category === ALL_CATEGORIES || s.category === category;

      if (!matchesCategory) return false;
      if (!term) return true;

      const haystack = [
        s.name,
        s.category,
        s.level,
        s.description,
        ...(s.topics ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [search, category]);

  const hasResults = filtered.length > 0;
  const isFiltering =
    search.trim().length > 0 || category !== ALL_CATEGORIES;

  return (
    <>
      {/* ============ PAGE HERO ============ */}
        <PageHero
          eyebrow="What we teach"
          title="Every subject your child needs, taught one-to-one online"
          lead="Core academics, sciences, languages and exam preparation taught one-to-one by qualified tutors, online, for students anywhere in the world."
          backgroundImage={subjectsHeroBg}
        />

      {/* ============ TOOLBAR: SEARCH + FILTERS ============ */}
      <section className="subjects-toolbar">
        <div className="container">
          <div className="subjects-toolbar-row">
            <label className="subjects-search" htmlFor="subject-search">
              <span className="subjects-search-icon" aria-hidden="true">
                🔍
              </span>
              <span className="visually-hidden">Search subjects</span>
              <input
                id="subject-search"
                type="search"
                placeholder="Search subjects, topics or exams…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </label>

            <div
              className="subjects-filters"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((cat) => {
                const isActive = cat === category;
                return (
                  <button
                    key={cat}
                    type="button"
                    className={
                      'subjects-filter' +
                      (isActive ? ' subjects-filter--active' : '')
                    }
                    aria-pressed={isActive}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count — screen readers announce this politely */}
          <p className="subjects-count" aria-live="polite">
            {hasResults
              ? `Showing ${filtered.length} ${
                  filtered.length === 1 ? 'subject' : 'subjects'
                }${isFiltering ? ' matching your filters' : ''}`
              : 'No subjects match your search'}
          </p>
        </div>
      </section>

      {/* ============ GRID ============ */}
      <section className="section subjects-section">
        <div className="container">
          {hasResults ? (
            <div className="subjects-grid">
              {filtered.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          ) : (
            <div className="subjects-empty">
              <span className="subjects-empty-icon" aria-hidden="true">
                🔍
              </span>
              <h2 className="subjects-empty-title">
                No subjects found
              </h2>
              <p className="subjects-empty-text">
                We couldn&apos;t find anything matching your search. Try a
                different term, or clear the filters to see everything.
              </p>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => {
                  setSearch('');
                  setCategory(ALL_CATEGORIES);
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="section section-cta bg-light">
        <div className="container">
          <div className="cta-box text-center">
            <h2 className="cta-title">
              Not sure which subject is the right fit?
            </h2>
            <p className="cta-lead">
              Book a free consultation — we&apos;ll discuss your child&apos;s
              goals and recommend the best starting point.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <Link to="/booking" className="btn btn-primary btn-lg">
                Book a Session
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg">
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}