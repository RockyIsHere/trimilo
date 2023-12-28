"use client";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}
import { defaultImages } from "@/constants/images";
import { unsplash } from "@/lib/unsplash";
import { cn } from "@/lib/utils";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { pending } = useFormStatus();
  useEffect(() => {
    const fetchedImages = async () => {
      setLoading(true);
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log("field to get error");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setLoading(false);
      }
    };
    fetchedImages();
  }, []);
  if (loading) {
    return (
      <div className=" p-6 flex justify-center items-center">
        <Loader2 className=" h-6 w-6  text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className=" relative">
      <div className=" grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => {
          return (
            <div
              className={cn(
                " cursor-pointer relative aspect-video group hover:opacity-70 transition bg-muted",
                pending && " opacity-50 hover:opacity-50 cursor-auto"
              )}
              onClick={() => {
                if (pending) return;
                setSelectedImageId(image.id);
              }}
            >
              <input
                id={id}
                name={id}
                type="radio"
                checked={selectedImageId === image.id}
                className=" hidden"
                disabled={pending}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <Image
                alt="unsplash image"
                fill
                src={image.urls.thumb}
                className=" object-cover rounded-sm"
              />
              {selectedImageId === image.id && (
                <div className=" absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                  <Check className=" h-4 w-4  text-white" />
                </div>
              )}
              <Link
                href={image.links.html}
                target="_blank"
                className=" opacity-0 group-hover:opacity-100 absolute text-white bottom-0 w-full text-[10px] truncate hover:underline p-1 bg-black/50"
              >
                {image.user.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormPicker;
