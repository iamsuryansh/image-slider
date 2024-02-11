"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

interface ImageSliderProps {
  url: string;
  limit: number;
  page: number;
  width: number;
  height: number;
  download_url: string;
}

interface ImageItem {
  id: string;
  download_url: string;
  author: string;
}

const ImageSlider = ({ url, limit = 5, page = 1 }: ImageSliderProps) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(url: string) {
    setLoading(true);
    try {
      const response = await fetch(`${url}?page=${page}&limit=${limit}`);
      const data = await response.json();
      setImages(data);
    } catch (error: any) {
      setErrorMsg(error.message);
    }
    setLoading(false);
  }

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMsg) {
    return <div>Error occured</div>;
  }

  return (
    <div className="relative mx-auto mt-12 flex justify-center items-center w-[600px] h-[450px]">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="absolute left-4 w-8 h-8 text-white drop-shadow-[0_0_5px_#555]"
      />
      {images && images.length
        ? images.map((imageItem: ImageItem, index: number) => (
            <Image
              className={`shadow[0px_0px_7px_#666] w-full h-full rounded-lg
              ${currentSlide === index ? "" : "hidden"}`}
              key={imageItem.id}
              src={imageItem.download_url}
              alt={imageItem.author}
              width={500}
              height={300}
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="absolute right-4 w-8 h-8 text-white drop-shadow-[0_0_5px_#555]"
      />
      <span className="flex absolute bottom-4">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`bg-white h-[15px] w-[15px] cursor-pointer mx-[0.2rem] my-0 rounded-[50%] border-[none] 
                ${index === currentSlide ? "bg-gray-600" : ""}`}
              />
            ))
          : null}
      </span>
    </div>
  );
};

export default ImageSlider;
