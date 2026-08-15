"use client";

import { useMemo, useState } from "react";
import "./AccordionGallery.css";

const DEFAULT_ITEMS = [];

export default function AccordionGallery({
  items = DEFAULT_ITEMS,
  defaultIndex = 0,
  accentColor = "#dd8619",
  overlayColor = "#171511",
  textColor = "#f4ead7",
  height = 460,
  gap = 8,
  radius = 0,
  expandRatio = 0.58,
  orientation = "horizontal",
  duration = 0.65,
  parallax = 0.5,
  tilt = 4,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  className = "",
  ariaLabel = "Image accordion gallery",
}) {
  const count = items.length;
  const initialIndex = Math.min(Math.max(defaultIndex, 0), Math.max(0, count - 1));
  const [active, setActive] = useState(initialIndex);
  const vertical = orientation === "vertical";

  const grow = useMemo(() => {
    const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
    return count > 1 ? (ratio * (count - 1)) / (1 - ratio) : 1;
  }, [count, expandRatio]);

  const activate = (index) => setActive(index);

  const handleClick = (index, event, hasLink) => {
    if (index !== active) {
      if (hasLink) event.preventDefault();
      activate(index);
    }
  };

  const handleKeyDown = (index, event) => {
    if (!count) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      activate((index + 1) % count);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      activate((index - 1 + count) % count);
    }
  };

  if (!count) return null;

  return (
    <div
      className={`accordion-gallery${vertical ? " accordion-gallery--vertical" : ""}${className ? ` ${className}` : ""}`}
      style={{
        "--ag-accent": accentColor,
        "--ag-overlay": overlayColor,
        "--ag-text": textColor,
        "--ag-gap": `${gap}px`,
        "--ag-radius": `${radius}px`,
        "--ag-duration": `${duration}s`,
        height: vertical ? `${Math.round(height * 1.5)}px` : `${height}px`,
      }}
      role="list"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const isActive = index === active;
        const Tag = item.link ? "a" : "button";
        const rotation = isActive ? 0 : index < active ? tilt : -tilt;
        const drift = Math.max(-1.5, Math.min(1.5, active - index)) * parallax * 3.5;

        return (
          <Tag
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            key={`${item.image}-${index}`}
            {...(item.link ? { href: item.link } : { type: "button" })}
            style={{
              flexGrow: isActive ? grow : 1,
              "--ag-rotation": `${vertical ? -rotation : rotation}deg`,
              "--ag-shift-x": `${vertical ? 0 : drift}%`,
              "--ag-shift-y": `${vertical ? drift : 0}%`,
              "--ag-gray": grayscale ? (isActive ? 0 : 1) : 0,
              "--ag-dim": isActive ? 0 : 0.34,
            }}
            onClick={(event) => handleClick(index, event, Boolean(item.link))}
            onMouseEnter={() => trigger === "hover" && activate(index)}
            onFocus={() => activate(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            role="listitem"
            aria-current={isActive ? "true" : undefined}
            aria-label={item.alt || item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media">
                <img
                  src={item.image}
                  alt={item.alt || item.label || ""}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  draggable="false"
                />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" />
                <span className="ag-panel__text">{item.label}</span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
}
