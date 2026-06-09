'use client';

import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import React, { useRef, useEffect, useState, useCallback } from 'react';

type BreadcrumbItem = { label: string; slug?: string };

interface Props {
  breadcrumbs: BreadcrumbItem[];
  totalLength: number;
}

export default function TruncatedBreadcrumbs({ breadcrumbs, totalLength }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hiddenItems, setHiddenItems] = useState<BreadcrumbItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<BreadcrumbItem[]>(breadcrumbs);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const compute = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.closest('.container25')?.clientWidth ?? containerRef.current.clientWidth;
    const maxWidth = containerWidth * 0.4;
    const itemCount = breadcrumbs.length;

    // Collapse if more than 3 items OR container is too narrow (will be verified by width below)
    const shouldCollapse = itemCount > 3;

    if (!shouldCollapse) {
      setHiddenItems([]);
      setVisibleItems(breadcrumbs);
      return;
    }

    // Always keep: first item (Home) + last 2 items
    // Everything in between goes into the "..." dropdown
    const first = breadcrumbs[0];
    const last2 = breadcrumbs.slice(-2);
    const middle = breadcrumbs.slice(1, -2);

    setHiddenItems(middle);
    setVisibleItems([first, ...last2]);
  }, [breadcrumbs]);

  // Also collapse based on rendered width exceeding 40%
  useEffect(() => {
    compute();

    const observer = new ResizeObserver(compute);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [compute]);

  // Check if rendered width > 40% of container25 (width-based trigger)
  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.closest('.container25')?.clientWidth ?? 0;
    const selfWidth = containerRef.current.scrollWidth;
    if (selfWidth > containerWidth * 0.4 && hiddenItems.length === 0 && breadcrumbs.length > 2) {
      const first = breadcrumbs[0];
      const last2 = breadcrumbs.slice(-2);
      const middle = breadcrumbs.slice(1, -2);
      setHiddenItems(middle);
      setVisibleItems([first, ...last2]);
    }
  });

  const renderItem = (item: BreadcrumbItem) =>
    item.slug ? (
      <Link href={item.slug}>
        <p className="breadcrumb_main about_breadcrump_text">{item.label}</p>
      </Link>
    ) : (
      <p className="breadcrumb_main about_breadcrump_text">{item.label}</p>
    );

  return (
    <div ref={containerRef} className="about_breadcrumb menus" style={{ position: 'relative' }}>
      {/* First item always visible */}
      {renderItem(visibleItems[0])}

      {/* Ellipsis with dropdown for hidden items */}
      {hiddenItems.length > 0 && (
        <>
          <FaChevronRight color="#fff" size={10} />
          <div
            className="breadcrumb_ellipsis"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
            onClick={() => setDropdownOpen((v) => !v)}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <p
              className="breadcrumb_main about_breadcrump_text"
              style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '4px',
                padding: '0 8px',
                userSelect: 'none',
              }}
            >
              …
            </p>

            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: '0',
                  background: 'var(--color-92)',
                  borderRadius: '6px',
                  minWidth: '180px',
                  padding: '6px 0',
                  zIndex: 200,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                }}
              >
                {hiddenItems.map((item, i) =>
                  item.slug ? (
                    <Link key={i} href={item.slug} style={{ display: 'block', padding: '6px 14px', textDecoration: 'none' }}>
                      <span className="breadcrumb_main about_breadcrump_text">{item.label}</span>
                    </Link>
                  ) : (
                    <div key={i} style={{ padding: '6px 14px' }}>
                      <span className="breadcrumb_main about_breadcrump_text">{item.label}</span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Remaining visible items (last 2) */}
      {visibleItems.slice(1).map((item, idx) => (
        <React.Fragment key={idx}>
          <FaChevronRight color="#fff" size={10} />
          {renderItem(item)}
        </React.Fragment>
      ))}
    </div>
  );
}