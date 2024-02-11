import ImageSlider from "./image-slider/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <p className="text-amber-100 mt-24 text-4xl font-bold">Image Slider</p>
    <ImageSlider url={"https://picsum.photos/v2/list"} limit={10} page={1} />
    </div>
  );
}
