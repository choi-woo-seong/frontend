"use client"

/**
 * 챗봇 버튼 컴포넌트
 * 사용자가 챗봇과 대화할 수 있는 버튼과 대화창을 제공합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState } from "react"
import "./ChatbotButton.css"

/**
 * 챗봇 버튼 컴포넌트
 * @returns {JSX.Element} 챗봇 버튼 컴포넌트
 */
function ChatbotButton() {
  // 챗봇 창 열림 상태 관리
  const [isOpen, setIsOpen] = useState(false)
  // 메시지 목록 상태 관리
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "안녕하세요! 실버타운, 요양원, 양로원 찾기를 도와드릴까요?",
      isBot: true,
    },
  ])
  // 현재 입력 메시지 상태 관리
  const [inputMessage, setInputMessage] = useState("")

  /**
   * 메시지 전송 처리 함수
   * @param {Event} e - 이벤트 객체
   */
  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!inputMessage.trim()) return

    // 사용자 메시지 추가
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    /**
     * 백엔드 연동 포인트:
     * 챗봇 API 호출하여 응답 받기
     *
     * 예시:
     * axios.post('/api/chatbot', { message: inputMessage })
     *   .then(response => {
     *     const botMessage = {
     *       id: Date.now() + 1,
     *       text: response.data.message,
     *       isBot: true,
     *     };
     *     setMessages(prev => [...prev, botMessage]);
     *   })
     *   .catch(error => {
     *     console.error('챗봇 응답을 받아오는데 실패했습니다:', error);
     *     const errorMessage = {
     *       id: Date.now() + 1,
     *       text: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
     *       isBot: true,
     *     };
     *     setMessages(prev => [...prev, errorMessage]);
     *   });
     */

    // 임시 봇 응답 (백엔드 연동 전)
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: "더 자세한 정보가 필요하시면 말씀해주세요. 어떤 지역의 시설을 찾고 계신가요?",
        isBot: true,
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3 className="chatbot-title">실시간 상담</h3>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chatbot-message ${message.isBot ? "bot" : "user"}`}>
                {message.text}
              </div>
            ))}
          </div>

          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="메시지를 입력하세요..."
              className="chatbot-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn">
              전송
            </button>
          </form>
        </div>
      )}

      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </button>
    </div>
  )
}

export default ChatbotButton
