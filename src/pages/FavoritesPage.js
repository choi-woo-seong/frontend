"use client"

/**
 * 관심 목록 페이지 컴포넌트
 * 사용자가 관심 목록에 추가한 시설을 표시합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState } from "react"
import { Link } from "react-router-dom"
import { useFavorites } from "../contexts/FavoritesContext"
import Navbar from "../components/Navbar"
import FacilityCard from "../components/FacilityCard"
import ChatbotButton from "../components/ChatbotButton"
import "./FavoritesPage.css"

/**
 * 관심 목록 페이지 컴포넌트
 * @returns {JSX.Element} 관심 목록 페이지 컴포넌트
 */
function FavoritesPage() {
  // 관심 목록 컨텍스트에서 관심 목록 가져오기
  const { favorites, loading } = useFavorites()

  // 정렬 상태 관리
  const [sortBy, setSortBy] = useState("recent") // recent, price-asc, price-desc

  // 정렬된 관심 목록 계산
  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === "recent") {
      // 최근 추가 순 (ID가 높을수록 최근에 추가된 것으로 가정)
      return b.id - a.id
    } else if (sortBy === "price-asc" || sortBy === "price-desc") {
      // 가격 정보에서 숫자만 추출
      const priceA = Number.parseInt(a.price.match(/\d+/)[0])
      const priceB = Number.parseInt(b.price.match(/\d+/)[0])

      return sortBy === "price-asc" ? priceA - priceB : priceB - priceA
    }
    return 0
  })

  /**
   * 정렬 변경 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div className="favorites-page">
      <Navbar />

      <div className="container">
        <div className="favorites-header">
          <h1 className="page-title">관심 목록</h1>

          {favorites.length > 0 && (
            <div className="sort-container">
              <label htmlFor="sort-select" className="sort-label">
                정렬:
              </label>
              <select id="sort-select" className="sort-select" value={sortBy} onChange={handleSortChange}>
                <option value="recent">최근 추가 순</option>
                <option value="price-asc">가격 낮은 순</option>
                <option value="price-desc">가격 높은 순</option>
              </select>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading-indicator">관심 목록을 불러오는 중...</div>
        ) : favorites.length > 0 ? (
          <div className="favorites-grid">
            {sortedFavorites.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} showRemoveButton={true} />
            ))}
          </div>
        ) : (
          <div className="empty-favorites">
            <div className="empty-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h2 className="empty-title">관심 시설이 없습니다</h2>
            <p className="empty-message">마음에 드는 시설의 하트 아이콘을 클릭하여 관심목록에 추가해보세요.</p>
            <Link to="/" className="browse-button">
              시설 둘러보기
            </Link>
          </div>
        )}
      </div>

      <ChatbotButton />
    </div>
  )
}

export default FavoritesPage
