import React from "react";
import dynamic from "next/dynamic";

interface DynamicZoneComponent {
  __component: string;
  id: number;
  [key: string]: any;
}

interface Props {
  dynamicZone: DynamicZoneComponent[];
  locale?: string;
}

const componentMapping: { [key: string]: any } = {
  "dynamic-zone.brands": dynamic(
    () => import("./brands").then((mod) => mod.Brands),
    { ssr: false }
  ),
  "dynamic-zone.cta": dynamic(() => import("./cta").then((mod) => mod.CTA), {
    ssr: false,
  }),
  "dynamic-zone.collection-hero": dynamic(
    () => import("./collection-hero").then((mod) => mod.CollectionHero),
    { ssr: false }
  ),
};

const DynamicZoneManager: React.FC<Props> = ({ dynamicZone, locale }) => {
  return (
    <div>
      {dynamicZone.map((componentData) => {
        const Component = componentMapping[componentData.__component];
        if (!Component) {
          console.warn(`No component found for: ${componentData.__component}`);
          return null;
        }
        return (
          <Component
            key={componentData.id}
            {...componentData}
            locale={locale}
          />
        );
      })}
    </div>
  );
};

export default DynamicZoneManager;
