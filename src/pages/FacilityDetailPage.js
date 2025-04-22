"use client"

/**
 * 시설 상세 페이지 컴포넌트
 * 선택한 시설의 상세 정보를 표시합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useFavorites } from "../contexts/FavoritesContext"
import Navbar from "../components/Navbar"
import ImageWithFallback from "../components/ImageWithFallback"
import RouteFinder from "../components/RouteFinder"
import ChatbotButton from "../components/ChatbotButton"
import "./FacilityDetailPage.css"

/**
 * 시설 상세 페이지 컴포넌트
 * @returns {JSX.Element} 시설 상세 페이지 컴포넌트
 */
function FacilityDetailPage() {
  // URL 파라미터에서 시설 ID 가져오기
  const { facilityId } = useParams()
  const navigate = useNavigate()

  // 관심 목록 컨텍스트에서 함수 가져오기
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  // 시설 데이터 상태 관리
  const [facility, setFacility] = useState(null)
  // 로딩 상태 관리
  const [loading, setLoading] = useState(true)
  // 에러 상태 관리
  const [error, setError] = useState(null)
  // 현재 활성 탭 상태 관리
  const [activeTab, setActiveTab] = useState("rooms")
  // 토스트 메시지 상태 관리
  const [toast, setToast] = useState({ show: false, message: "", type: "" })

  // 컴포넌트 마운트 시 시설 데이터 로드
  useEffect(() => {
    const fetchFacilityData = async () => {
      try {
        /**
         * 백엔드 연동 포인트:
         * 시설 상세 정보 API 호출
         *
         * 예시:
         * const response = await axios.get(`/api/facilities/${facilityId}`);
         * setFacility(response.data);
         */

        // 임시 데이터 (백엔드 연동 전)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // 더미 데이터로 시설 정보 시뮬레이션
        const dummyFacility = {
          id: Number(facilityId),
          title: "행복한 실버타운",
          location: "서울시 강남구 역삼동",
          address: "서울특별시 강남구 역삼동 123-45",
          type: ["실버타운"],
          price: "월 150만원~",
          image: "/facility-1.jpg",
          description:
            "최신 시설을 갖춘 프리미엄 실버타운입니다. 24시간 의료 서비스와 다양한 여가 프로그램을 제공합니다. 넓은 개인 공간과 쾌적한 환경에서 편안한 노후 생활을 즐기실 수 있습니다.",
          amenities: ["수영장", "헬스장", "도서관", "정원", "의료실", "식당", "카페", "미용실"],
          position: { lat: 37.5012, lng: 127.0396 },
          contact: "02-1234-5678",
          openingHours: "평일 09:00 - 18:00, 주말 10:00 - 17:00",
          website: "https://example.com/happy-silver",
          rooms: [
            {
              type: "스탠다드",
              size: "33㎡ (10평)",
              price: "월 150만원",
              features: ["싱글 침대", "개인 화장실", "소형 주방"],
              image: "/facility-1.jpg",
            },
            {
              type: "디럭스",
              size: "49.5㎡ (15평)",
              price: "월 200만원",
              features: ["더블 침대", "개인 화장실", "주방", "거실"],
              image: "/facility-1.jpg",
            },
            {
              type: "프리미엄",
              size: "66㎡ (20평)",
              price: "월 250만원",
              features: ["킹 침대", "개인 화장실", "주방", "거실", "테라스"],
              image: "/facility-1.jpg",
            },
          ],
          programs: [
            {
              name: "건강 체조",
              schedule: "매일 오전 10시",
              description: "전문 강사와 함께하는 노인 맞춤형 건강 체조 프로그램",
            },
            {
              name: "미술 교실",
              schedule: "매주 화, 목 오후 2시",
              description: "다양한 미술 활동을 통한 창의력 향상 및 정서 안정 프로그램",
            },
            {
              name: "음악 치료",
              schedule: "매주 수, 금 오후 3시",
              description: "음악을 통한 인지 기능 향상 및 정서 안정 프로그램",
            },
          ],
          reviews: [
            {
              author: "김OO",
              rating: 5,
              date: "2025.03.15",
              content: "시설이 깨끗하고 직원들이 친절해요. 부모님이 매우 만족하며 지내고 계십니다.",
            },
            {
              author: "이OO",
              rating: 4,
              date: "2025.02.20",
              content: "프로그램이 다양하고 식사가 맛있어요. 다만 주차 공간이 조금 부족한 점이 아쉬워요.",
            },
            {
              author: "박OO",
              rating: 5,
              date: "2025.01.10",
              content: "의료 서비스가 체계적이고 24시간 케어해주셔서 안심하고 맡길 수 있어요.",
            },
          ],
        }

        setFacility(dummyFacility)
      } catch (error) {
        console.error("시설 정보를 불러오는데 실패했습니다:", error)
        setError("시설 정보를 불러오는데 실패했습니다. 다시 시도해주세요.")
      } finally {
        setLoading(false)
      }
    }

    fetchFacilityData()
  }, [facilityId])

  /**
   * 관심 목록 토글 핸들러
   */
  const handleToggleFavorite = () => {
    if (!facility) return

    const facilityForFavorites = {
      id: facility.id,
      title: facility.title,
      location: facility.location,
      type: facility.type,
      price: facility.price,
      image: facility.image,
      position: facility.position,
    }

    if (isFavorite(facility.id)) {
      removeFavorite(facility.id)
      showToast("관심목록에서 제거되었습니다", "success")
    } else {
      addFavorite(facilityForFavorites)
      showToast("관심목록에 추가되었습니다", "success")
    }

    /**
     * 백엔드 연동 포인트:
     * 관심 목록 추가/제거 API 호출
     *
     * 예시:
     * if (isFavorite(facility.id)) {
     *   axios.delete(`/api/favorites/${facility.id}`)
     *     .then(() => {
     *       removeFavorite(facility.id);
     *       showToast('관심목록에서 제거되었습니다', 'success');
     *     })
     *     .catch(error => {
     *       console.error('관심목록 제거 실패:', error);
     *       showToast('관심목록 제거에 실패했습니다', 'error');
     *     });
     * } else {
     *   axios.post('/api/favorites', facilityForFavorites)
     *     .then(() => {
     *       addFavorite(facilityForFavorites);
     *       showToast('관심목록에 추가되었습니다', 'success');
     *     })
     *     .catch(error => {
     *       console.error('관심목록 추가 실패:', error);
     *       showToast('관심목록 추가에 실패했습니다', 'error');
     *     });
     * }
     */
  }

  /**
   * 토스트 메시지 표시 함수
   * @param {string} message - 표시할 메시지
   * @param {string} type - 메시지 타입 (success, error)
   */
  const showToast = (message, type) => {
    setToast({ show: true, message, type })

    // 3초 후 토스트 메시지 숨기기
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" })
    }, 3000)
  }

  /**
   * 뒤로 가기 핸들러
   */
  const handleGoBack = () => {
    navigate(-1)
  }

  // 로딩 중 표시
  if (loading) {
    return (
      <div className="facility-detail-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>시설 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  // 에러 표시
  if (error) {
    return (
      <div className="facility-detail-page">
        <Navbar />
        <div className="error-container">
          <div className="error-icon">!</div>
          <h2>오류가 발생했습니다</h2>
          <p>{error}</p>
          <button className="back-button" onClick={handleGoBack}>
            뒤로 가기
          </button>
        </div>
      </div>
    )
  }

  // 시설 정보가 없는 경우
  if (!facility) {
    return (
      <div className="facility-detail-page">
        <Navbar />
        <div className="error-container">
          <div className="error-icon">!</div>
          <h2>시설 정보를 찾을 수 없습니다</h2>
          <p>요청하신 시설 정보를 찾을 수 없습니다.</p>
          <button className="back-button" onClick={handleGoBack}>
            뒤로 가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="facility-detail-page">
      <Navbar />

      {/* 토스트 메시지 */}
      {toast.show && (
        <div className={`toast-message ${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}

      {/* 뒤로 가기 버튼 */}
      <div className="container">
        <button className="back-button" onClick={handleGoBack}>
        ⭠ 뒤로 가기
        </button>
      </div>

      {/* 시설 상세 정보 */}
      <div className="container">
        <div className="facility-detail-card">
          {/* 헤더 이미지 */}
          <div className="facility-header-image">
            <ImageWithFallback
              src={facility.image || "/placeholder.svg"}
              alt={facility.title}
              fallbackSrc="/placeholder.jpg"
            />
            <div className="facility-header-overlay"></div>
            <div className="facility-header-content">
              <h1 className="facility-title">{facility.title}</h1>
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
            </div>
            <div className="facility-header-actions">
              <button
                className={`favorite-button ${isFavorite(facility.id) ? "active" : ""}`}
                onClick={handleToggleFavorite}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isFavorite(facility.id) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <button className="share-button">
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
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="facility-info-section">
            <div className="facility-tags">
              {facility.type.map((type, index) => (
                <span key={index} className="facility-tag type-tag">
                  {type}
                </span>
              ))}
              <span className="facility-tag price-tag">{facility.price}</span>
            </div>

            <p className="facility-description">{facility.description}</p>

            <div className="facility-contact-info">
              <div className="contact-item">
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
                <div>
                  <h3>주소</h3>
                  <p>{facility.address}</p>
                </div>
              </div>
              <div className="contact-item">
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div>
                  <h3>연락처</h3>
                  <p>{facility.contact}</p>
                </div>
              </div>
              <div className="contact-item">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <h3>운영시간</h3>
                  <p>{facility.openingHours}</p>
                </div>
              </div>
            </div>

            {/* 시설 및 서비스 */}
            <div className="facility-amenities">
              <h3 className="section-title">시설 및 서비스</h3>
              <div className="amenities-list">
                {facility.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 탭 콘텐츠 */}
          <div className="facility-tabs">
            <div className="tabs-header">
              <button
                className={`tab-button ${activeTab === "rooms" ? "active" : ""}`}
                onClick={() => setActiveTab("rooms")}
              >
                객실 정보
              </button>
              <button
                className={`tab-button ${activeTab === "programs" ? "active" : ""}`}
                onClick={() => setActiveTab("programs")}
              >
                프로그램
              </button>
              <button
                className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
                onClick={() => setActiveTab("reviews")}
              >
                후기
              </button>
              <button
                className={`tab-button ${activeTab === "location" ? "active" : ""}`}
                onClick={() => setActiveTab("location")}
              >
                위치
              </button>
            </div>

            <div className="tabs-content">
              {/* 객실 정보 탭 */}
              {activeTab === "rooms" && (
                <div className="tab-pane">
                  <h3 className="section-title">객실 유형</h3>
                  <div className="rooms-list">
                    {facility.rooms.map((room, index) => (
                      <div key={index} className="room-card">
                        <div className="room-image">
                          <ImageWithFallback
                            src={room.image || "/placeholder.svg"}
                            alt={room.type}
                            fallbackSrc="/placeholder.jpg"
                          />
                        </div>
                        <div className="room-info">
                          <div className="room-header">
                            <h4 className="room-type">{room.type}</h4>
                            <span className="room-price">{room.price}</span>
                          </div>
                          <p className="room-size">{room.size}</p>
                          <h5 className="room-features-title">특징</h5>
                          <ul className="room-features">
                            {room.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 프로그램 탭 */}
              {activeTab === "programs" && (
                <div className="tab-pane">
                  <h3 className="section-title">제공 프로그램</h3>
                  <div className="programs-list">
                    {facility.programs.map((program, index) => (
                      <div key={index} className="program-card">
                        <h4 className="program-name">{program.name}</h4>
                        <p className="program-schedule">{program.schedule}</p>
                        <p className="program-description">{program.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 후기 탭 */}
              {activeTab === "reviews" && (
                <div className="tab-pane">
                  <div className="reviews-header">
                    <h3 className="section-title">이용자 후기</h3>
                    <button className="write-review-button">후기 작성</button>
                  </div>
                  <div className="reviews-list">
                    {facility.reviews.map((review, index) => (
                      <div key={index} className="review-card">
                        <div className="review-header">
                          <div>
                            <span className="review-author">{review.author}</span>
                            <span className="review-rating">{"★".repeat(review.rating)}</span>
                          </div>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <p className="review-content">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 위치 탭 */}
              {activeTab === "location" && (
                <div className="tab-pane">
                  <h3 className="section-title">위치 정보</h3>
                  <p className="location-address">{facility.address}</p>

                  <div className="map-container">
                    {/* 지도 컴포넌트 (실제 구현 시 카카오맵 등 사용) */}
                    <div className="map-placeholder">
                      <img src="/map-example.jpg" alt="지도" />
                    </div>
                  </div>

                  <RouteFinder facility={facility} />
                </div>
              )}
            </div>
          </div>
        </div>

       {/* 추천 시설 */}
<div className="detail-recommended-facilities">
  <h2 className="detail-section-title">비슷한 시설</h2>
  <div className="detail-recommended-list">
    {[1, 2, 3].map((id) => (
      <Link to={`/facility/${id}`} key={id} className="detail-recommended-card">
        <div className="detail-recommended-image">
          <ImageWithFallback
            src={`/facility-${id}.jpg`}
            alt={`추천 시설 ${id}`}
            fallbackSrc="/placeholder.jpg"
          />
        </div>
        <div className="detail-recommended-info">
          <h3 className="detail-recommended-title">추천 시설 {id}</h3>
          <div className="detail-recommended-tags">
            <span className="detail-recommended-tag">실버타운</span>
          </div>
          <p className="detail-recommended-location">서울시 강남구</p>
          <p className="detail-recommended-price">월 150만원~</p>
        </div>
      </Link>
    ))}
  </div>
</div>

      </div>

      {/* 챗봇 버튼 */}
      <ChatbotButton />
    </div>
  )
}

export default FacilityDetailPage
