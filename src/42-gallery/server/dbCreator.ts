import { faker } from "@faker-js/faker";
import { writeFileSync } from "fs";

type image = {
    height: number,
    width: number,
    src: string
}

type gallery = {
    id: number,
    images : image[]
}


function randomFromInterval(min: number, max: number): number {
    return Math.floor(Math.random()*(max-min)) + min;
}


function createImageList(numOfImages: number, min: number = 240, max : number = 240*3) : image[] {
    const images : image[] = [];
    for(let i = 0; i < numOfImages; i++) {
        const height = randomFromInterval(min, max);
        const width = randomFromInterval(min, max);

        const image : image = {
            height,
            width,
            src: faker.image.animals(width, height),
        }   

        images.push(image);
    }

    return images;
}

function createGallery(numOfImages: number, id : number) {
    return {
        id,
        images: createImageList(numOfImages)
    }
}

function createDb(numOfGalleries : number) : { gallery: gallery[] } {
    const galleries : gallery[] = [];
    for(let i = 0; i < numOfGalleries; i++) {
        const numOfImages = randomFromInterval(10, 100);
        galleries.push(createGallery(numOfImages, 1))
    }

    return {
        gallery: galleries
    }
}

const writeDb = (fileName : string, numOfGalleries : number) : void => {
    writeFileSync(fileName, JSON.stringify(createDb(numOfGalleries)))
}

console.log(createImageList(10))

export {createDb, writeDb, image}