import React, { useState, useEffect } from "react";

/**
 * 시설 필터 컴포넌트
 * 지역, 가격, 서비스 등 기준으로 시설 목록을 필터링할 수 있음
 *
 * @param {Function} onFilterChange - 필터 변경 시 실행되는 콜백 함수
 */
const FacilityFilters = ({ onFilterChange }) => {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [amenities, setAmenities] = useState([]);

  // 전체 선택 가능한 서비스
  const allAmenities = ["수영장", "헬스장", "도서관", "정원", "의료실", "카페", "영화관", "사우나", "텃밭", "산책로", "식당", "물리치료실", "작업치료실", "언어치료실", "수치료실", "문화센터", "도서관", "취미실"];

  // 지역 목록 예시
  const regions = ["서울", "경기", "인천"];
  const districts = {
    서울: ["강남구", "서초구"],
    경기: ["고양시", "성남시", "용인시"],
    인천: ["연수구"],
  };

  // 필터 변경 시 상위 컴포넌트로 전달
  useEffect(() => {
    onFilterChange({
      region,
      district,
      priceRange,
      amenities,
    });
  }, [region, district, priceRange, amenities]);

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="facility-filters">
      <h3>필터</h3>

      {/* 지역 선택 */}
      <div className="filter-group">
        <label>지역</label>
        <select value={region} onChange={(e) => {
          setRegion(e.target.value);
          setDistrict(""); // 지역 바꾸면 상세지역 초기화
        }}>
          <option value="">전체</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* 상세 지역 선택 */}
      {region && (
        <div className="filter-group">
          <label>상세 지역</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option value="">전체</option>
            {districts[region].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      )}

      {/* 가격대 필터 */}
      <div className="filter-group">
        <label>가격대</label>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
          <option value="">전체</option>
          <option value="100만원 이하">100만원 이하</option>
          <option value="100-200만원">100-200만원</option>
          <option value="200-300만원">200-300만원</option>
          <option value="300만원 이상">300만원 이상</option>
        </select>
      </div>

      {/* 서비스 필터 */}
      <div className="filter-group">
        <label>시설 서비스</label>
        <div className="amenities-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
          {allAmenities.map((item) => (
            <label key={item} style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                value={item}
                checked={amenities.includes(item)}
                onChange={() => toggleAmenity(item)}
              />
              <span style={{ marginLeft: "5px" }}>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacilityFilters;
