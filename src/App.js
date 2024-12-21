import React, { useState } from "react";

const SubtitleSyncApp = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [subtitleFile, setSubtitleFile] = useState(null);
  const [outputLink, setOutputLink] = useState(null);

  const handleFileUpload = (event, setFile) => {
    setFile(event.target.files[0]);
  };

  const syncSubtitles = async () => {
    if (!videoFile || !subtitleFile) {
      alert("Please upload both video and subtitle files.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("subtitle", subtitleFile);

    try {
      const response = await fetch("/api/sync", { // Replace with your API endpoint
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setOutputLink(data.outputSubtitleUrl); // Assuming the API responds with a URL to download the updated subtitle.
      } else {
        alert("Subtitle synchronization failed. Please try again.");
      }
    } catch (error) {
      console.error("Error synchronizing subtitles:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div>
      <h1>Subtitle Sync Tool</h1>
      <input type="file" accept="video/*" onChange={(e) => handleFileUpload(e, setVideoFile)} />
      <input type="file" accept=".srt" onChange={(e) => handleFileUpload(e, setSubtitleFile)} />
      <button onClick={syncSubtitles}>Sync Subtitles</button>
      {outputLink && (
        <div>
          <h2>Download Synced Subtitle</h2>
          <a href={outputLink} download>
            Click here to download
          </a>
        </div>
      )}
    </div>
  );
};

export default SubtitleSyncApp;
