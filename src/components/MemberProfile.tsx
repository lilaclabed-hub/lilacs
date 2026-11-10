import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TEAM_MEMBERS } from '../data/labData';

export const MemberProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const member = TEAM_MEMBERS.find((m) => m.id === id) || TEAM_MEMBERS[0];

  // Helper for project links matching the reference site
  const renderProjectItem = (proj: string, idx: number) => {
    let href = '';
    let isExternal = false;

    if (proj.includes('Inference Galaxy') || proj.includes('inference-making using educational technology')) {
      href = 'https://inferencegalaxy.com/';
      isExternal = true;
    } else if (proj.includes('RAISE Learning') || proj.includes('Knowledge revision')) {
      href = '/research#knowledge-revision-raise';
    } else if (proj.includes('Lateral reading')) {
      href = '/research#lateral-reading';
    } else if (proj.includes('Standards of Coherence')) {
      href = '/research#standards-of-coherence';
    } else if (proj.includes('CLAP') || proj.includes('AI literacy')) {
      href = '/research#ai-literacy-clap';
    } else if (proj.includes('digital reading comprehension')) {
      href = '/research#heterogeneity-literacy-language';
    }

    if (href) {
      if (isExternal) {
        return (
          <li key={idx}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7542b3] hover:underline inline"
            >
              {proj}{' '}
              <span aria-hidden="true" className="inline-block whitespace-nowrap text-sm">
                ↗
              </span>
            </a>
          </li>
        );
      }
      return (
        <li key={idx}>
          <Link
            to={href}
            className="text-[#7542b3] hover:underline inline"
          >
            {proj}{' '}
            <span aria-hidden="true" className="inline-block whitespace-nowrap text-sm">
              ↗
            </span>
          </Link>
        </li>
      );
    }

    return <li key={idx}>{proj}</li>;
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] py-6 sm:py-10 pb-24">
      {/* Editorial styles matching https://lilac-lab.fancy-luck-4584.chatgpt.site/ exactly */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Breadcrumb: ← All people */}
        <div className="pt-2 pb-6">
          <button
            onClick={() => navigate('/team')}
            className="inline-flex items-center gap-1.5 text-[15px] sm:text-[17px] font-medium text-[#7542b3] hover:underline cursor-pointer"
          >
            <span>← All people</span>
          </button>
        </div>

        {/* Profile Article */}
        <article className="grid grid-cols-[clamp(140px,17vw,210px)_minmax(0,1fr)] max-[760px]:grid-cols-[110px_minmax(0,1fr)] items-start gap-x-8 sm:gap-x-9 gap-y-6 pt-2 pb-10">
          {/* Profile Photo with exact reference cropping (aspect-ratio: 4 / 4.6, center 35%) */}
          <div className="profile-photo shrink-0">
            <img
              src={member.photo}
              alt={member.name}
              className="w-full object-cover rounded-2xl block border border-stone-200/80 shadow-2xs"
              style={{
                aspectRatio: '4 / 4.6',
                objectPosition: member.photoPosition || (member.id === 'yoojeong-son' ? '35% 35%' : 'center 35%'),
              }}
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Profile Body */}
          <div className="profile-body space-y-2">
            <p className="text-[14px] sm:text-[15px] font-semibold tracking-[0.015em] text-[#626269] m-0">
              {member.role}
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1d1d1f] tracking-tight leading-tight m-0">
              {member.name}
            </h1>

            {/* Email address directly under the name */}
            <div className="profile-links flex flex-wrap gap-x-6 gap-y-2 items-center pt-1.5 pb-2">
              {member.id === 'hyejin-hwang' && (
                <a
                  href="https://edpsych.umn.edu/hyejin-hwang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7542b3] font-medium hover:underline inline-flex items-center gap-1 text-[15px] sm:text-[16px]"
                >
                  <span>University profile</span>
                  <span aria-hidden="true" className="text-sm">↗</span>
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="text-[#7542b3] font-medium hover:underline inline-flex items-center gap-1 text-[15px] sm:text-[16px]"
                >
                  <span>{member.email}</span>
                  <span aria-hidden="true" className="text-sm">↗</span>
                </a>
              )}
            </div>

            {/* Profile Focus Quote */}
            <p className="text-[18px] sm:text-[20px] lg:text-[21px] leading-[1.45] font-medium tracking-[-0.02em] text-[#45414b] pt-1">
              {member.id === 'hyejin-hwang' ? member.oneSentence : `“${member.oneSentence}”`}
            </p>

            {/* Bio paragraph if present */}
            {member.bio && (
              <p className="text-[16px] sm:text-[17px] leading-[1.6] text-[#1d1d1f] pt-1">
                {member.bio}
              </p>
            )}
          </div>

          {/* Profile Details: 2 columns for Research Interests and Current Projects */}
          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-x-9 gap-y-6 items-start">
            {/* Research interests */}
            <section className="research-interests space-y-2 border-t border-[#dedee3] pt-4">
              <h2 className="text-[21px] sm:text-[22px] font-bold text-[#1d1d1f] m-0">
                Research interests
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-[16px] leading-[1.6] text-[#1d1d1f]">
                {member.researchInterests.map((interest, idx) => (
                  <li key={idx}>{interest}</li>
                ))}
              </ul>
            </section>

            {/* Current projects */}
            <section className="space-y-2 border-t border-[#dedee3] pt-4">
              <h2 className="text-[21px] sm:text-[22px] font-bold text-[#1d1d1f] m-0">
                Current projects
              </h2>
              {member.id === 'hyejin-hwang' ? (
                <div>
                  <Link
                    to="/research"
                    className="text-[#7542b3] hover:underline inline-flex items-center gap-1 text-[16px] font-medium"
                  >
                    <span>See the research project page</span>
                    <span aria-hidden="true" className="text-sm">↗</span>
                  </Link>
                </div>
              ) : (
                <ul className="list-disc pl-5 space-y-1.5 text-[16px] leading-[1.6] text-[#1d1d1f]">
                  {member.currentProjects.map((proj, idx) => renderProjectItem(proj, idx))}
                </ul>
              )}
            </section>

            {/* Skill / Languages section for Jianjian Wu */}
            {member.skills && (
              <section className="col-span-full pt-4 border-t border-[#dedee3] space-y-2">
                <h2 className="text-[21px] sm:text-[22px] font-bold text-[#1d1d1f] m-0">
                  Skill
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#1d1d1f] whitespace-pre-line">
                  {member.skills}
                </p>
              </section>
            )}
          </div>

          {/* Extended Teaching & Advising Sections for Dr. HyeJin Hwang */}
          {member.id === 'hyejin-hwang' && (
            <>
              <section className="col-span-full pt-4 border-t border-[#dedee3] space-y-2">
                <h2 className="text-[21px] sm:text-[22px] font-bold text-[#1d1d1f] m-0">
                  Teaching
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-[16px] leading-[1.6] text-[#1d1d1f]">
                  <li>
                    EPSY 5001 Learning, Cognition, Assessment (undergraduate course for preservice teachers)
                  </li>
                  <li>
                    EPSY 5216 Introduction to Research in Educational Psychology and Human Development (research methods course for graduate students)
                  </li>
                  <li>
                    EPSY 8116 Reading for Meaning: Cognitive Processes in the Comprehension of Texts (doctoral seminar course)
                  </li>
                </ul>
              </section>

              <section className="col-span-full pt-4 border-t border-[#dedee3] space-y-4" id="advising">
                <h2 className="text-[21px] sm:text-[22px] font-bold text-[#1d1d1f] m-0">
                  Advising and mentoring
                </h2>

                <p className="text-[16px] leading-[1.6] text-[#1d1d1f]">
                  Advising and mentoring are critical components of my work. I view advising and mentoring as opportunities to grow together with advisees/mentees as scholars and human beings. I recognize my power and privilege that come from being an able-bodied, cis-gendered, Western-educated, English-speaking person, as well as from being a faculty member at a university.
                </p>

                <p className="text-[16px] leading-[1.6] text-[#1d1d1f] font-semibold">
                  To maximize your achievement and our collaborative learning, I have the following commitments to you as my student:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-[16px] leading-[1.6] text-[#1d1d1f]">
                  <li>Cultivating a safe lab environment that values intellectual humility</li>
                  <li>Maintaining honest and respectful communication in a timely manner</li>
                  <li>Providing explicit guidelines and individualized scaffolding to support you in achieving your goals and program milestones</li>
                  <li>Unpacking hidden curricula in academia and research</li>
                </ul>

                <p className="text-[16px] leading-[1.6] text-[#1d1d1f] font-semibold">
                  To maximize your achievement and our collaborative learning, I expect following things from you as my student:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-[16px] leading-[1.6] text-[#1d1d1f]">
                  <li>Aligned Research Interests: A commitment to research inquiry that aligns closely with the lab’s core focus areas</li>
                  <li>Intellectual humility – It helps us continuously learn from various perspectives and different types of feedback.</li>
                  <li>Honest and respectful communication in a timely manner</li>
                  <li>Proactive planning: Expect that we will start strategic goal setting and step-by-step planning early in your program and continue this practice at the beginning of each semester.</li>
                </ul>
              </section>
            </>
          )}

          {/* Life outside work at the bottom matching reference site */}
          <div className="col-span-full pt-4 border-t border-[#dedee3]">
            <section className="space-y-2">
              <h2 className="text-[21px] sm:text-[22px] font-bold text-[#1d1d1f] m-0">
                Life outside work
              </h2>
              <p className="text-[16px] leading-[1.6] text-[#1d1d1f]">
                {member.lifeOutsideWork}
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};
