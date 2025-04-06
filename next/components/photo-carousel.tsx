import { Photo, PhotoCollection } from "@/types/types";
import { useEffect, useRef } from "react";
import { ImageWrapper } from "./containers/image-wrapper";
import { ParrallaxRatios } from "@/lib/constants";

type PhotoCarouselProps = {
  collection: PhotoCollection;
  onUnAuthClick: () => void;
};
export const PhotoCarousel = ({
  collection,
  onUnAuthClick,
}: PhotoCarouselProps) => {
  const { photos } = collection || {};

  const parentRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const centerColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parentRef.current) return;

      const scrollTop = parentRef.current.scrollTop;

      if (leftColumnRef.current) {
        leftColumnRef.current.style.transform = `translateY(${
          scrollTop * ParrallaxRatios.far
        }px)`;
      }

      if (centerColumnRef.current) {
        centerColumnRef.current.style.transform = `translateY(${
          scrollTop * ParrallaxRatios.further
        }px)`;
      }

      if (rightColumnRef.current) {
        rightColumnRef.current.style.transform = `translateY(${
          scrollTop * ParrallaxRatios.furthest
        }px)`;
      }
    };

    const parentElement = parentRef.current;
    parentElement?.addEventListener("scroll", handleScroll);
    return () => parentElement?.removeEventListener("scroll", handleScroll);
  }, []);

  const splitPhotosIntoColumns = (photos: Photo[], numColumns: number) => {
    const columns: Photo[][] = Array.from({ length: numColumns }, () => []);
    photos.forEach((photo, index) => {
      columns[index % numColumns].push(photo);
    });
    return columns;
  };

  const [leftColumnPhotos, centerColumnPhotos, rightColumnPhotos] =
    splitPhotosIntoColumns(photos || [], 3);

  return (
    <div
      ref={parentRef}
      className="relative flex flex-1 gap-8 w-full mx-auto overflow-hidden h-full"
      onClick={onUnAuthClick}
    >
      {/* Left Column */}
      {leftColumnPhotos?.length > 0 && (
        <div
          ref={leftColumnRef}
          className="flex flex-col gap-4 w-1/3 overflow-hidden will-change-transform"
        >
          {leftColumnPhotos.map((photo: Photo) => (
            <div key={photo?.documentId} className="flex-shrink-0">
              <ImageWrapper photo={photo} collection={collection} />
            </div>
          ))}
        </div>
      )}

      {/* Center Column */}
      {centerColumnPhotos?.length > 0 && (
        <div
          ref={centerColumnRef}
          className="flex flex-col gap-4 w-1/3 overflow-hidden will-change-transform"
        >
          {centerColumnPhotos?.map((photo: Photo) => (
            <div key={photo?.documentId} className="flex-shrink-0">
              <ImageWrapper photo={photo} collection={collection} />
            </div>
          ))}
        </div>
      )}

      {/* Right Column */}
      {rightColumnPhotos?.length > 0 && (
        <div
          ref={rightColumnRef}
          className="flex flex-col gap-4 w-1/3 overflow-hidden will-change-transform"
        >
          {rightColumnPhotos?.map((photo: Photo) => (
            <div key={photo?.documentId} className="flex-shrink-0">
              <ImageWrapper photo={photo} collection={collection} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
