"use client"

/**
 * 검색 바 컴포넌트
 * 사용자가 시설을 검색할 수 있는 검색 바를 제공합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./SearchBar.css"

/**
 * 검색 바 컴포넌트
 * @returns {JSX.Element} 검색 바 컴포넌트
 */
function SearchBar() {
  // 활성 탭 상태 관리
  const [activeTab, setActiveTab] = useState("실버타운")
  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("")

  // 라우터 네비게이션 훅
  const navigate = useNavigate()

  // 탭 정의
  const tabs = [
    { id: "실버타운", label: "실버타운", path: "silver-town" },
    { id: "양로원", label: "양로원", path: "elderly-home" },
    { id: "요양원", label: "요양원", path: "nursing-home" },
  ]

  /**
   * 검색 제출 처리 함수
   * @param {Event} e - 이벤트 객체
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    // 현재 활성 탭에 해당하는 경로 찾기
    const currentTab = tabs.find((tab) => tab.id === activeTab)

    if (currentTab && searchTerm.trim()) {
      // 검색어와 함께 해당 시설 유형 페이지로 이동
      navigate(`/facilities/${currentTab.path}?search=${encodeURIComponent(searchTerm)}`)

      /**
       * 백엔드 연동 포인트:
       * 검색 기록 저장 또는 분석을 위한 API 호출
       *
       * 예시:
       * axios.post('/api/search/log', {
       *   term: searchTerm,
       *   facilityType: activeTab
       * });
       */
    }
  }

  return (
    <div className="search-bar">
      <div className="search-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`search-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="검색하고 지역명, 지하철역, 단지명(아파트명)을 입력해주세요."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  )
}

export default SearchBar
