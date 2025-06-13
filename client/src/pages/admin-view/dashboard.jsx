import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addFeatureImage,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/common-slice";
import ProductImageUpload from "@/components/admin-view/image-upload";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      } else {
        toast.error(data.payload);
      }
    });
  };

  const handleDeleteFeatureImage = (getId) => {
    if (confirm("Are you sure want to deleting feature image?")) {
      dispatch(deleteFeatureImage(getId)).then((data) => {
        if (data?.payload?.success) {
          dispatch(getFeatureImages());
          toast.success(data.payload.message);
        } else {
          toast.error(data.payload);
        }
      });
    }
  };

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
      />

      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImageItem) => (
              <div className="relative">
                <img
                  src={featureImageItem.image}
                  alt="Feature Image"
                  className="w-full h-full object-cover rounded"
                />

                <Button
                  onClick={() => handleDeleteFeatureImage(featureImageItem._id)}
                  className="absolute top-2 right-2"
                >
                  <X className="size-6" />
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
