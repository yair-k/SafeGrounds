import React, { useState, useRef, useEffect } from "react";
import { Brain, Star } from "lucide-react";
import { useGeneral } from "@/context/generalContext";
import GenerateAssessment from "./GenerateAssessment";

const SUGGESTED_PROMPTS = [
  "What is the landral composition here?",
  "How is the local ecosystem impacted?",
  "Show me the latest safety regulations",
  "What is the current mining output?",
  "Any recent community feedback?",
];

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([
    "🤖: Hello, how can I help you?",
  ]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const { landData, selectedlandID, setNumFeedback, position } = useGeneral();
  const selectedland = landData.find((land) => land.id === selectedlandID);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Scroll to bottom on initial render
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Rating form submission
  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Submitted rating: ${rating}, feedback: ${feedback}`);
    setNumFeedback((prev) => prev + 1);
    setRating(0);
    setFeedback("");
    window.alert("Feedback Submitted");
  };

  // Chat form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: message,
          land_name: selectedland,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      const data = await response.json();
      setChatHistory((prev) => [
        ...prev,
        `You: ${message}`,
        `🤖: ${data.response}`,
      ]);
      setMessage("");
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Insert suggestion into message input
  const handleSuggestionClick = (prompt: string) => {
    setMessage(prompt);
    setShowSuggestions(false);
  };

  return (
    /**
     * 1) Main outer container:
     *    - Uses the full width (w-full), and a max height so it doesn't scroll off-screen.
     *    - `overflow-hidden` so the page itself doesn't scroll.
     */
    <div className="flex flex-col w-full max-h-[calc(100vh-20px)] bg-[#121212] text-gray-100 overflow-hidden">

      {/* Optional: If there's a selected land, show assessment generator at the top */}
      {selectedlandID && (
        <div className="p-2">
          <GenerateAssessment
            selectedlandName={selectedland?.location}
            locationId={selectedlandID}
          />
        </div>
      )}

      {/* 2) Chat Container:
          - `flex-1` so it stretches to fill remaining vertical space in this layout.
          - `mx-0` removes side margins, `overflow-hidden` ensures internal scrolling, not page scrolling.
       */}
      <div className="flex flex-col flex-1 border border-gray-700 rounded-xl mx-0 p-4 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center mb-4">
          <Brain size={24} className="text-[#88D66C] mr-2" />
          <h2 className="text-lg font-semibold">AI Assistant Connected</h2>
        </div>

        {/* Chat History:
            - `flex-grow overflow-y-auto` allows the chat messages to scroll internally.
        */}
        <div className="flex-grow overflow-y-auto space-y-3 pr-1">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`w-fit max-w-[80%] rounded-lg px-4 py-2 text-sm break-words ${
                msg.startsWith("You:")
                  ? "ml-auto bg-[#2c2c2c] text-green-100"
                  : "mr-auto bg-[#1f1f1f] text-gray-100 border border-gray-600"
              }`}
            >
              {msg}
            </div>
          ))}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {isLoading && <LoadingSpinner />}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input + Suggestions Toggle */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="relative flex flex-col">
            {/* Suggestions Toggle + Panel */}
            <div className="flex justify-end mb-2 relative">
              <button
                type="button"
                onClick={() => setShowSuggestions((prev) => !prev)}
                className="text-xs bg-[#1f1f1f] border border-gray-600 px-2 py-1 rounded-full text-[#88D66C] hover:bg-[#272727] focus:outline-none"
              >
                {showSuggestions ? "Hide Suggestions" : "Show Suggestions"}
              </button>
              {showSuggestions && (
                /**
                 * `bottom-full` to ensure the panel appears above the button
                 * `right-0` keeps it aligned to the right edge
                 */
                <div className="absolute bottom-full mb-2 w-64 p-2 bg-[#1a1a1a] border border-gray-600 rounded-lg shadow-lg right-0">
                  <p className="text-gray-400 mb-2 text-xs">Try a prompt:</p>
                  <div className="flex flex-col space-y-2">
                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSuggestionClick(prompt)}
                        className="w-full text-left text-sm bg-[#252525] p-2 rounded hover:bg-[#2d2d2d] focus:outline-none"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Text Input & Send Button */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Ask about ${
                  selectedland ? selectedland.location : "the land"
                }...`}
                className="flex-grow bg-[#1f1f1f] text-sm text-gray-100 px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#88D66C]"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-3 py-2 text-sm font-bold bg-[#88D66C] text-black rounded-lg hover:bg-[#a8e89d] focus:outline-none disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* 3) Feedback / Additional Interaction: placed at the bottom (but still within max-h). */}
      {selectedland && (
        <div className="mt-2 bg-[#1f1f1f] p-4 rounded-xl border border-gray-700 mx-0">
          <form onSubmit={handleRatingSubmit}>
            {/* Dynamic Title */}
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              {position === "Community 👨‍👩‍👧‍👦" &&
                `⭐️ Rate your experience at ${selectedland.location}`}
              {position === "Government 🧑‍⚖️" &&
                `🚧 Announce a Regulation at ${selectedland.location}`}
              {position === "Mining Site Representative 🏭" &&
                `🧑‍🔧 Resolve an Issue at ${selectedland.location}`}
            </label>

            {/* Stars (Community) */}
            {position === "Community 👨‍👩‍👧‍👦" && (
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    onClick={() => setRating(star)}
                    className={`mr-1 cursor-pointer ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Feedback TextArea */}
            <div className="mb-3">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full text-sm p-3 bg-[#2c2c2c] text-gray-100 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#88D66C]"
                rows={3}
                placeholder={
                  position === "Community 👨‍👩‍👧‍👦"
                    ? "Please share your issues"
                    : position === "Government 🧑‍⚖️"
                    ? "Write your regulation title or details here..."
                    : "Describe the issue you plan to resolve..."
                }
              />
            </div>

            {/* Submit Feedback Button */}
            <button
              type="submit"
              className="bg-[#88D66C] text-black font-bold py-2 px-4 rounded hover:bg-[#a8e89d] focus:outline-none"
            >
              {position === "Community 👨‍👩‍👧‍👦" && `Submit Issue`}
              {position === "Government 🧑‍⚖️" && `Announce a Regulation`}
              {position === "Mining Site Representative 🏭" && `Resolve an Issue`}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center">
    <div className="relative w-8 h-8 rounded-full animate-spin border-4 border-dashed border-[#88D66C] border-t-transparent"></div>
  </div>
);
