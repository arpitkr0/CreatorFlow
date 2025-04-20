from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import requests

app = Flask(__name__)
CORS(app)

# Supabase credentials
SUPABASE_URL = "https://zqwjecllcuxkrttbdinc.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxd2plY2xsY3V4a3J0dGJkaW5jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTA3MTY2NywiZXhwIjoyMDYwNjQ3NjY3fQ.uDnq-UMKG1SjV0Xg0WQTdIs7kVh_oKqZzIYbFKDaqus"  # Use Service Role key here
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Function to store user
def store_in_supabase(name, email, clerk_id):
    response = supabase.table("users").insert({
        "name": name,
        "email": email,
        "clerk_id": clerk_id
    }).execute()
    return response

def store_input_data(video_topic, script_language, target_audience, audience_region, tone, niche, viewers_gain):
    response = supabase.table("input").insert({
        "video_topic": video_topic,
        "script_language": script_language,
        "target_audience": target_audience,
        "audience_region": audience_region,
        "tone": tone,
        "niche": niche,
        "viewers_gain": viewers_gain
    }).execute()
    return response

# Example route
@app.route("/register", methods=["POST"])
def save_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    clerk_id = data.get("clerk_id")

    result = store_in_supabase(name, email, clerk_id)
    return jsonify(result.data), 200

@app.route("/generate", methods=["POST"])
def generate():
    data= request.json
    video_topic= data.get("video_topic")
    script_language= data.get("script_language")
    target_audience= data.get("target_audience")
    audience_region= data.get("audience_region")
    tone= data.get("tone")
    niche= data.get("niche")
    viewers_gain= data.get("viewers_gain")

    input_data = store_input_data(video_topic, script_language, target_audience, audience_region, tone, niche, viewers_gain)

    url = "https://example.com/api/submit"
    payload={
        "video_topic": video_topic,
        "script_language": script_language,
        "target_audience": target_audience,
        "audience_region": audience_region,
        "tone": tone,
        "niche": niche,
        "viewers_gain": viewers_gain
    }
    response = requests.post(url, json=payload)
    return response


if __name__ == "__main__":
    app.run(debug=True)
