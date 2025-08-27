from flask import Flask, render_template, request, jsonify
import nltk
from nltk.chat.util import Chat, reflections

# Download NLTK data (only once)
nltk.download('punkt')

app = Flask(__name__)

# Define chatbot patterns and responses
pairs = [
    [r"hi|hello|d", ["Hello! 👋 How can I help you today?"]],
    [r"how are you ?", ["I'm doing great 😃. How about you?"]],
    [r"what is your name ?", ["I’m your friendly ChatBot 🤖"]],
    [r"bye|goodbye", ["Goodbye! Have a wonderful day 🌸"]],
    [r"(.*) your help (.*)", ["Of course! Tell me more about what you need 📝"]],
    [r"(.*)", ["Sorry, I didn't quite get that 🤔"]],
]

chatbot = Chat(pairs, reflections)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def chatbot_response():
    data = request.get_json()
    user_msg = data.get("msg", "")
    reply = chatbot.respond(user_msg)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
