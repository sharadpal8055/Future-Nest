from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# =========================================================
# CONFIGURATION
# =========================================================

app.config["JSON_SORT_KEYS"] = False


# =========================================================
# RESPONSES
# =========================================================

RESPONSES = {

    "greeting": (
        "Haan bhai, aa gaye? 😒😂\n\n"
        "Chal bata, kya seekhna hai?\n"
        "Course chahiye, interview ki tayari karni hai, "
        "ya bas timepass karne aaye ho? 🙄"
    ),

    "course_search": (
        "Course chahiye? Wah, aaj toh padhne ka mood ban gaya. 😂\n\n"
        "Chal theek hai, main help karta hoon.\n"
        "Python, React, JavaScript, DSA aur aur bhi courses available hain.\n\n"
        "Ab bata kya seekhna hai — "
        "aise hawa mein mat latko. 😑"
    ),

    "technical_issue": (
        "Haan haan, website toot gayi. 😑😂\n\n"
        "Lekin sirf \"nahi chal raha\" bolke main jadugar thodi hoon.\n\n"
        "Seedha ye details bhej:\n"
        "1. Kaunsa page ya feature use kar rahe the?\n"
        "2. Kya karne ki koshish kar rahe the?\n"
        "3. Exact error message kya aa raha hai?\n\n"
        "Details de bhai, warna main bhi bol dunga "
        "\"mere side toh sab chal raha hai\". 😂🔧"
    ),

    "about_bot": (
        "Arre bhai, itna bhi nahi pata? 😭\n\n"
        "Main FutureNestMate hoon 🤖 — FutureNest ka learning assistant.\n\n"
        "Courses dhoondhne hain?\n"
        "Interview ki tayari karni hai?\n"
        "Resources chahiye?\n"
        "Technical issue solve karna hai?\n\n"
        "Haan, ye sab kar leta hoon.\n"
        "Ab bata kya kaam hai, biography nahi sunani. 😎"
    ),

    "help": (
        "Help chahiye? Finally kisi ne sahi question poocha. 😂\n\n"
        "Main in cheezon mein help kar sakta hoon:\n"
        "• 📚 Courses\n"
        "• 🔗 Learning resources\n"
        "• 💼 Interview preparation\n"
        "• 🛠️ Technical issues\n"
        "• 🎯 Learning journey\n\n"
        "Ab options dekh ke bhi confused ho toh phir main kya hi karun. 😑"
    ),

    "interview_prep": (
        "Interview ki tayari karni hai? 😏\n\n"
        "Accha hai, warna interview mein interviewer tumhari tayari karwa deta. 😂\n\n"
        "FutureNest par subject-wise interview questions se practice kar sakte ho.\n\n"
        "Chal jaa, practice kar. Sirf mujhe message karke job nahi milegi. 💀💼"
    ),

    "saved_resources": (
        "Resources save karne hain? Haan bhai, ye kaam useful hai. 😂\n\n"
        "Useful websites, documentation, tutorials aur study resources "
        "My Links / Saved Resources mein save kar sakte ho.\n\n"
        "Bas save karke kabhi kholna bhi. "
        "Bookmarks ka museum mat bana dena. 😭🔗"
    ),

    "course_progress": (
        "Apni progress dekhni hai? 👀\n\n"
        "My Courses section mein jao.\n"
        "Wahin pata chalega kitna padha hai aur kitna bas "
        "\"kal se pakka padhunga\" wala drama chal raha hai. 😂📚\n\n"
        "Progress check kar aur kaam pe lag."
    ),
}


DEFAULT_RESPONSE = (
    "Bhai ye kya pooch liya? 😭😂\n\n"
    "Mujhe samajh nahi aaya.\n"
    "Seedha sawaal pooch — courses, resources, "
    "interview preparation ya technical issue.\n\n"
    "Random bakchodi ke liye koi aur mil jayega. 😑\n\n"
    "For any further query, mail to sp6430161@gmail.com — "
    "ispar mail kar, mera time kharab mat kar, Modi ji se meeting hai. 😎🇮🇳"
)


# =========================================================
# HEALTH CHECK
# =========================================================

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "OK",
        "message": "FutureNestMate API is running"
    }), 200


# =========================================================
# HOME
# =========================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "OK",
        "service": "FutureNestMate Chatbot API"
    }), 200


# =========================================================
# DIALOGFLOW WEBHOOK
# =========================================================

@app.route("/webhook", methods=["POST"])
def webhook():

    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "fulfillmentText": "I couldn't understand your request."
            }), 200

        query_result = data.get("queryResult", {})

        # User query
        query = query_result.get("queryText", "")

        # Detected intent
        intent = query_result.get("intent", {})
        intent_name = intent.get("displayName", "")

        # Get response based on intent
        response_text = RESPONSES.get(
            intent_name,
            DEFAULT_RESPONSE
        )

        # Production logging
        app.logger.info(
            "Dialogflow request | query=%s | intent=%s",
            query,
            intent_name
        )

        return jsonify({
            "fulfillmentText": response_text
        }), 200

    except Exception:
        app.logger.exception("Dialogflow webhook error")

        return jsonify({
            "fulfillmentText": (
                "Sorry, something went wrong. "
                "Please try again."
            )
        }), 200


# =========================================================
# ERROR HANDLERS
# =========================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Route not found"
    }), 404


@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        "error": "Method not allowed"
    }), 405


@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
        "error": "Internal server error"
    }), 500


# =========================================================
# START SERVER
# =========================================================

if __name__ == "__main__":

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )