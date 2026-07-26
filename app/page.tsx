"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  siteContent,
  type WorkCategory,
} from "../content/siteContent";

type Project = (typeof siteContent.projects)[number];

function TextLines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, index) => (
    <span key={line}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
}

function ProjectCard({ project }: { project: Project }) {
  const [workOpen, setWorkOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const labels = siteContent.work;

  useEffect(() => {
    if (
      !workOpen ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % project.images.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [project.images.length, workOpen]);

  const changeSlide = (direction: number) => {
    setSlideIndex(
      (current) =>
        (current + direction + project.images.length) % project.images.length,
    );
  };

  return (
    <details
      className="work-card"
      onToggle={(event) => setWorkOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="work-thumbnail">
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            width={260}
            height={260}
            sizes="(max-width: 600px) 92px, 148px"
          />
        </span>
        <span className="work-summary-copy">
          <span className="eyebrow warm">
            {project.categoryLabel} / {project.year}
          </span>
          <strong>{project.title}</strong>
          <small>{project.subtitle}</small>
        </span>
        <span className="work-toggle" aria-hidden="true">
          <span className="open-label">{labels.openLabel}</span>
          <span className="close-label">{labels.closeLabel}</span>
          <b>＋</b>
        </span>
      </summary>

      <div className="work-details">
        <div className="project-intro">
          <p>{project.description}</p>
          <dl>
            {project.meta.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="image-slider" aria-label={project.galleryLabel}>
          <div className="slide-stage">
            {project.images.map((image, index) => (
              <Image
                key={image.src}
                className={index === slideIndex ? "slide active" : "slide"}
                src={image.src}
                alt={image.alt}
                width={1800}
                height={1013}
                sizes="(max-width: 900px) 100vw, 1344px"
                aria-hidden={index !== slideIndex}
              />
            ))}
            <button
              className="slider-arrow slider-prev"
              type="button"
              onClick={() => changeSlide(-1)}
              aria-label={labels.previousImageLabel}
            >
              ←
            </button>
            <button
              className="slider-arrow slider-next"
              type="button"
              onClick={() => changeSlide(1)}
              aria-label={labels.nextImageLabel}
            >
              →
            </button>
            <span className="slide-count" aria-live="polite">
              {String(slideIndex + 1).padStart(2, "0")} /{" "}
              {String(project.images.length).padStart(2, "0")}
            </span>
          </div>
          <div className="slider-dots" aria-label={labels.imageSelectorLabel}>
            {project.images.map((image, index) => (
              <button
                key={image.src}
                className={index === slideIndex ? "active" : ""}
                type="button"
                onClick={() => setSlideIndex(index)}
                aria-label={`${index + 1}${labels.imageButtonSuffix}`}
                aria-current={index === slideIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        <div className="scope-compact">
          <p className="eyebrow">{project.scopeLabel}</p>
          <ul>
            {project.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="product-strip">
          <div>
            <p className="eyebrow warm">{project.product.label}</p>
            <h3>{project.product.title}</h3>
          </div>
          <p>{project.product.description}</p>
          <div className="product-actions">
            <a
              className="button button-light"
              href={siteContent.links.booth}
              target="_blank"
              rel="noreferrer"
            >
              {project.product.primaryButton} <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-link"
              href={siteContent.links.sampleWorld}
              target="_blank"
              rel="noreferrer"
            >
              {project.product.secondaryButton}{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </details>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] =
    useState<WorkCategory>("environment");
  const content = siteContent;
  const filteredProjects = useMemo(
    () =>
      content.projects.filter(
        (project) => project.category === activeCategory,
      ),
    [activeCategory, content.projects],
  );
  const activeCategoryContent = content.work.categories.find(
    (category) => category.id === activeCategory,
  );
  const acceptingCommissions = content.commission.status.accepting;
  const contactTitleLines = acceptingCommissions
    ? content.contact.titleLines
    : content.commission.status.closedContactTitleLines;
  const contactNoteLines = acceptingCommissions
    ? content.contact.noteLines
    : content.commission.status.closedContactNoteLines;
  const contactUrl = `mailto:${content.contact.email}?subject=${encodeURIComponent(
    content.contact.emailSubject,
  )}&body=${encodeURIComponent(content.contact.emailTemplate)}`;

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label={content.brand.homeLabel}
        >
          <span className="brand-symbol" aria-hidden="true">
            <Image
              src={content.brand.logo}
              alt=""
              width={600}
              height={600}
              priority
            />
          </span>
          <span>
            {content.brand.name}
            <small>{content.brand.creatorName}</small>
          </span>
        </a>
        <nav aria-label={content.navigation.label}>
          {content.navigation.items.map((item) => (
            <a
              key={item.href}
              className={
                "emphasized" in item && item.emphasized
                  ? "nav-contact"
                  : undefined
              }
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="top">
        <Image
          className="hero-image"
          src={content.hero.image}
          alt={content.hero.imageAlt}
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1>
            <TextLines lines={content.hero.titleLines} />
          </h1>
          <p className="hero-copy">
            <TextLines lines={content.hero.copyLines} />
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              {content.hero.workButton} <span aria-hidden="true">↘</span>
            </a>
            <a
              className="button button-ghost"
              href={content.links.booth}
              target="_blank"
              rel="noreferrer"
            >
              {content.hero.boothButton} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>{content.hero.featuredLabel}</span>
          <strong>{content.hero.featuredNumber}</strong>
        </div>
        <a className="scroll-cue" href="#work">
          {content.hero.scrollLabel} <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="works section-shell" id="work">
        <div className="section-label">
          <span>{content.work.sectionLabel}</span>
          <span>
            {String(filteredProjects.length).padStart(2, "0")}{" "}
            {filteredProjects.length === 1
              ? content.work.projectSingular
              : content.work.projectPlural}
          </span>
        </div>

        <div
          className="work-categories"
          role="tablist"
          aria-label={content.work.categoriesLabel}
        >
          {content.work.categories.map((category) => {
            const count = content.projects.filter(
              (project) => project.category === category.id,
            ).length;
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                className={isActive ? "active" : ""}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
              >
                <span>{category.label}</span>
                <small>{String(count).padStart(2, "0")}</small>
              </button>
            );
          })}
        </div>

        <div className="work-list" role="tabpanel">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="work-empty">{activeCategoryContent?.emptyMessage}</p>
          )}
        </div>
      </section>

      <section
        className={`services section-shell ${
          acceptingCommissions ? "is-open" : "is-closed"
        }`}
        id="services"
      >
        <div className="section-label">
          <span>{content.commission.sectionLabel}</span>
          <span className="commission-status">
            <i aria-hidden="true" />
            {acceptingCommissions
              ? content.commission.status.openLabel
              : content.commission.status.closedLabel}
          </span>
        </div>
        {!acceptingCommissions && (
          <aside className="commission-closed-notice" role="status">
            <span className="notice-mark" aria-hidden="true">
              ×
            </span>
            <div>
              <p>{content.commission.status.closedNoticeLabel}</p>
              <h3>{content.commission.status.closedNoticeTitle}</h3>
              <span>
                {content.commission.status.closedNoticeDescription}
              </span>
            </div>
          </aside>
        )}
        <div className="services-heading">
          <h2>{content.commission.title}</h2>
          <p>{content.commission.description}</p>
        </div>
        <div className="service-list">
          {content.commission.services.map((service) => (
            <article key={service.number}>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <strong>{service.price}</strong>
            </article>
          ))}
        </div>
        <p className="price-note">{content.commission.priceNote}</p>
        <div
          className="workflow"
          aria-label={content.commission.workflowAriaLabel}
        >
          <p className="eyebrow">{content.commission.workflowLabel}</p>
          <ol>
            {content.commission.workflow.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                {step.label}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about section-shell" id="about">
        <div className="section-label">
          <span>{content.about.sectionLabel}</span>
          <span>{content.about.sectionName}</span>
        </div>
        <div className="about-grid">
          <div>
            <p className="eyebrow warm">{content.about.role}</p>
            <h2>
              {content.about.name}
              <small>{content.about.brandName}</small>
            </h2>
          </div>
          <div>
            <p>{content.about.description}</p>
            <div className="software">
              <p className="eyebrow">{content.about.softwareLabel}</p>
              <ul aria-label={content.about.softwareAriaLabel}>
                {content.about.software.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="contact section-shell" id="contact">
        <p className="eyebrow warm">{content.contact.sectionLabel}</p>
        <h2>
          <TextLines lines={contactTitleLines} />
        </h2>
        <p className="contact-note">
          <TextLines lines={contactNoteLines} />
        </p>
        <div className="contact-actions">
          {acceptingCommissions ? (
            <a className="button button-primary" href={contactUrl}>
              {content.contact.emailButton} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span
              className="button button-primary button-disabled"
              aria-disabled="true"
            >
              {content.commission.status.closedButton}
            </span>
          )}
          <a
            className="button button-ghost"
            href={content.links.x}
            target="_blank"
            rel="noreferrer"
          >
            {content.contact.xButton} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <a
          className="contact-address"
          href={`mailto:${content.contact.email}`}
        >
          {content.contact.email}
        </a>
      </section>

      <footer>
        <div className="footer-identity">
          <a
            className="footer-logo"
            href="#top"
            aria-label={content.brand.homeLabel}
          >
            <Image
              src={content.brand.logo}
              alt={content.brand.logoAlt}
              width={600}
              height={600}
            />
          </a>
          <div>
            <strong>{content.footer.brand}</strong>
            <p>{content.footer.role}</p>
          </div>
        </div>
        <p>{content.footer.copyright}</p>
      </footer>
    </main>
  );
}
