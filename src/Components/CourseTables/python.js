import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './table.css';
import Navbar1 from '../Navbar1';

const Python = () => {
  const [videos, setVideos] = useState([]); // State to store videos
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    // Fetch video data from the API
    const fetchVideos = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const cid = queryParams.get('cid');
      const response = await fetch(`http://localhost:5000/api/${cid}`);
      const data = await response.json();
      setVideos(data);
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const checkboxes = document.querySelectorAll('.status-checkbox');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    const progressLine = document.getElementById('progress-line');

    function updateProgress() {
      const total = checkboxes.length;
      const checked = document.querySelectorAll('.status-checkbox:checked').length;
      const percentage = Math.round((checked / total) * 100);

      progressText.textContent = `${checked}/${total} tasks completed (${percentage}%)`;
      progressFill.style.width = `${percentage}%`;
      progressLine.style.width = `${percentage}%`;
    }

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateProgress);
    });

    updateProgress();

    return () => {
      checkboxes.forEach(checkbox => {
        checkbox.removeEventListener('change', updateProgress);
      });
    };
  }, [videos]);

  // Function to extract the video ID from YouTube URL
  const getYouTubeID = (url) => {
    const videoId = url.split('v=')[1].split('&')[0];
    return videoId;
  };

  return (
    <div>
      <Navbar1 />
      <div className="progress-container" id="progress-container">
        <div className="progress-line" id="progress-line"></div>
        <span id="progress-text">0/{videos.length} tasks completed (0%)</span>
        <div className="progress-bar">
          <div className="progress-fill" id="progress-fill"></div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Status</th>
            <th>Topic</th>
            <th>YouTube</th>
            <th>Article</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><input type="checkbox" className="status-checkbox" /></td>
              <td>{video.title}</td>
              <td>
                <button
                  onClick={() => setActiveVideo(activeVideo === index ? null : index)} // Toggle video display
                  className="play-button"
                >
                  <img
                    src="https://s2.googleusercontent.com/s2/favicons?domain=youtube.com"
                    className="icon"
                    alt="YouTube"
                  />
                  Play
                </button>
              </td>
              <td>-</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup overlay for the embedded YouTube video */}
      {activeVideo !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setActiveVideo(null)}>Close</button>
            <iframe
              width="650"
              height="515"
              src={`https://www.youtube.com/embed/${getYouTubeID(videos[activeVideo].youtubelink)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Python;
