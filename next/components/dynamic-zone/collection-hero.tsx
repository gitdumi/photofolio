import { Image as ImageType } from "@/types/types";
import { Button } from "../elements/button";
import Image from "next/image";

type CollectionHeroProps = {
  title: string;
  subtitle: string;
  images: ImageType[];
  CTA: any;
};

export const CollectionHero = ({
  title,
  subtitle,
  images,
  CTA,
}: CollectionHeroProps) => {
  console.log({ length: images.length, first: images[0] });
  const imageLeft = images?.[0];
  const imageRight = images?.[1];

  return (
    <section className="mx-auto my-1 w-full flex gap-4 justify-center align-center">
      {imageLeft && (
        <Image
          src={imageLeft.url}
          alt={imageLeft.alternativeText}
          height={imageLeft.height}
          width={imageLeft.width}
        />
      )}
      <div className="flex flex-col align-center justify-center h-full select-none">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Button variant={CTA.variant} href={CTA.URL}>
          {CTA.text}
        </Button>
      </div>
      {imageRight && (
        <Image
          src={imageRight.url}
          alt={imageRight.alternativeText}
          height={imageRight.height}
          width={imageRight.width}
        />
      )}
    </section>
  );
};
