"use client"

/**
 * 관심 목록 관련 컨텍스트
 * 사용자의 관심 시설 목록을 관리합니다.
 *
 * @author Frontend Team
 * @version 1.0
 */
import { createContext, useState, useContext, useEffect } from "react"

// 관심 목록 컨텍스트 생성
const FavoritesContext = createContext(null)

/**
 * 시설 타입 정의
 * @typedef {Object} Facility
 * @property {number} id - 시설 ID
 * @property {string} title - 시설 이름
 * @property {string} location - 시설 위치
 * @property {string[]} type - 시설 유형 배열
 * @property {string} price - 시설 가격
 * @property {string} image - 시설 이미지 URL
 * @property {Object} position - 시설 위치 좌표
 * @property {number} position.lat - 위도
 * @property {number} position.lng - 경도
 */

/**
 * 관심 목록 컨텍스트 제공자 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 자식 컴포넌트
 */
export function FavoritesProvider({ children }) {
  // 관심 목록 상태 관리
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  // 컴포넌트 마운트 시 로컬 스토리지에서 관심 목록 불러오기
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Failed to parse favorites from localStorage:", error)
        localStorage.removeItem("favorites")
      }
    }

    /**
     * 백엔드 연동 포인트:
     * 사용자의 관심 목록 불러오기 API 호출
     *
     * 예시:
     * const token = localStorage.getItem('token');
     * if (token) {
     *   axios.get('/api/favorites', {
     *     headers: { Authorization: `Bearer ${token}` }
     *   })
     *   .then(response => {
     *     setFavorites(response.data);
     *     localStorage.setItem('favorites', JSON.stringify(response.data));
     *   })
     *   .catch(error => {
     *     console.error('Failed to fetch favorites:', error);
     *   })
     *   .finally(() => {
     *     setLoading(false);
     *   });
     * } else {
     *   setLoading(false);
     * }
     */

    setLoading(false)
  }, [])

  // 관심 목록 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))

    /**
     * 백엔드 연동 포인트:
     * 관심 목록 변경 시 서버에 동기화
     *
     * 예시:
     * const token = localStorage.getItem('token');
     * if (token) {
     *   axios.put('/api/favorites', { favorites }, {
     *     headers: { Authorization: `Bearer ${token}` }
     *   })
     *   .catch(error => {
     *     console.error('Failed to sync favorites with server:', error);
     *   });
     * }
     */
  }, [favorites])

  /**
   * 관심 목록에 시설 추가
   *
   * @param {Facility} facility - 추가할 시설 정보
   */
  const addFavorite = (facility) => {
    setFavorites((prev) => [...prev, facility])

    /**
     * 백엔드 연동 포인트:
     * 관심 목록에 시설 추가 API 호출
     *
     * 예시:
     * const token = localStorage.getItem('token');
     * if (token) {
     *   axios.post('/api/favorites', { facilityId: facility.id }, {
     *     headers: { Authorization: `Bearer ${token}` }
     *   })
     *   .catch(error => {
     *     console.error('Failed to add facility to favorites:', error);
     *     // 실패 시 상태 롤백
     *     setFavorites(prev => prev.filter(f => f.id !== facility.id));
     *   });
     * }
     */
  }

  /**
   * 관심 목록에서 시설 제거
   *
   * @param {number} facilityId - 제거할 시설 ID
   */
  const removeFavorite = (facilityId) => {
    setFavorites((prev) => prev.filter((facility) => facility.id !== facilityId))

    /**
     * 백엔드 연동 포인트:
     * 관심 목록에서 시설 제거 API 호출
     *
     * 예시:
     * const token = localStorage.getItem('token');
     * if (token) {
     *   axios.delete(`/api/favorites/${facilityId}`, {
     *     headers: { Authorization: `Bearer ${token}` }
     *   })
     *   .catch(error => {
     *     console.error('Failed to remove facility from favorites:', error);
     *     // 실패 시 상태 롤백
     *     const removedFacility = favorites.find(f => f.id === facilityId);
     *     if (removedFacility) {
     *       setFavorites(prev => [...prev, removedFacility]);
     *     }
     *   });
     * }
     */
  }

  /**
   * 시설이 관심 목록에 있는지 확인
   *
   * @param {number} facilityId - 확인할 시설 ID
   * @returns {boolean} 관심 목록 포함 여부
   */
  const isFavorite = (facilityId) => {
    return favorites.some((facility) => facility.id === facilityId)
  }

  // 컨텍스트 값 정의
  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

/**
 * 관심 목록 컨텍스트 사용 훅
 *
 * @returns {Object} 관심 목록 컨텍스트 값
 */
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
