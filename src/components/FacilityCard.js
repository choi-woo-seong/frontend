"use client"

/**
 * 시설 카드 컴포넌트
 * 시설 정보를 카드 형태로 표시합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { Link } from "react-router-dom"
import { useFavorites } from "../contexts/FavoritesContext"
import ImageWithFallback from "./ImageWithFallback"
import "./FacilityCard.css"

/**
 * 시설 카드 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.facility - 시설 정보 객체
 * @param {boolean} props.showRemoveButton - 관심 목록에서 제거 버튼 표시 여부
 * @returns {JSX.Element} 시설 카드 컴포넌트
 */
function FacilityCard({ facility, showRemoveButton = false }) {
  // 관심 목록 컨텍스트에서 관련 함수 가져오기
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  // 현재 시설이 관심 목록에 있는지 확인
  const isInFavorites = isFavorite(facility.id)

  /**
   * 관심 목록 토글 핸들러
   * @param {Event} e - 이벤트 객체
   */
  const handleToggleFavorite = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInFavorites) {
      removeFavorite(facility.id)
    } else {
      addFavorite(facility)
    }

    /**
     * 백엔드 연동 포인트:
     * 관심 목록 추가/제거 API 호출
     *
     * 예시:
     * if (isInFavorites) {
     *   axios.delete(`/api/favorites/${facility.id}`)
     *     .catch(error => {
     *       console.error('관심 목록에서 제거하는데 실패했습니다:', error);
     *       // 실패 시 상태 롤백
     *       addFavorite(facility);
     *     });
     * } else {
     *   axios.post('/api/favorites', { facilityId: facility.id })
     *     .catch(error => {
     *       console.error('관심 목록에 추가하는데 실패했습니다:', error);
     *       // 실패 시 상태 롤백
     *       removeFavorite(facility.id);
     *     });
     * }
     */
  }

  return (
    <div className="facility-card">
      <Link to={`/facility/${facility.id}`} className="facility-card-link">
        <div className="facility-image">
          <ImageWithFallback
            src={facility.image || "/placeholder.svg"}
            alt={facility.title}
            fallbackSrc="/placeholder.jpg"
          />
          <button
            className={`favorite-button ${isInFavorites ? "active" : ""}`}
            onClick={handleToggleFavorite}
            aria-label={isInFavorites ? "관심 목록에서 제거" : "관심 목록에 추가"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isInFavorites ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
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
          <div className="facility-tags">
            {facility.type.map((type, index) => (
              <span key={index} className="facility-type-tag">
                {type}
              </span>
            ))}
          </div>
          <div className="facility-price">{facility.price}</div>

          {facility.description && <p className="facility-description">{facility.description}</p>}

          <div className="facility-actions">
            <span className="view-details">상세 정보 보기</span>
            {showRemoveButton && (
              <button
                className="remove-button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  removeFavorite(facility.id)
                }}
              >
                관심 목록에서 제거
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default FacilityCard
