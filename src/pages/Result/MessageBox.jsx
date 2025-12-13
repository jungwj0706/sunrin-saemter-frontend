import React, { useState } from "react";

const MessageBox = ({ receiverEmail, teacherName }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null); // 'success', 'error', null

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setMessageStatus({ type: "error", text: "메시지를 입력해주세요." });
      return;
    }

    setIsLoading(true);
    setMessageStatus(null);

    try {
      const token = sessionStorage.getItem("id_token");
      const backendUrl =
        import.meta.env.VITE_API_URL || "https://sunrinsaemter.pixelhize.xyz";

      const response = await fetch(`${backendUrl}/api/msg/message/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver_email: receiverEmail,
          content: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 응답 데이터 파싱
      // await response.json();

      // 성공
      setMessageStatus({
        type: "success",
        text: `${teacherName} 선생님에게 메시지가 전송되었습니다.`,
      });
      setMessage(""); // 입력창 비우기

      // 3초 후 성공 메시지 자동 제거
      setTimeout(() => {
        setMessageStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Message send error:", error);
      setMessageStatus({
        type: "error",
        text: "메시지 전송에 실패했습니다. 다시 시도해주세요.",
      });

      // 5초 후 에러 메시지 자동 제거
      setTimeout(() => {
        setMessageStatus(null);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="message-container">
      <div className="message-input-group">
        <input
          type="text"
          className="message-input"
          placeholder="쪽지 보내기"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          maxLength={500} // 메시지 최대 길이 제한
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? (
            <div className="loading-spinner">⟳</div>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>

      {messageStatus && (
        <div className={`message-status ${messageStatus.type}`}>
          {messageStatus.text}
        </div>
      )}
    </div>
  );
};

export default MessageBox;
