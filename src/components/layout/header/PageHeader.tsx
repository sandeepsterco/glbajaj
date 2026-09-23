import Link from 'next/link';
import NavLinks from './NavLinks';
import React from 'react';
import { buildBreadcrumbs } from '@/src/lib/buildBreadcrumbs';
import TruncatedBreadcrumbs from './TruncatedBreadcrumbs';

export default function PageHeader({ data, slug, pathname, currentPageTitle }: { data: any; slug: string; pathname: string; currentPageTitle?: string }) {
  const currentPage = data?.tabs?.find((tab: any) => tab.slug === data?.active_tab_slug);
  const activeSlug = data?.active_tab_slug;
  const breadcrumbs = buildBreadcrumbs(data, pathname, currentPageTitle);

  const totalLength = currentPageTitle ? breadcrumbs?.length - 1 : breadcrumbs?.length - 2;

  // Filter out falsy entries (buildBreadcrumbs can push `false` when currentPageTitle is absent)
  const cleanBreadcrumbs = (breadcrumbs ?? []).filter(Boolean);

  return (
    <>
      <div className="about_menu_bar">
        <div className="about_top">
          <div className="container-fluid">
              <div className="about_breadcrumb">
                <div>
                  <p className="about_glbim_p">{data?.tab_title ?? data?.page_title}</p>
                </div>

                <TruncatedBreadcrumbs breadcrumbs={cleanBreadcrumbs} totalLength={totalLength} />
              </div>
          </div>
        </div>

        {data?.tabs && (
          <div className="bottom_menus">
            <div className="container-fluid">
              <NavLinks
                tabs={data.tabs}
                activeSlug={activeSlug}
                tabTitle={data?.tab_title}
                pathname={pathname}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}