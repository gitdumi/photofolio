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
  const imageLeft = images?.[0];
  const imageRight = images?.[1];

  console.log({ CTA });
  return (
    <section className="mx-auto my-1 w-full flex gap-4 justify-center align-center">
      {imageLeft && (
        <Image
          src={imageLeft.url}
          alt={imageLeft.alternativeText || imageLeft.name}
          height={400}
          width={400}
        />
      )}
      <div className="flex flex-col align-center justify-center h-full select-none">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Button variant={CTA.variant} as="a" href={CTA.URL}>
          {CTA.text}
        </Button>
      </div>
      {imageRight && (
        <Image
          src={imageRight.url}
          alt={imageRight.alternativeText || imageRight.name}
          height={400}
          width={400}
        />
      )}
    </section>
  );
};
