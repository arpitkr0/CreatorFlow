import { useState } from "react";
import "./Sidebar.css";
import {
  Menu,
  Plus,
  CalendarDays,
  SquarePlay,
  CircleHelp,
  Settings,
  MessageSquareText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [extended, setExtended] = useState(false);

  return (
    <div className={extended ? "sidebar open" : "sidebar"}>
      <div className="top">
        <Menu
          className="menu icon"
          onClick={() => setExtended((prev) => !prev)}
        />

        <div className="new-chat">
          <Plus className="icon" />
          {extended ? <p>New Script</p> : null}
        </div>
        {extended ? (
          <div className="recent">
            <p className="recent-title">History</p>
            <div className="recent-entry">
              <MessageSquareText className="icon" />
              <p>What is react ...</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <SquarePlay className="icon" />
          {extended ? (
            <p onClick={() => navigate("/video-recommender")}>
              Video Recommender
            </p>
          ) : null}
        </div>
        <div className="bottom-item recent-entry">
          <CalendarDays className="icon" />
          {extended ? (
            <p onClick={() => navigate("/content-calendar")}>
              Content Calendar
            </p>
          ) : null}
        </div>
        <div className="bottom-item recent-entry">
          <CircleHelp className="icon" />
          {extended ? (
            <p onClick={() => navigate("/how-to-use")}>How to use?</p>
          ) : null}
        </div>
        <div className="bottom-item recent-entry">
          <Settings className="icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
