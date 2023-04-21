import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

type Image = {
  height: number;
  width: number;
  src: string;
};

type Gallery = {
  id: number;
  images: Image[];
};

function randomFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function createImageList(
  numOfImages: number,
  min: number = 240,
  max: number = 240 * 3
): Image[] {
  const images: Image[] = [];
  for (let i = 0; i < numOfImages; i++) {
    const height = randomFromInterval(min, max);
    const width = randomFromInterval(min, max);

    const image: Image = {
      height,
      width,
      src: faker.image.animals(width, height),
    };

    images.push(image);
  }

  return images;
}

function createGallery(numOfImages: number, id: number) {
  return {
    id,
    images: createImageList(numOfImages),
  };
}

function createDb(numOfGalleries: number): { gallery: Gallery[] } {
  const galleries: Gallery[] = [];
  for (let i = 0; i < numOfGalleries; i++) {
    const numOfImages = randomFromInterval(10, 100);
    galleries.push(createGallery(numOfImages, 1));
  }

  return {
    gallery: galleries,
  };
}

const writeDb = (fileName: string, numOfGalleries: number): void => {
  writeFileSync(fileName, JSON.stringify(createDb(numOfGalleries)));
};

console.log(createImageList(10));

export { createDb, writeDb, Image as image };
