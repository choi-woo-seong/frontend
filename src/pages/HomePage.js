"use client"

/**
 * 홈페이지 컴포넌트
 * 웹사이트의 메인 페이지를 렌더링합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import FacilityTypeButtons from "../components/FacilityTypeButtons"
import ChatbotButton from "../components/ChatbotButton"
import "./HomePage.css"

function HomePage() {
  const [recommendedFacilities, setRecommendedFacilities] = useState([])
  const [welfareNews, setWelfareNews] = useState([])
  const [governmentPrograms, setGovernmentPrograms] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const navigate = useNavigate()

  const filteredFacilities =
    selectedCategory === "전체"
      ? recommendedFacilities
      : recommendedFacilities.filter((f) => f.type.includes(selectedCategory))

  useEffect(() => {
    const loadData = async () => {
      try {
        setRecommendedFacilities([
          {
            id: 1,
            title: "행복한 실버타운",
            location: "서울시 강남구 역삼동",
            type: ["실버타운"],
            price: "월 150만원~",
            image: "/facility-1.jpg",
          },
          {
            id: 2,
            title: "편안한 요양원",
            location: "서울시 서초구 반포동",
            type: ["요양원"],
            price: "월 180만원~",
            image: "/facility-2.jpg",
          },
          {
            id: 3,
            title: "푸른 양로원",
            location: "경기도 고양시 일산동구",
            type: ["양로원"],
            price: "월 120만원~",
            image: "/facility-3.jpg",
          },
        ])

        setWelfareNews([
          {
            id: 1,
            title: "노인 복지 서비스 확대 계획 발표",
            date: "2025.04.15",
            summary: "보건복지부는 내년부터 노인 복지 서비스를 확대하는 계획을 발표했습니다.",
          },
          {
            id: 2,
            title: "치매 예방 프로그램 성과 발표",
            date: "2025.04.10",
            summary: "국립 노인 건강 연구소에서 진행한 치매 예방 프로그램이 큰 성과를 거두었다고 발표했습니다.",
          },
        ])

        setGovernmentPrograms([
          {
            id: 1,
            title: "노인 장기 요양 보험",
            organization: "국민건강보험공단",
            summary: "65세 이상 노인 또는 노인성 질병이 있는 자를 대상으로 지원하는 제도",
          },
          {
            id: 2,
            title: "노인 맞춤 돌봄 서비스",
            organization: "보건복지부",
            summary: "일상생활이 어려운 노인에게 돌봄 서비스를 제공하는 정부 프로그램",
          },
        ])

        setAnnouncements([
          {
            id: 1,
            title: "[공지] 직방 동행봉사 정보 및 이벤트 수신 안내",
            date: "2025.04.15",
          },
          {
            id: 2,
            title: "[공지] 직방 개인정보 처리방침 개정 안내",
            date: "2025.04.10",
          },
        ])
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="home-page">
      <Navbar />

      {/* 히어로 섹션 */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">어떤 집을 찾고 계세요?</h1>
          <div className="hero-search">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* 시설 유형 섹션 */}
      <section className="section facility-types-section">
        <div className="container">
          <h2 className="section-title">시설 유형 선택</h2>
          <FacilityTypeButtons />
        </div>
      </section>

      {/* 추천 시설 섹션 */}
      <section className="section recommended-section">
        <div className="container">
          <h2 className="section-title">맞춤 추천 시설</h2>

          <div className="category-tabs">
            {["전체", "실버타운", "요양원", "양로원"].map((category) => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-indicator">시설 정보를 불러오는 중...</div>
          ) : (
            <div className="recommended-facilities">
              {filteredFacilities.map((facility) => (
                <div key={facility.id} className="facility-card">
                  <div className="facility-image">
                    <img
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.title}
                      onClick={() => navigate(`/facility/${facility.id}`)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="facility-info">
                    <h3 className="facility-title">{facility.title}</h3>
                    <div className="facility-location">
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
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{facility.location}</span>
                    </div>
                    <div className="facility-details">
                      <span className="facility-type">{facility.type[0]}</span>
                      <span className="facility-price">{facility.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 정보 섹션 */}
      <section className="section info-section">
        <div className="container">
          <div className="info-grid">
            {/* 복지 뉴스 */}
            <div className="info-card">
              <h3 className="info-title">복지 뉴스</h3>
              <div className="info-content">
                {welfareNews.map((news) => (
                  <div key={news.id} className="info-item">
                    <h4 className="info-item-title">{news.title}</h4>
                    <p className="info-item-date">{news.date}</p>
                    <p className="info-item-summary">{news.summary}</p>
                  </div>
                ))}
              </div>
              <a href="/welfare-news" className="info-link">더보기</a>
            </div>

            {/* 정부 프로그램 */}
            <div className="info-card">
              <h3 className="info-title">정부 지원 프로그램</h3>
              <div className="info-content">
                {governmentPrograms.map((program) => (
                  <div key={program.id} className="info-item">
                    <h4 className="info-item-title">{program.title}</h4>
                    <p className="info-item-organization">{program.organization}</p>
                    <p className="info-item-summary">{program.summary}</p>
                  </div>
                ))}
              </div>
              <a href="/government-programs" className="info-link">더보기</a>
            </div>

            {/* 공지사항 */}
            <div className="info-card">
              <h3 className="info-title">공지사항</h3>
              <div className="info-content">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="info-item">
                    <h4 className="info-item-title">{announcement.title}</h4>
                    <p className="info-item-date">{announcement.date}</p>
                  </div>
                ))}
              </div>
              <a href="/notices" className="info-link">더보기</a>
            </div>

            {/* 광고 · 제휴 */}
            <div className="info-card">
              <h3 className="info-title">광고·제휴</h3>
              <div className="info-content">
                <div className="info-item">
                  <h4 className="info-item-title">일반광고문의</h4>
                  <div className="info-item-image">
                    <img src="/advertising-concept.png" alt="광고 문의" />
                  </div>
                </div>
                <div className="info-item">
                  <h4 className="info-item-title">관계자 가입 및 상품 문의</h4>
                  <div className="info-item-image">
                    <img src="/neighborhood-real-estate.png" alt="관계자 가입 문의" />
                  </div>
                </div>
              </div>
              <a href="/ad-inquiry" className="info-link">더보기</a>
            </div>
          </div>
        </div>
      </section>

      {/* 챗봇 버튼 */}
      <ChatbotButton />
    </div>
  )
}

export default HomePage
