import { PixabayImage } from "@/types/types";
import React from "react";
import Attribution from "./Attribution/Attribution";
import Details from "./Details/Details";
import Download from "./Download/Download";
import Statistics from "./Statistics/Stats";
import Uploader from "./Uploader/Uploader";

const ImageDetails = ({ item }: { item: PixabayImage }) => {
  return (
    <>
      <Uploader
        imageUrl={item.userImageURL}
        username={item.user}
        userId={item.user_id}
      />
      <Statistics
        views={item.views}
        downloads={item.downloads}
        likes={item.likes}
      />
      <Details
        tags={item.tags}
        imageDim={{ width: item.imageWidth, height: item.imageHeight }}
      />
      <Download pageURL={item.pageURL} />
      <Attribution />
    </>
  );
};

export default ImageDetails;
