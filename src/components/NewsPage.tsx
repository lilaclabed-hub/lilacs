import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  ArrowRight,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { NEWS_ITEMS, NewsItem } from '../data/labData';

const CATEGORIES = [
  'All',
  'Presentations & Conferences',
  'Grants & Fellowships',
  'New Positions & Admissions',
  'Other Updates',
] as const;

type CategoryType = (typeof CATEGORIES)[number];

export const NewsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    caption: string;
    allPhotos?: string[];
    currentIndex?: number;
  } | null>(null);

  const filteredItems =
    activeCategory === 'All'
      ? NEWS_ITEMS
      : activeCategory === 'New Positions & Admissions'
      ? NEWS_ITEMS.filter(
          (item) =>
            item.category === 'New Positions & Admissions' ||
            item.category === 'New Lab Members'
        )
      : NEWS_ITEMS.filter((item) => item.category === activeCategory);

  const getCategoryCount = (cat: CategoryType) => {
    if (cat === 'All') return NEWS_ITEMS.length;
    if (cat === 'New Positions & Admissions') {
      return NEWS_ITEMS.filter(
        (item) =>
          item.category === 'New Positions & Admissions' ||
          item.category === 'New Lab Members'
      ).length;
    }
    return NEWS_ITEMS.filter((item) => item.category === cat).length;
  };

  const openLightbox = (photos: string[], index: number, caption: string) => {
    setSelectedPhoto({
      url: photos[index],
      caption,
      allPhotos: photos,
      currentIndex: index,
    });
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto || !selectedPhoto.allPhotos || selectedPhoto.currentIndex === undefined) return;
    const prevIndex =
      (selectedPhoto.currentIndex - 1 + selectedPhoto.allPhotos.length) % selectedPhoto.allPhotos.length;
    setSelectedPhoto({
      ...selectedPhoto,
      url: selectedPhoto.allPhotos[prevIndex],
      currentIndex: prevIndex,
    });
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto || !selectedPhoto.allPhotos || selectedPhoto.currentIndex === undefined) return;
    const nextIndex = (selectedPhoto.currentIndex + 1) % selectedPhoto.allPhotos.length;
    setSelectedPhoto({
      ...selectedPhoto,
      url: selectedPhoto.allPhotos[nextIndex],
      currentIndex: nextIndex,
    });
  };

  // Helper to format 'who' cleanly if just first name
  const formatWho = (who: string) => {
    if (who === 'HyeJin' || who === 'Dr. Hwang') return 'HyeJin Hwang';
    if (who === 'YooJeong') return 'YooJeong Son';
    if (who === 'Yulu') return 'Yulu Sun';
    if (who === 'Jianjian') return 'Jianjian Wu';
    if (who === 'Kiera') return 'Kiera Rosenberg';
    if (who === 'Seohyeon') return 'Seohyeon Choi';
    if (who === 'Christopher') return 'Christopher Blommel';
    return who;
  };

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] py-10 sm:py-14 lg:py-16">
      <div className="w-[min(1280px,calc(100%-48px))] max-w-[1200px] mx-auto space-y-8 sm:space-y-10">
        {/* Header */}
        <div className="space-y-2 pb-2">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#1d1d1f]">
            Lab News
          </h1>
          <p className="text-stone-600 text-base sm:text-lg font-normal max-w-3xl">
            Recent updates on research presentations, fellowships, publications, and members of the LILACS Lab at the University of Minnesota.
          </p>
        </div>

        {/* Compact Category Filter Buttons (smaller size matching reference) */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = getCategoryCount(cat);

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all cursor-pointer flex items-center gap-1.5 select-none"
                style={
                  isActive
                    ? { backgroundColor: '#62417d', color: '#ffffff', boxShadow: '0 2px 6px rgba(98, 65, 125, 0.2)' }
                    : { backgroundColor: '#ffffff', color: '#53316f', border: '1px solid #ccc0d4' }
                }
              >
                <span>{cat}</span>
                <span
                  className="px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-mono"
                  style={
                    isActive
                      ? { backgroundColor: 'rgba(255, 255, 255, 0.22)', color: '#ffffff' }
                      : { backgroundColor: '#f0eaf7', color: '#62417d' }
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* News Items List - Proportions matching reference site */}
        <div className="border-t border-stone-200">
          {filteredItems.map((item: NewsItem) => {
            const isUrl = item.where && (item.where.startsWith('http://') || item.where.startsWith('https://'));
            const linkUrl = isUrl ? item.where : item.link;

            return (
              <article
                key={item.id}
                className="py-7 sm:py-8 border-b border-stone-200 transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8 items-start">
                  {/* Left Column: Date & Member */}
                  <div className="news-date shrink-0">
                    <p className="text-sm sm:text-[15px] text-stone-500 font-normal">
                      {item.date}
                    </p>
                    <p className="text-sm sm:text-[15px] font-semibold text-[#7542b3] mt-1">
                      {formatWho(item.who)}
                    </p>
                  </div>

                  {/* Right Column: Eyebrow, Where with purple line, Copy verbatim, Photos */}
                  <div className="space-y-2.5">
                    {/* Eyebrow badge */}
                    <div className="text-xs sm:text-[13px] font-medium text-stone-500">
                      {item.category === 'New Lab Members' ? 'New Positions & Admissions' : item.category}
                    </div>

                    {/* Where Row with vertical purple bar */}
                    {item.where && (
                      <div className="flex items-baseline gap-2.5 text-sm sm:text-base text-stone-800 my-2 pl-2.5 border-l-[3px] border-[#bb9cd4]">
                        <span className="text-xs sm:text-[13px] font-bold text-[#65447e]">Where</span>
                        {linkUrl ? (
                          <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-stone-900 hover:text-[#7542b3] transition-colors break-all inline-flex items-center gap-1 underline underline-offset-2"
                          >
                            <span>{item.where}</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#7542b3]" />
                          </a>
                        ) : (
                          <span className="font-medium text-stone-900">
                            {item.where === 'UMN' ? 'University of Minnesota' : item.where}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Content text verbatim */}
                    <p className="text-stone-800 text-[15px] sm:text-[16px] leading-[1.65] font-normal whitespace-pre-line pt-0.5">
                      {item.content}
                    </p>

                    {/* Attached Photo(s) - Compact refined size */}
                    {item.photos && item.photos.length > 0 && (
                      <div className="pt-2">
                        <div
                          className={`grid gap-2.5 ${
                            item.photos.length > 1
                              ? 'grid-cols-2 max-w-[420px]'
                              : 'grid-cols-1 max-w-[320px]'
                          }`}
                        >
                          {item.photos.map((photoUrl, pIdx) => (
                            <div
                              key={pIdx}
                              onClick={() => openLightbox(item.photos!, pIdx, item.content)}
                              className="group relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 cursor-pointer shadow-xs aspect-[4/3] flex items-center justify-center transition-all hover:shadow-md hover:border-stone-300"
                            >
                              <img
                                src={photoUrl}
                                alt={`${item.who} - ${item.date}`}
                                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-xs text-stone-900 px-3 py-1 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5">
                                  <ZoomIn className="w-3.5 h-3.5 text-[#7542b3]" />
                                  <span>View Photo</span>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Related Links landing directly on the exact project */}
                    {item.relatedProject && (() => {
                      const lower = item.relatedProject.toLowerCase();
                      let hash = 'standards-of-coherence';
                      if (lower.includes('clap') || lower.includes('ai literacy')) hash = 'ai-literacy';
                      else if (lower.includes('lateral reading')) hash = 'lateral-reading';
                      else if (lower.includes('raise') || lower.includes('knowledge revision')) hash = 'raise-learning';
                      else if (lower.includes('inference')) hash = 'inference-galaxy';
                      else if (lower.includes('heterogeneity') || lower.includes('systematic review')) hash = 'literacy-language-development';

                      return (
                        <div className="pt-2">
                          <Link
                            to={`/research#${hash}`}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7542b3] hover:underline group cursor-pointer"
                          >
                            <span>Related Project: {item.relatedProject}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons if multiple photos */}
            {selectedPhoto.allPhotos && selectedPhoto.allPhotos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all cursor-pointer z-10"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white bg-black/50 hover:bg-black/70 rounded-full transition-all cursor-pointer z-10"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image display */}
            <div className="w-full flex items-center justify-center overflow-hidden rounded-2xl bg-black/40">
              <img
                src={selectedPhoto.url}
                alt="Enlarged news event"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Caption */}
            {selectedPhoto.caption && (
              <p className="mt-4 text-stone-200 text-sm sm:text-base text-center max-w-2xl px-4 line-clamp-2">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
