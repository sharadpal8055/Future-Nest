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
        "Hey! I'm FutureNestMate 👋\n"
        "What do you want to learn or explore today?"
    ),

    "course_search": (
        "Sure! I can help you find a course.\n"
        "You can explore courses in Python, React, JavaScript, DSA, and more."
    ),

    "technical_issue": (
        "I can help with that.\n\n"
        "Please tell me:\n"
        "1. Which page or feature you're using\n"
        "2. What you were trying to do\n"
        "3. The error message you received"
    ),

    "about_bot": (
        "I'm FutureNestMate 🤖, the learning assistant for FutureNest.\n"
        "I can help you find courses, explore resources, "
        "prepare for interviews, and troubleshoot common issues."
    ),

    "help": (
        "Sure, I can help! 😎\n\n"
        "You can ask me about:\n"
        "• Courses\n"
        "• Learning resources\n"
        "• Interview preparation\n"
        "• Technical issues\n"
        "• Your learning journey"
    ),

    "interview_prep": (
        "Absolutely! 💼\n"
        "You can use FutureNest's interview preparation section "
        "to practice subject-wise questions."
    ),

    "saved_resources": (
        "You can save useful websites and learning resources "
        "in your Saved Resources section."
    ),

    "course_progress": (
        "You can track your learning progress from "
        "the My Courses section."
    ),
}


DEFAULT_RESPONSE = (
    "I'm FutureNestMate 🤖.\n\n"
    "I can help you with courses, learning resources, "
    "interview preparation, and technical issues."\
    "for any further query mail to sp6430161@gmail.com"
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