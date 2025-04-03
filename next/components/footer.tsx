import React from "react";
import { Logo } from "@/components/logo";
import { Link } from "next-view-transitions";

export const Footer = async ({
  data,
  locale,
}: {
  data: any;
  locale: string;
}) => {
  return (
    <div className="relative">
      <div className="border-t border-neutral-900 p-8 relative bg-primary">
        <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start ">
          <div>
            <div className="mr-4  md:flex mb-4">
              {data?.logo?.image && <Logo image={data?.logo?.image} />}
            </div>
            <div className="max-w-xs">{data?.description}</div>
            <div className="mt-4">{data?.copyright}</div>
          </div>
          <div className="flex flex-col items-start space-y-2  md:mt-0 text-end ml-auto w-min">
            {data?.internal_links && (
              <LinkSection links={data?.internal_links} locale={locale} />
            )}
            {data?.policy_links && (
              <LinkSection links={data?.policy_links} locale={locale} />
            )}
            {data?.social_media_links && (
              <LinkSection links={data?.social_media_links} locale={locale} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkSection = ({
  links,
  locale,
}: {
  links: { text: string; URL: never | string }[];
  locale: string;
}) =>
  links.length ? (
    <div className="flex justify-end space-y-2 flex-col w-full text-nowrap">
      {links.map((link) => (
        <Link
          key={link.text}
          className="transition-colors hover:text-neutral-400 text-muted text-xs sm:text-sm"
          href={`${
            link.URL.startsWith("http") || link.URL.startsWith("mailto")
              ? ""
              : `/${locale}`
          }${link.URL}`}
        >
          {link.text}
        </Link>
      ))}
    </div>
  ) : null;
