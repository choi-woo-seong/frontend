"use client"

/**
 * 시설 목록 페이지 컴포넌트
 * 특정 유형의 시설 목록을 표시합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import FacilityCard from "../components/FacilityCard"
import FacilityFilters from "../components/FacilityFilters"
import KakaoMap from "../components/KakaoMap"
import ChatbotButton from "../components/ChatbotButton"
import "./FacilityListPage.css"

/**
 * 시설 유형 한글 이름 매핑
 */
const facilityTypeNames = {
  "silver-town": "실버타운",
  "nursing-home": "요양원",
  "elderly-home": "양로원",
}

/**
 * 시설 목록 페이지 컴포넌트
 * @returns {JSX.Element} 시설 목록 페이지 컴포넌트
 */
function FacilityListPage() {
  // URL 파라미터에서 시설 유형 가져오기
  const { facilityType } = useParams()
  // URL 검색 파라미터 가져오기
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get("search") || ""

  // 시설 목록 상태 관리
  const [facilities, setFacilities] = useState([])
  // 필터링된 시설 목록 상태 관리
  const [filteredFacilities, setFilteredFacilities] = useState([])
  // 로딩 상태 관리
  const [loading, setLoading] = useState(true)
  // 필터 상태 관리
  const [filters, setFilters] = useState({
    region: "",
    district: "",
    priceRange: "",
    amenities: [],
    rating: 0,
  })

  // 컴포넌트 마운트 시 시설 데이터 로드
  useEffect(() => {
    const loadFacilities = async () => {
      try {
        /**
         * 백엔드 연동 포인트:
         * 시설 목록 API 호출
         *
         * 예시:
         * const response = await axios.get(`/api/facilities`, {
         *   params: {
         *     type: facilityType,
         *     search: searchTerm
         *   }
         * });
         * setFacilities(response.data);
         * setFilteredFacilities(response.data);
         */

        // 임시 데이터 (백엔드 연동 전)
        const dummyFacilities = [
          {
            id: 1,
            title: "행복한 실버타운",
            location: "서울시 강남구 역삼동",
            type: ["실버타운"],
            price: "월 150만원~",
            image: "/facility-1.jpg",
            description:
              "최신 시설을 갖춘 프리미엄 실버타운입니다. 24시간 의료 서비스와 다양한 여가 프로그램을 제공합니다.",
            amenities: ["수영장", "헬스장", "도서관", "정원", "의료실"],
            position: { lat: 37.5012, lng: 127.0396 },
          },
          {
            id: 2,
            title: "편안한 요양원",
            location: "서울시 서초구 반포동",
            type: ["요양원"],
            price: "월 180만원~",
            image: "/facility-2.jpg",
            description: "전문 간호사가 상주하는 고품격 요양원입니다. 개인 맞춤형 케어 서비스를 제공합니다.",
            amenities: ["물리치료실", "작업치료실", "정원", "의료실", "식당"],
            position: { lat: 37.5087, lng: 127.0218 },
          },
          {
            id: 3,
            title: "푸른 양로원",
            location: "경기도 고양시 일산동구",
            type: ["양로원"],
            price: "월 120만원~",
            image: "/facility-3.jpg",
            description:
              "자연 친화적 환경에서 편안한 노후를 보낼 수 있는 양로원입니다. 다양한 문화 프로그램을 운영합니다.",
            amenities: ["텃밭", "산책로", "문화센터", "식당", "의료실"],
            position: { lat: 37.6618, lng: 126.7722 },
          },
          {
            id: 4,
            title: "햇살 실버타운",
            location: "경기도 성남시 분당구",
            type: ["실버타운"],
            price: "월 160만원~",
            image: "/facility-4.jpg",
            description: "넓은 개인 공간과 다양한 커뮤니티 시설을 갖춘 실버타운입니다. 활기찬 노후 생활을 지원합니다.",
            amenities: ["카페", "영화관", "헬스장", "사우나", "정원"],
            position: { lat: 37.3784, lng: 127.1129 },
          },
          {
            id: 5,
            title: "건강한 요양원",
            location: "인천시 연수구 송도동",
            type: ["요양원"],
            price: "월 170만원~",
            image: "/facility-5.jpg",
            description: "최신 의료 장비와 전문 의료진이 상주하는 요양원입니다. 개인별 맞춤 케어 플랜을 제공합니다.",
            amenities: ["물리치료실", "작업치료실", "언어치료실", "수치료실", "정원"],
            position: { lat: 37.3824, lng: 126.6582 },
          },
          {
            id: 6,
            title: "평화로운 양로원",
            location: "경기도 용인시 수지구",
            type: ["양로원"],
            price: "월 130만원~",
            image: "/facility-6.jpg",
            description:
              "조용하고 평화로운 환경에서 편안한 노후를 보낼 수 있는 양로원입니다. 넓은 정원과 산책로가 있습니다.",
            amenities: ["정원", "산책로", "도서관", "취미실", "식당"],
            position: { lat: 37.3224, lng: 127.0892 },
          },
        ]

        // 현재 시설 유형에 맞는 시설만 필터링
        const typeName = facilityTypeNames[facilityType]
        const typeFilteredFacilities = dummyFacilities.filter((facility) => facility.type.includes(typeName))

        // 검색어가 있는 경우 추가 필터링
        const searchFilteredFacilities = searchTerm
          ? typeFilteredFacilities.filter(
              (facility) =>
                facility.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                facility.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                facility.description.toLowerCase().includes(searchTerm.toLowerCase()),
            )
          : typeFilteredFacilities

        setFacilities(searchFilteredFacilities)
        setFilteredFacilities(searchFilteredFacilities)
      } catch (error) {
        console.error("시설 데이터를 불러오는데 실패했습니다:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFacilities()
  }, [facilityType, searchTerm])

  /**
   * 필터 변경 핸들러
   * @param {Object} newFilters - 새 필터 값
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)

    // 필터 적용
    const filtered = facilities.filter((facility) => {
      // 지역 필터
      if (newFilters.region && !facility.location.includes(newFilters.region)) {
        return false
      }

      // 상세 지역 필터
      if (newFilters.district && !facility.location.includes(newFilters.district)) {
        return false
      }

      // 가격 범위 필터
      if (newFilters.priceRange) {
        const priceMatch = facility.price.match(/\d+/)
        if (priceMatch) {
          const price = Number.parseInt(priceMatch[0])

          if (newFilters.priceRange === "100만원 이하" && price > 100) {
            return false
          } else if (newFilters.priceRange === "100-200만원" && (price < 100 || price > 200)) {
            return false
          } else if (newFilters.priceRange === "200-300만원" && (price < 200 || price > 300)) {
            return false
          } else if (newFilters.priceRange === "300만원 이상" && price < 300) {
            return false
          }
        }
      }

      // 시설 필터
      if (newFilters.amenities.length > 0) {
        const hasAllAmenities = newFilters.amenities.every((amenity) => facility.amenities.includes(amenity))
        if (!hasAllAmenities) {
          return false
        }
      }

      return true
    })

    setFilteredFacilities(filtered)
  }

  // 지도에 표시할 마커 생성
  const markers = filteredFacilities.map((facility) => ({
    position: facility.position,
    title: facility.title,
    id: facility.id,
  }))

  // 지도 중심 좌표 계산 (첫 번째 시설 위치 또는 기본값)
  const mapCenter = filteredFacilities.length > 0 ? filteredFacilities[0].position : { lat: 37.5665, lng: 126.978 } // 서울 중심 좌표

  return (
    <div className="facility-list-page">
      <Navbar />

      {/* 검색 섹션 */}
      <section className="search-section">
        <div className="container">
          <h1 className="page-title">{facilityTypeNames[facilityType]} 찾기</h1>
          <div className="search-bar-container">
            <SearchBar initialValue={searchTerm} />
          </div>
        </div>
      </section>

      {/* 필터 및 결과 섹션 */}
      <section className="results-section">
        <div className="container">
          {/* 필터 패널 */}
          <div className="filter-panel">
            <FacilityFilters onFilterChange={handleFilterChange} />
          </div>

          {/* 지도 */}
          <div className="map-container">
            {loading ? (
              <div className="loading-indicator">지도를 불러오는 중...</div>
            ) : (
              <KakaoMap height="400px" markers={markers} center={mapCenter} level={9} />
            )}
          </div>

          {/* 시설 목록 */}
          <div className="facilities-container">
            <h2 className="section-title">
              검색 결과 <span className="result-count">({filteredFacilities.length})</span>
            </h2>

            {loading ? (
              <div className="loading-indicator">시설 정보를 불러오는 중...</div>
            ) : filteredFacilities.length > 0 ? (
              <div className="facilities-grid">
                {filteredFacilities.map((facility) => (
                  <FacilityCard key={facility.id} facility={facility} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>검색 결과가 없습니다.</p>
                <p>다른 검색어나 필터 조건을 시도해보세요.</p>
                <button
                  className="reset-button"
                  onClick={() =>
                    handleFilterChange({
                      region: "",
                      district: "",
                      priceRange: "",
                      amenities: [],
                      rating: 0,
                    })
                  }
                >
                  필터 초기화
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 챗봇 버튼 */}
      <ChatbotButton />
    </div>
  )
}

export default FacilityListPage
