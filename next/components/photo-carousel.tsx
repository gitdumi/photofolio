import { Photo, PhotoCollection } from "@/types/types";
import { useEffect, useRef } from "react";
import { ImageWrapper } from "./containers/image-wrapper";

type PhotoCarouselProps = {
  collection: PhotoCollection;
  onUnAuthClick: () => void;
};

export const PhotoCarousel = ({
  collection,
  onUnAuthClick,
}: PhotoCarouselProps) => {
  const { photos } = collection || {};
  if (!photos) return null;
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const centerColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      if (leftColumnRef.current) {
        leftColumnRef.current.style.transform = `translateY(${
          scrollTop * 0.1
        }px)`;
      }

      if (centerColumnRef.current) {
        centerColumnRef.current.style.transform = `translateY(${
          scrollTop * -0.05
        }px)`;
      }

      if (rightColumnRef.current) {
        rightColumnRef.current.style.transform = `translateY(${
          scrollTop * 0.2
        }px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const leftColumnPhotos = photos.filter((_, index) => index % 2 === 0);
  const leftColumnPhotos = photos;
  //   const rightColumnPhotos = photos.filter((_, index) => index % 2 !== 0);
  // const centerColumnPhotos = [...photos].reverse();
  const centerColumnPhotos = [];
  // const rightColumnPhotos = photos;
  const rightColumnPhotos = [];

  return (
    <div
      className="relative flex gap-8 h-[1000px] w-full mx-auto"
      onClick={onUnAuthClick}
    >
      {/* Left Column */}
      {leftColumnPhotos?.length > 0 && (
        <div
          ref={leftColumnRef}
          className="flex flex-col gap-4 w-1/2 overflow-hidden"
        >
          {leftColumnPhotos.map((photo: Photo) => (
            <div key={photo?.previewImage?.id} className="flex-shrink-0">
              <ImageWrapper photo={photo} collection={collection} />
            </div>
          ))}
        </div>
      )}

      {/* Center Column */}
      {centerColumnPhotos?.length > 0 && (
        <div
          ref={centerColumnRef}
          className="flex flex-col gap-4 w-1/2 overflow-hidden"
        >
          {centerColumnPhotos?.map((photo: Photo) => (
            <div key={photo?.previewImage?.id} className="flex-shrink-0">
              <ImageWrapper photo={photo} collection={collection} />
            </div>
          ))}
        </div>
      )}

      {/* Right Column */}
      {rightColumnPhotos?.length > 0 && (
        <div
          ref={rightColumnRef}
          className="flex flex-col gap-4 w-1/2 overflow-hidden"
        >
          {rightColumnPhotos?.map((photo: Photo) => (
            <div key={photo?.previewImage?.id} className="flex-shrink-0">
              <ImageWrapper photo={photo} collection={collection} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
