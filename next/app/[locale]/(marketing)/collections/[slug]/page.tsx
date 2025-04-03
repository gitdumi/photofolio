import React from "react";

import fetchContentType from "@/lib/strapi/fetchContentType";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import ClientSlugHandler from "../../ClientSlugHandler";
import { CollectionLayout } from "@/components/collection-layout";

export default async function SingleCollectionPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const collection = await fetchContentType(
    "photo-collections",
    {
      filter: {
        id: params.slug,
        locale: params.locale,
      },
      populate: "photos.previewImage",
    },
    true
  );

  if (!collection) {
    return <div>Collection not found</div>;
  }

  //   const localizedSlugs = collection.localizations?.reduce(
  //     (acc: Record<string, string>, localization: any) => {
  //       acc[localization.locale] = localization.slug;
  //       return acc;
  //     },
  //     { [params.locale]: params.slug }
  //   );

  return (
    <CollectionLayout collection={collection}>
      {/* <ClientSlugHandler localizedSlugs={localizedSlugs} /> */}
      {/* <BlocksRenderer content={collection.content} /> */}
    </CollectionLayout>
  );
}
