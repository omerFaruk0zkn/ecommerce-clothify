import { useCallback, useEffect, useRef, useState } from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isCustomStyling = false,
}) => {
  const inputRef = useRef(null);
  const [publicId, setPublicId] = useState("");

  const uploadImageToCloudinary = useCallback(async () => {
    const data = new FormData();
    data.append("my_file", imageFile);

    setImageLoadingState(true);
    try {
      const res = await axiosInstance.post(
        "/admin/products/upload-image",
        data
      );

      if (res.data?.success) {
        setUploadedImageUrl(res.data.result.secure_url);
        setPublicId(res.data.result.publicId);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setImageLoadingState(false);
    }
  }, [imageFile, setUploadedImageUrl, setImageLoadingState]);

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile, uploadImageToCloudinary]);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) setImageFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = async () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
    setUploadedImageUrl("");

    if (publicId) {
      try {
        const res = await axiosInstance.delete("/admin/products/delete-image", {
          data: { publicId },
        });

        if (res?.data?.success) {
          toast.success(res.data.message);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
  };

  return (
    <div
      className={`w-full px-4 mt-4 ${
        isCustomStyling ? "" : "max-w-md mx-auto"
      }`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed rounded-lg p-4"
      >
        <Input
          id="imageUpload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <Label
            htmlFor="imageUpload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="size-10 text-muted-foreground mb-2" />
            <span className="text-center">
              Drag & drop or click to upload image
            </span>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="flex-1 h-4 rounded-lg" />
              <Skeleton className="size-4 rounded-full" />
            </div>

            <Skeleton className="h-36 w-full rounded-lg" />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileIcon className="size-8 text-primary mr-2" />
              </div>

              <p className="text-sm font-medium">{imageFile.name}</p>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleRemoveImage}
              >
                <XIcon className="size-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>

            {uploadedImageUrl && (
              <img
                src={uploadedImageUrl}
                alt="Uploaded Image"
                className="w-full max-h-64 object-cover rounded-lg"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
