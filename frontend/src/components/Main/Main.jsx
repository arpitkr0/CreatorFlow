import { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";
import { LogIn } from "lucide-react";
import {
  SignInButton,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";

//we can use RedirectToSignIn when user try to generate something without logged in

const RegisterUser = async (user) => {
  const res = await axios.post("http://localhost:5000/register", {
    name: user.fullName,
    email: user.primaryEmailAddress.emailAddress,
    clerk_id: user.id,
  });
  console.log(res.data);
};

const Main = () => {
  const { user, isSignedIn } = useUser();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({});
  const [showresult, setShowresult] = useState(false);
  const [input, setInput] = useState({
    video_topic: "",
    script_language: "",
    video_length: "",
    target_audience: "",
    audience_region: "",
    tone: "",
    niche: "",
    viewers_gain: "",
  });

  const handleScriptGeneration = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(`http://localhost:5000/generate`, input);
    if (response) {
      setLoading(false);
    }

    if (response.success) {
      setResult(response);
      setShowresult(true);
      setInput({
        video_topic: "",
        script_language: "",
        video_length: "",
        target_audience: "",
        audience_region: "",
        tone: "",
        niche: "",
        viewers_gain: "",
      });
    }
  };

  const clearData = async (e) => {
    e.preventDefault();
    setLoading(false);
    setInput({
      video_topic: "",
      script_language: "",
      video_length: "",
      target_audience: "",
      audience_region: "",
      tone: "",
      niche: "",
      viewers_gain: "",
    });
  };

  useEffect(() => {
    RegisterUser(user);
  }, [user]);

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>CreatorFlow</p>
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "40px",
                    height: "40px",
                  },
                  userButtonBox: {
                    paddingRight: "30px",
                    padding: "8px",
                    backgroundColor: "#f0f4f9",
                    borderRadius: "50%",
                  },
                },
              }}
            />
          ) : (
            <SignInButton mode="modal">
              <button className="login-button">
                Login <LogIn className="icon" />
              </button>
            </SignInButton>
          )}
        </div>
        <div className="main-container">
          <div className="greet">
            <p>
              <span>Hello, {isSignedIn ? `${user.firstName}` : "There"}</span>
            </p>
            <p>Whats on your mind today?</p>
          </div>
          <div className="form-inputs">
            <input
              onChange={(e) =>
                setInput((prev) => ({ ...prev, video_topic: e.target.value }))
              }
              value={input.video_topic}
              type="text"
              placeholder="Video Topic"
            />
            <div className="multi-inputs">
              {/* <select name="script-language" id="script-language">
                <option value="English"></option>
                <option value="Hinglish"></option>
              </select> */}
              <input
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    script_language: e.target.value,
                  }))
                }
                value={input.script_language}
                type="text"
                placeholder="Script Language"
              />
              <input
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    video_length: e.target.value,
                  }))
                }
                value={input.video_length}
                type="text"
                placeholder="Video Length (minutes)"
              />
            </div>
            <div className="multi-inputs">
              <input
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    target_audience: e.target.value,
                  }))
                }
                value={input.target_audience}
                type="text"
                placeholder="Target Audience"
              />
              <input
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    audience_region: e.target.value,
                  }))
                }
                value={input.audience_region}
                type="text"
                placeholder="Audience Region"
              />
              {/* <select name="audience-region" id="audience-region">
                <option value="International"></option>
                <option value="India"></option>
              </select> */}
            </div>
            <div className="multi-inputs">
              <input
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, tone: e.target.value }))
                }
                value={input.tone}
                type="text"
                placeholder="Tone"
              />
              <input
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, niche: e.target.value }))
                }
                value={input.niche}
                type="text"
                placeholder="Niche/Industry"
              />
            </div>
            <input
              onChange={(e) =>
                setInput((prev) => ({ ...prev, viewers_gain: e.target.value }))
              }
              value={input.viewers_gain}
              type="text"
              placeholder="What viewers will gain"
            />
            <button onClick={handleScriptGeneration}>Generate</button>
            <button onClick={clearData}>Clear</button>
          </div>
          {/* animation */}
          {loading ? (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          ) : null}
          {showresult ? (
            <div className="response-section">
              <div className="video-script section">
                <h3>SCRIPT</h3>
                <div className="card">
                  <p>
                    {/* {result.script} */}
                    *[Opening Hook – 0:00 to 0:15]* (Upbeat background music,
                    energetic tone) *Narrator:* "Hey there, future millionaires!
                    🚀 Are you a student tired of living on instant noodles
                    because your wallet’s always empty? What if I told you
                    there’s a way to make money while you sleep, study, or
                    binge-watch your favorite shows? That’s right—passive income
                    is your golden ticket! Stick around because today, I’m
                    revealing *5 legit passive income ideas* perfect for
                    students. No scams, no crazy skills—just smart strategies.
                    Let’s dive in!" (Cut to flashy title screen: **"5 Passive
                    Income Ideas for Students") --- *[Main Content – 0:16 to
                    4:30]* *1. Sell Digital Products (0:16 – 1:00)* (Visual:
                    Laptop screen showing Canva/Etsy store) *Narrator:* "First
                    up—*digital products. Think printables, resume templates, or
                    study guides. Websites like Etsy or Gumroad let you sell
                    these *once and earn forever. No inventory, no shipping—just
                    pure profit. Pro tip: Use free tools like Canva to design
                    eye-catching templates!" *2. Affiliate Marketing (1:01 –
                    1:45)* (Visual: Amazon affiliate link example) *Narrator:*
                    "Next, *affiliate marketing*. Share products you love (like
                    textbooks or tech) with unique links. When someone buys, you
                    earn a commission! Start with Amazon Associates or niche
                    blogs. Drop links in your Instagram bio or YouTube
                    descriptions—easy money!" *3. Create a YouTube Channel (1:46
                    – 2:30)* (Visual: Phone recording a study vlog) *Narrator:*
                    "Speaking of YouTube—why not start your own channel?
                    Monetize with ads, sponsorships, or memberships. Even if
                    you’re camera-shy, faceless channels (like study music or AI
                    tutorials) work too. Consistency is key—just 1 video a week
                    can grow your income!" *4. Invest in Stocks or ETFs (2:31 –
                    3:15)* (Visual: Stock market graph on phone screen)
                    *Narrator:* "Number 4—*investing*. Apps like Robinhood or
                    Acorns let you start with just $5. ETFs (like S&P 500) are
                    low-risk and grow over time. Remember: Time in the market
                    beats timing the market. Small investments today = big
                    rewards later!" *5. Sell Online Courses (3:16 – 4:00)*
                    (Visual: Udemy/Course creation platform) *Narrator:* "Last
                    but not least—*online courses*. Good at math, coding, or
                    even TikTok dances? Package your skills into a course!
                    Platforms like Udemy or Teachable handle hosting. Charge
                    once, earn forever—even from your dorm room!" (Cut to recap
                    montage of all 5 ideas with upbeat music) --- *[Conclusion &
                    CTA – 4:31 to 5:00]* (Visual: Narrator smiling at camera)
                    *Narrator:* "Boom! 💥 Five realistic ways to build passive
                    income as a student. No get-rich-quick schemes—just
                    actionable steps. Pick one idea today and start small.
                    Remember, every billionaire started with a single dollar.
                    *Now, I want to hear from YOU!* Drop a comment below: Which
                    idea excites you the most? And if you found this helpful,
                    smash that like button, subscribe, and hit the bell—because
                    more money-making tips are coming your way! Until next
                    time—keep hustling, stay smart, and let’s make that passive
                    income dream a reality. Catch you in the next video! 👋"
                    (Outro screen: Subscribe animation + social handles) *[End
                    of Video]*{" "}
                  </p>
                  <button>Regenerate</button>
                </div>
              </div>
              <div className="video-title section">
                <h3>VIDEO TITLE</h3>
                <div className="card">
                  <p>
                    1. 5 Easy Passive Income Ideas for Students (2024) 2. How
                    Students Make $500/Month Online (Passive Income!) 3. 5 Side
                    Hustles for Students – Earn While You Study!
                  </p>
                  <button>Regenerate</button>
                </div>
              </div>
              <div className="video-description section">
                <h3>VIDEO DESCRIPTION</h3>
                <div className="card">
                  <p>
                    Are you a college student looking to make money online
                    without sacrificing your studies? In this video, I’ll share
                    *5 proven passive income ideas* that can help you earn extra
                    cash with minimal effort. Whether you want to pay off
                    student loans, save for the future, or just have more
                    spending money, these strategies are perfect for busy
                    students! ### *🔑 Key Benefits:* ✅ *Work from anywhere* –
                    No need for a 9-5 job ✅ *Flexible & scalable* – Earn while
                    focusing on your studies ✅ *Low to no startup costs* –
                    Perfect for students on a budget ✅ *Build long-term wealth*
                    – Some ideas keep paying you for years! ### *📌 Video
                    Timestamps:* 00:00 – Intro 01:15 – #1: Affiliate Marketing
                    (Earn commissions while you sleep!) 03:42 – #2: Selling
                    Digital Products (No inventory needed!) 05:30 – #3: YouTube
                    Automation (Make money with faceless videos) 07:15 – #4:
                    Investing in Dividend Stocks (Small amounts add up!) 09:00 –
                    #5: Print-on-Demand (Turn designs into passive income) 10:50
                    – Bonus Tip (How to maximize your earnings!) ### *📢 Take
                    Action Now!* Which passive income idea excites you the most?
                    Drop a comment below and let me know! Don’t forget to *like,
                    subscribe, and hit the bell* 🔔 so you never miss
                    money-making tips for students. ### *🚀 Want More?* 📩 Join
                    my *FREE Passive Income Guide for Students* → [Insert Link]
                    💬 Follow me on Instagram/TikTok for daily tips →
                    [@YourHandle] ### *#PassiveIncome #StudentHustle
                    #MakeMoneyOnline #SideHustle #FinancialFreedom* 🔥 *Turn
                    your spare time into income—start today!* 🔥
                  </p>
                  <button>Regenerate</button>
                </div>
              </div>
              <div className="video-tags section">
                <h3>VIDEO TAGS</h3>
                <div className="card">
                  <p>
                    passive income, passive income for students, how to earn
                    money online, side hustles for students, online income
                    ideas, best passive income 2024, make money online, student
                    finance, easy passive income, work from home for students,
                    college side hustles, digital nomad student, financial
                    freedom, passive income streams, part-time online jobs,
                    student entrepreneur, make money while studying, online
                    business ideas, passive income tips, earn money from home
                  </p>
                  <button>Regenerate</button>
                </div>
              </div>
              <div className="thumbnail-text section">
                <h3>THUMBNAIL TEXT</h3>
                <div className="card">
                  <p>
                    1. *Earn While You Learn!* 2. *Cash Without Quitting Class!*
                    3. *Student Side Hustles That Pay!*
                  </p>
                  <button>Regenerate</button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Main;
