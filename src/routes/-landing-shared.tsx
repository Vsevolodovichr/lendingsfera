import { ChevronLeft, ChevronRight } from "lucide-react";

export function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{kicker}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export function CarouselControls({
  label,
  active,
  total,
  onPrev,
  onNext,
}: {
  label: string;
  active: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="carousel-bar" aria-label={`${label}: слайд ${active + 1} з ${total}`}>
      <div className="carousel-dots">
        {Array.from({ length: total }).map((_, index) => (
          <span key={index} className={index === active ? "active" : ""} />
        ))}
      </div>
      <div className="carousel-buttons">
        <button type="button" onClick={onPrev} aria-label="Попередній слайд">
          <ChevronLeft />
        </button>
        <button type="button" onClick={onNext} aria-label="Наступний слайд">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
