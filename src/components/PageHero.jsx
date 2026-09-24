/**
 * PageHero
 *
 * Reusable dark hero band used at the top of interior pages (Subjects,
 * Services, About, How It Works, FAQ, Contact, etc.).
 *
 * Renders an optional background image behind a navy overlay, with a
 * small eyebrow line, a large title, and a lead paragraph on top.
 *
 * Background image is passed as a CSS custom property (--page-hero-bg)
 * so the CSS can layer it above a gradient fallback — no ::before
 * pseudo-element tricks, no z-index conflicts.
 *
 * @param {Object}  props
 * @param {string}  [props.eyebrow]          Small uppercase label above the title
 * @param {string}   props.title             Main page title (required)
 * @param {string}  [props.lead]             Short paragraph below the title
 * @param {string}  [props.backgroundImage]  URL of the background photo
 * @param {'left'|'center'} [props.align]    Text alignment (default: 'left')
 * @param {string}  [props.className]        Extra class names on the section
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  backgroundImage,
  align = 'center',
  className = '',
}) {
  const sectionClasses = [
    'page-hero',
    backgroundImage ? 'page-hero-bg' : '',
    align === 'center' ? 'page-hero--center' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style = backgroundImage
    ? { '--page-hero-bg': `url(${backgroundImage})` }
    : undefined;

  return (
    <section className={sectionClasses} style={style}>
      <div className="page-hero-overlay" aria-hidden="true" />
      <div className="container page-hero-inner">
        {eyebrow && <p className="page-hero-eyebrow">{eyebrow}</p>}
        <h1 className="page-hero-title">{title}</h1>
        {lead && <p className="page-hero-lead">{lead}</p>}
      </div>
    </section>
  );
}