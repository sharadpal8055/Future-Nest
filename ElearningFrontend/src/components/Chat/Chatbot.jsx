import { useEffect } from "react";
import chatbotIcon from "../../assets/chatbot-icon.png";
export default function Chatbot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="FutureNestMate"
      agent-id="e58f1de5-1217-4f08-9154-1b8f0e96e5aa"
      language-code="en"
       chat-icon={chatbotIcon}
    ></df-messenger>
  );
}