import React, { useRef, useEffect } from "react";

function YouTubeVideo({ videoId }) {
  const playerRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player(playerRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 0,
        },
      });
    };
  }, [videoId]);

  return (
    <div className="embed-responsive embed-responsive-16by9">
      <div ref={playerRef} className="embed-responsive-item" />
    </div>
  );
}
