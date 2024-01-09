import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import YouTube from "react-youtube";

export default function Videos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState([]);
  const galleryRef = useRef(null);
  const [galleryVideos, setGalleryVideos] = useState([]);
  const [selectedAlt, setSelectedAlt] = useState(null);

  const leagues = [
    {
      alt: "Premier League",
      src: "https://www.thesportsdb.com/images/media/league/badge/pdd43f1610891709.png",
    },
    {
      alt: "Ligue 1",
      src: "https://www.thesportsdb.com/images/media/league/badge/2yo0vn1592927519.png",
    },
    {
      alt: "spain footbal",
      src: "https://www.thesportsdb.com/images/media/league/badge/7onmyv1534768460.png",
    },
    {
      alt: "seria a",
      src: "https://www.thesportsdb.com/images/media/league/badge/fy79v91625170070.png",
    },
    {
      alt: "Germany Bundesliga",
      src: "https://www.thesportsdb.com/images/media/league/badge/0j55yv1534764799.png",
    },
    {
      alt: "israel Ligat Hahl",
      src: "https://www.thesportsdb.com/images/media/league/badge/glvhg51664190048.png",
    },
    {
      alt: "Austria bundesliga",
      src: "https://www.thesportsdb.com/images/media/league/badge/fkv1291578833421.png",
    },
  ];

  useEffect(() => {
    if (selectedAlt !== null) {
      console.log(selectedAlt);
      
      const handleSubmit = async () => {
      
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCs-n7vNX1Bq6r3v2wkc111R35czcEm6XQ&q=${selectedAlt}&part=snippet&type=video&maxResults=25`
        );
        const data = await response.json();
        setVideos(data.items);
       // console.log(data.items);
      };
      handleSubmit();
    }
  }, [selectedAlt]);


  useEffect(() => {
    console.log(videos);
    const newGalleryVideos = videos.map((video, index) => (
      <div className="text-center m-3" key={index}>
        <YouTube
          videoId={video.id.videoId}
          // onReady={(event) => onReady(event, index)}
          opts={{ height: "100", width: "200" }}
        />
      </div>
    ));

    setGalleryVideos(newGalleryVideos);
  }, [videos]);

  return (
    <div className="d-flex">
      <div
        className="col-12 p-4 text-light fst-italic "
        style={{ height: "85vh" }}
      >
        <h1 className="fw-bold  mb-5">Videos</h1>
        <div className="d-flex">
          <div className="disLeague col-3 border-end d-flex align-content-around justify-content-around flex-wrap">
            {leagues.map((league, index) => (
              <div key={index}>
                <img
                  alt={league.alt}
                  className="m-3"
                  src={league.src}
                  width="110"
                  height="110"
                  onClick={() => setSelectedAlt(league.alt)}
                />
                <h5 className="text-center">{league.alt}</h5>
              </div>
            ))}
            
          </div>
          <div className="text-center m-3 " key={2}>
            <YouTube iframeClassName="youtube" videoId="F3AEgylgpiU" opts={{autoplay: 0}} />
          </div>
        </div>
      </div>
    </div>
  );
}
