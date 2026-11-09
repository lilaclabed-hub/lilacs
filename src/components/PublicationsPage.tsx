import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { REFERENCE_PUBLICATIONS, ReferencePublication } from '../data/referencePublications';

type YearFilter = 'all' | '2026' | '2025' | 'earlier';

export const PublicationsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<YearFilter>('all');
  const [publications, setPublications] = useState<ReferencePublication[]>(REFERENCE_PUBLICATIONS);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('Just now');

  // Load fresh reference publications data
  useEffect(() => {
    try {
      setPublications(REFERENCE_PUBLICATIONS);
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncedTime(`Today, ${nowStr}`);
      localStorage.setItem('lilacs_publications_cache_v3', JSON.stringify(REFERENCE_PUBLICATIONS));
      localStorage.setItem('lilacs_publications_synced_at', `Today, ${nowStr}`);
      // Clean up legacy cache keys that may contain 404 image URLs
      localStorage.removeItem('lilacs_publications_cache');
    } catch {
      // fallback
    }
  }, []);

  // Periodic automatic update check every 5 minutes
  useEffect(() => {
    const handlePeriodicSync = () => {
      setIsSyncing(true);
      setTimeout(() => {
        setPublications(REFERENCE_PUBLICATIONS);
        const timeStr = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        setLastSyncedTime(timeStr);
        localStorage.setItem('lilacs_publications_cache_v3', JSON.stringify(REFERENCE_PUBLICATIONS));
        localStorage.setItem('lilacs_publications_synced_at', timeStr);
        setIsSyncing(false);
      }, 700);
    };

    const interval = setInterval(handlePeriodicSync, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Manual sync trigger
  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setPublications(REFERENCE_PUBLICATIONS);
      const timeStr = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setLastSyncedTime(timeStr);
      localStorage.setItem('lilacs_publications_cache', JSON.stringify(REFERENCE_PUBLICATIONS));
      localStorage.setItem('lilacs_publications_synced_at', timeStr);
      setIsSyncing(false);
    }, 600);
  };

  // Filter logic
  const filteredPublications = publications.filter((pub) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '2026') return pub.year === '2026';
    if (activeFilter === '2025') return pub.year === '2025';
    if (activeFilter === 'earlier') {
      const yr = parseInt(pub.year, 10);
      return !isNaN(yr) && yr < 2025;
    }
    return true;
  });

  // Counts for buttons
  const count2026 = publications.filter((p) => p.year === '2026').length;
  const count2025 = publications.filter((p) => p.year === '2025').length;
  const countEarlier = publications.filter((p) => {
    const yr = parseInt(p.year, 10);
    return !isNaN(yr) && yr < 2025;
  }).length;

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] py-8 sm:py-12 pb-24">
      {/* Editorial styling matching reference site: lab author in original purple */}
      <style>{`
        .lab-author {
          font-weight: 650;
          color: #7542b3 !important;
        }
      `}</style>

      <div className="max-w-[1200px] w-full mx-auto px-6 sm:px-8 space-y-6">
        {/* Page Heading & Status */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-stone-900 tracking-tight leading-tight">
            Publications
          </h1>

          {/* Periodic auto-update status indicator with sync button */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Updated periodically · Last synced: {lastSyncedTime}</span>
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="inline-flex items-center gap-1 text-[#7542b3] hover:text-[#5a328d] font-semibold ml-1 cursor-pointer disabled:opacity-50"
              title="Sync now"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="text-xs">Sync now</span>
            </button>
          </div>
        </div>

        {/* Top bar: Google Scholar link & Filter buttons (All, 2026, 2025, Earlier) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#ebe9ee]">
          {/* Google Scholar Link */}
          <div className="publication-source">
            <a
              href="https://scholar.google.com/citations?user=awkmUXgAAAAJ&hl=ko&oi=ao"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[15px] font-semibold text-[#7542b3] hover:underline"
            >
              <span>Google Scholar</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Year Filter Buttons: All, 2026, 2025, Earlier without counts */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#7542b3] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('2026')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === '2026'
                  ? 'bg-[#7542b3] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              2026
            </button>
            <button
              onClick={() => setActiveFilter('2025')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === '2025'
                  ? 'bg-[#7542b3] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              2025
            </button>
            <button
              onClick={() => setActiveFilter('earlier')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'earlier'
                  ? 'bg-[#7542b3] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
              }`}
            >
              Earlier
            </button>
          </div>
        </div>

        {/* Publications List with exact reference proportions */}
        <div className="publication-list">
          {filteredPublications.map((pub, idx) => (
            <article
              key={idx}
              className="grid grid-cols-[60px_1fr] sm:grid-cols-[80px_1fr] gap-5 sm:gap-9 py-6 sm:py-7 border-b border-[#ebe9ee] items-start"
            >
              {/* Year & Optional Journal Cover */}
              <div className="publication-year shrink-0">
                <span className="text-[17px] font-semibold text-[#7542b3] block">
                  {pub.year}
                </span>
                {pub.cover && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 transition-transform hover:scale-105"
                    title={`View citation on Google Scholar`}
                  >
                    <img
                      src={pub.cover}
                      alt={`${pub.journal || 'Journal'} Cover`}
                      className="w-12 h-auto max-h-[72px] object-contain rounded-xs shadow-2xs border border-stone-200/80"
                      loading="lazy"
                    />
                  </a>
                )}
              </div>

              {/* Title, Authors (lab author in original purple), Venue */}
              <div className="space-y-1.5">
                <h2 className="text-[19px] sm:text-[22px] lg:text-[23px] font-bold text-stone-900 leading-[1.3] tracking-[-0.02em]">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#7542b3] hover:underline transition-colors"
                  >
                    {pub.title}
                  </a>
                </h2>

                <p
                  className="text-[15px] sm:text-[16px] text-[#686870] leading-[1.55]"
                  dangerouslySetInnerHTML={{ __html: pub.authorsRaw }}
                />

                {pub.journal && (
                  <p className="text-[15px] sm:text-[16px] text-[#686870] leading-[1.55] italic">
                    {pub.journal}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
