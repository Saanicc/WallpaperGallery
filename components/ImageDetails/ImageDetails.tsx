import { Separator } from "@/components/ui/separator";
import { PixabayImage } from "@/types/types";
import React from "react";
import Attribution from "./Attribution/Attribution";
import Details from "./Details/Details";
import Download from "./Download/Download";
import Statistics from "./Statistics/Stats";
import Uploader from "./Uploader/Uploader";

const ImageDetails = ({ item }: { item: PixabayImage }) => {
  return (
    <React.Fragment>
      <Uploader
        imageUrl={item.userImageURL}
        username={item.user}
        userId={item.user_id}
      />
      <Separator className="my-6" />
      <Statistics
        views={item.views}
        downloads={item.downloads}
        likes={item.likes}
      />
      <Details
        tags={item.tags}
        imageDim={{ width: item.imageWidth, height: item.imageHeight }}
        type={item.type as string}
        size={item.imageSize}
      />
      <Download pageURL={item.pageURL} />
      <Attribution />
    </React.Fragment>
  );
};

export default ImageDetails;
