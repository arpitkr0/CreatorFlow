import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import VideoRecommender from "./pages/VideoRecommender/VideoRecommender";
import ContentCalendar from "./pages/ContentCalendar/ContentCalendar";
import HowToUse from "./pages/HowToUse/HowToUse";
import { SignIn, SignUp } from "@clerk/clerk-react";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/video-recommender" element={<VideoRecommender />} />
        <Route path="/content-calendar" element={<ContentCalendar />} />
        <Route path="/how-to-use" element={<HowToUse />} />
      </Routes>
    </>
  );
};

export default App;
