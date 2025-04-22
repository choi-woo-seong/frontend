import React, { useState } from 'react'

/**
 * RouteFinder 컴포넌트
 * 사용자가 입력한 출발지에서 시설까지의 경로 정보를 표시합니다.
 * 추후 실제 지도 API 연동 시 지도 출력 기능 추가 가능.
 *
 * @param {Object} props
 * @param {Object} props.facility - 시설 정보 (주소, 이름 등 포함)
 * @returns {JSX.Element}
 */
const RouteFinder = ({ facility }) => {
  const [startLocation, setStartLocation] = useState('')
  const [routeInfo, setRouteInfo] = useState(null)

  const handleRouteSearch = () => {
    if (!startLocation) {
      alert('출발지를 입력해주세요!')
      return
    }

    // 추후 카카오/네이버 API 연결 가능
    const mockRouteInfo = {
      from: startLocation,
      to: facility.address,
      estimatedTime: '35분',
      distance: '12.5km',
      transport: '자동차 기준',
    }

    setRouteInfo(mockRouteInfo)
  }

  return (
    <div className="route-finder" style={{ marginTop: '20px', padding: '16px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h4>경로 찾기</h4>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="출발지를 입력하세요"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button onClick={handleRouteSearch} style={{ padding: '8px 12px' }}>검색</button>
      </div>

      {routeInfo && (
        <div className="route-result" style={{ marginTop: '10px', color: '#333' }}>
          <p><strong>출발지:</strong> {routeInfo.from}</p>
          <p><strong>도착지:</strong> {routeInfo.to}</p>
          <p><strong>예상 소요 시간:</strong> {routeInfo.estimatedTime}</p>
          <p><strong>예상 거리:</strong> {routeInfo.distance}</p>
          <p><strong>교통수단:</strong> {routeInfo.transport}</p>
        </div>
      )}
    </div>
  )
}

export default RouteFinder
