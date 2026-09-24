import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * SubjectCard
 *
 * Renders a single subject as a card in the subjects listing.
 *
 * @param {Object}   props
 * @param {Object}   props.subject
 * @param {number|string} props.subject.id
 * @param {string}   props.subject.name
 * @param {string}   [props.subject.category]
 * @param {string}   [props.subject.level]
 * @param {string}   [props.subject.description]
 * @param {string[]} [props.subject.topics]
 * @param {number}   [props.subject.price]
 * @param {string}   [props.subject.currency]
 * @param {number}   [props.subject.duration]   // minutes
 * @param {string}   [props.subject.image]      // image URL (imported asset)
 * @param {'brand'|'accent'} [props.subject.accent]
 */
export default function SubjectCard({ subject }) {
  const {
    id,
    name,
    category,
    level,
    description,
    topics = [],
    price,
    currency = 'USD',
    duration,
    image,
    accent = 'brand',
  } = subject;

  // ---- Expand / collapse state ----
  const TOPIC_PREVIEW_COUNT = 3;
  const [expanded, setExpanded] = useState(false);

  const canExpand = topics.length > TOPIC_PREVIEW_COUNT;
  const visibleTopics = expanded
    ? topics
    : topics.slice(0, TOPIC_PREVIEW_COUNT);
  const remainingTopics = topics.length - TOPIC_PREVIEW_COUNT;

  // ---- Price formatting ----
  const priceLabel =
    typeof price === 'number'
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price)
      : null;

  return (
    <article
      className={`subject-listing-card subject-listing-card--${accent}`}
      aria-labelledby={`subject-${id}-title`}
    >
      {/* ---- Image header ---- */}
      {image && (
        <div className="subject-listing-media">
          <img
            src={image}
            alt=""
            className="subject-listing-image"
            loading="lazy"
          />
          {category && (
            <span className="subject-listing-category subject-listing-category--overlay">
              {category}
            </span>
          )}
        </div>
      )}

      {/* ---- Body ---- */}
      <div className="subject-listing-body">
        {!image && category && (
          <span className="subject-listing-category">{category}</span>
        )}

        <h3 id={`subject-${id}-title`} className="subject-listing-name">
          {name}
        </h3>

        {level && <p className="subject-listing-level">{level}</p>}

        {description && (
          <p className="subject-listing-description">{description}</p>
        )}

        {topics.length > 0 && (
          <ul
            className="subject-listing-topics"
            aria-label={`Topics covered in ${name}`}
          >
            {visibleTopics.map((topic) => (
              <li key={topic} className="subject-listing-topic">
                {topic}
              </li>
            ))}

            {canExpand && (
              <li className="subject-listing-topic subject-listing-topic--toggle">
                <button
                  type="button"
                  className="subject-listing-toggle"
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-expanded={expanded}
                  aria-label={
                    expanded
                      ? `Show fewer topics for ${name}`
                      : `Show ${remainingTopics} more topics for ${name}`
                  }
                >
                  {expanded ? 'Show less' : `+${remainingTopics} more`}
                </button>
              </li>
            )}
          </ul>
        )}
      </div>

      {/* ---- Footer ---- */}
      <footer className="subject-listing-foot">
        <div className="subject-listing-meta">
          {priceLabel && (
            <span className="subject-listing-price">
              <strong>{priceLabel}</strong>
              {duration ? <span> / {duration} min</span> : null}
            </span>
          )}
          {!priceLabel && duration && (
            <span className="subject-listing-price">
              <strong>{duration} min</strong>
            </span>
          )}
        </div>

        <Link
          to={`/subjects/${id}`}
          className="subject-listing-link"
          aria-label={`View details for ${name}`}
        >
          View subject
          <span aria-hidden="true"> →</span>
        </Link>
      </footer>
    </article>
  );
}