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
  const image = images[0];
  return (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <Button variant={CTA.variant} href={CTA.URL} />
      <Image
        src={image.url}
        alt={image.alternativeText}
        height={image.height}
        width={image.width}
      ></Image>
    </div>
  );
};
