import { Separator } from "@/components/ui/separator";
import { Wallpaper } from "@/types/types";
import React from "react";
import Attribution from "./Attribution/Attribution";
import Details from "./Details/Details";
import Download from "./Download/Download";
import Statistics from "./Statistics/Stats";
import Uploader from "./Uploader/Uploader";

const ImageDetails = ({ item }: { item: Wallpaper }) => {
  return (
    <React.Fragment>
      <Uploader
        avatarUrl={item.photographerUrl || ""}
        username={item.photographer}
        userId={item.photographerId || 0}
        dataProvider={item.provider}
      />
      {item.provider !== "pexels" && (
        <>
          <Separator className="my-6" />
          <Statistics
            views={item.views || 0}
            downloads={item.downloads || 0}
            likes={item.likes || 0}
          />
          <Details
            tags={item.tags?.join(", ") || ""}
            imageDim={{ width: item.width, height: item.height }}
            type={"photo"}
            size={item.size || 0}
          />
        </>
      )}
      {item.provider === "pexels" && (
        <>
          <Separator className="my-4" />
          <Details imageDim={{ width: item.width, height: item.height }} />
        </>
      )}
      <Download pageURL={item.url} />
      <Attribution provider={item.provider} />
    </React.Fragment>
  );
};

export default ImageDetails;
