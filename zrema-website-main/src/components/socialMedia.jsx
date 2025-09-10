import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Volume2,
  VolumeX,
} from "lucide-react";

const SocialStoriesSection = () => {
  const storiesRef = useRef(null);
  const videoRefs = useRef({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [mutedStates, setMutedStates] = useState({});

  // Sample social media stories with mix of images and videos
  const stories = [
    {
      id: 2,
      type: "video", // Changed from image to video since videoUrl is provided
      videoUrl: "https://zrema.s3.ap-south-1.amazonaws.com/videos/short2.mp4",
      altText: "Woman in black embroidered kurti",
    },
    {
      id: 3,
      type: "video",
      videoUrl: "https://zrema.s3.ap-south-1.amazonaws.com/videos/short3.mp4",
      altText: "Woman in red kurti",
    },
    {
      id: 4,
      type: "video", // Changed from image to video since videoUrl is provided
      videoUrl: "https://zrema.s3.ap-south-1.amazonaws.com/videos/short4.mp4",
      altText: "Must have short kurtis from Zrema",
    },
    {
      id: 5,
      type: "video",
      videoUrl: "https://zrema.s3.ap-south-1.amazonaws.com/videos/short5.mp4",
      altText: "Kashmiri short kurti from Zrema",
    },
    {
      id: 6,
      type: "video",
      videoUrl: "https://zrema.s3.ap-south-1.amazonaws.com/videos/short6.mp4",
      altText: "Designer kurti showcase",
    },
    {
      id: 7, // Fixed duplicate ID
      type: "video",
      videoUrl: "https://zrema.s3.ap-south-1.amazonaws.com/videos/short7.mp4",
      altText: "Designer kurti showcase",
    },
    {
      id: 1,
      type: "video",
      videoUrl: "https://zrema.s3.ap-south-1.amazonaws.com/videos/short1.mp4",
      altText: "Two women wearing yellow and pink kurtis",
    },
  ];

  // Initialize all videos as muted
  useEffect(() => {
    const initialMutedStates = {};
    stories.forEach((story) => {
      if (story.type === "video") {
        initialMutedStates[story.id] = true;
      }
    });
    setMutedStates(initialMutedStates);
  }, []);

  const checkScrollability = () => {
    const container = storiesRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 5
      );
    }
  };

  const scrollLeft = () => {
    const container = storiesRef.current;
    if (container) {
      container.scrollBy({
        left: -350,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 500);
    }
  };

  const scrollRight = () => {
    const container = storiesRef.current;
    if (container) {
      container.scrollBy({
        left: 350,
        behavior: "smooth",
      });
      setTimeout(checkScrollability, 500);
    }
  };

  const toggleMute = (e, id) => {
    e.stopPropagation();
    setMutedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Setup Intersection Observer for autoplay
  useEffect(() => {
    if (!storiesRef.current) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // 60% visible to trigger
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        // Get video ID from the data attribute
        const videoId = parseInt(entry.target.dataset.id, 10);
        const videoElement = videoRefs.current[videoId];

        if (entry.isIntersecting && videoElement) {
          // Try to play the video when it's in view
          videoElement.play().catch((e) => {
            console.log("Autoplay prevented:", e);
            // Some browsers require user interaction before autoplay
            // We can at least make sure the video is ready to play
            videoElement.load();
          });
        } else if (videoElement) {
          // Pause when out of view
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    // Observe all video containers
    const videoContainers = document.querySelectorAll(
      '[data-video-container="true"]'
    );
    videoContainers.forEach((container) => {
      observer.observe(container);
    });

    return () => {
      observer.disconnect();
    };
  }, []); // Run once on component mount

  // Add listener for scroll navigation
  useEffect(() => {
    const container = storiesRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      checkScrollability();
      window.addEventListener("resize", checkScrollability);

      return () => {
        container.removeEventListener("scroll", checkScrollability);
        window.removeEventListener("resize", checkScrollability);
      };
    }
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
          Social Stories <span className="font-normal">@Zrema</span>
        </h2>

        {/* Stories Gallery */}
        <div className="relative">
          {/* Navigation Arrows */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute top-1/2 left-0 md:-left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute top-1/2 right-0 md:-right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={storiesRef}
            className="flex overflow-x-auto gap-3 md:gap-4 pb-4 scrollbar-hide snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex-shrink-0 w-64 md:w-72 h-96 rounded-md overflow-hidden relative snap-center"
                data-id={story.id}
                data-video-container={story.type === "video" ? "true" : "false"}
              >
                {story.type === "image" ? (
                  <img
                    src={story.image || "/api/placeholder/400/320"}
                    alt={story.altText}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="relative w-full h-full bg-black">
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[story.id] = el;
                      }}
                      src={story.videoUrl}
                      loop
                      muted={mutedStates[story.id]}
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                      data-id={story.id}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Video Controls */}
                    <div className="absolute bottom-3 right-3 flex space-x-2">
                      <button
                        onClick={(e) => toggleMute(e, story.id)}
                        className="bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80"
                        aria-label={mutedStates[story.id] ? "Unmute" : "Mute"}
                      >
                        {mutedStates[story.id] ? (
                          <VolumeX size={16} />
                        ) : (
                          <Volume2 size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Story Info Overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 text-white">
                  <p className="text-sm font-medium">{story.altText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default SocialStoriesSection;
