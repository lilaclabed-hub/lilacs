import React from 'react';
import { Link } from 'react-router-dom';

export const MentoringPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] border-b border-stone-200 pb-6">
          Advising and mentoring
        </h1>

        {/* Verbatim content without card/session splits, with large comfortable typography */}
        <div className="space-y-6 text-lg sm:text-xl text-stone-800 leading-relaxed font-normal">
          <p>
            • <strong>Personal statement about advising and mentoring:</strong> Advising and mentoring are critical components of my work. I view advising and mentoring as opportunities to grow together with advisees/mentees as scholars and human beings. I recognize my power and privilege that come from being an able-bodied, cis-gendered, Western-educated, English-speaking person, as well as from being a faculty member at a university.
          </p>

          <div className="space-y-2">
            <p>
              • <strong>To maximize your achievement and our collaborative learning, I have the following commitments to you as my student:</strong>
            </p>
            <ul className="pl-8 space-y-2.5 list-disc text-stone-800">
              <li>Cultivating a safe lab environment that values intellectual humility</li>
              <li>Maintaining honest and respectful communication in a timely manner</li>
              <li>Providing explicit guidelines and individualized scaffolding to support you in achieving your goals and program milestones</li>
              <li>Unpacking hidden curricula in academia and research</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p>
              • <strong>To maximize your achievement and our collaborative learning, I expect following things from you as my student:</strong>
            </p>
            <ul className="pl-8 space-y-2.5 list-disc text-stone-800">
              <li>
                <strong>Aligned Research Interests:</strong> A commitment to research inquiry that aligns closely with the lab’s core focus areas
              </li>
              <li>
                <strong>Intellectual humility</strong> – It helps us continuously learn from various perspectives and different types of feedback.
              </li>
              <li>
                Honest and respectful communication in a timely manner
              </li>
            </ul>
          </div>

          <p>
            • <strong>Proactive planning:</strong> Expect that we will start strategic goal setting and step-by-step planning early in your program and continue this practice at the beginning of each semester.
          </p>
        </div>

        {/* Clean link back to contact */}
        <div className="pt-10 border-t border-stone-200 text-base text-stone-600">
          <Link
            to="/contact"
            className="text-purple-600 hover:text-purple-800 underline underline-offset-4 font-semibold text-lg"
          >
            ← Contact information & prospective graduate students
          </Link>
        </div>
      </div>
    </div>
  );
};
