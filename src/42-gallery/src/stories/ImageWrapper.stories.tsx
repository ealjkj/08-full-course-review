import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ImageWrapper } from "../components/ImageWrapper";

export default {
  title: "Main/ImageWrapper",
  component: ImageWrapper,
} as ComponentMeta<typeof ImageWrapper>;

const Template: ComponentStory<typeof ImageWrapper> = (args) => (
  <ImageWrapper {...args} />
);

export const ManyImages = Template.bind({});
ManyImages.args = {
  images: [
    {
      height: 668,
      width: 666,
      src: "https://loremflickr.com/666/668/animals",
    },
    {
      height: 674,
      width: 622,
      src: "https://loremflickr.com/622/674/animals",
    },
    {
      height: 315,
      width: 647,
      src: "https://loremflickr.com/647/338/animals",
    },
    {
      height: 391,
      width: 628,
      src: "https://loremflickr.com/628/391/animals",
    },
    {
      height: 549,
      width: 383,
      src: "https://loremflickr.com/383/549/animals",
    },
    {
      height: 294,
      width: 364,
      src: "https://loremflickr.com/364/294/animals",
    },
    {
      height: 577,
      width: 287,
      src: "https://loremflickr.com/287/577/animals",
    },
    {
      height: 580,
      width: 334,
      src: "https://loremflickr.com/334/580/animals",
    },
    {
      height: 344,
      width: 264,
      src: "https://loremflickr.com/264/344/animals",
    },
    {
      height: 349,
      width: 324,
      src: "https://loremflickr.com/324/349/animals",
    },
  ],
};

export const LittleImages = Template.bind({});
LittleImages.args = {
  images: [
    { height: 540, width: 467, src: "https://loremflickr.com/467/540/animals" },
    { height: 300, width: 601, src: "https://loremflickr.com/601/300/animals" },
    { height: 501, width: 250, src: "https://loremflickr.com/250/501/animals" },
  ],
};

export const NoImages = Template.bind({});
NoImages.args = {
  images: [],
};
