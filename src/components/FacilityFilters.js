import React, { useState, useEffect } from "react";
import "./FacilityFilters.css";

const FacilityFilters = ({ onFilterChange }) => {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);

  // 사용자 정보
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  // 건강 상태
  const [mobility, setMobility] = useState("");
  const [careLevel, setCareLevel] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [medication, setMedication] = useState(false);
  const [meal, setMeal] = useState(false);

  const allAmenities = ["수영장", "헬스장", "도서관", "정원", "의료실", "카페", "영화관", "사우나", "텃밭", "산책로", "식당", "물리치료실", "작업치료실", "언어치료실", "수치료실", "문화센터", "취미실"];
  const regions = [
    "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종",
    "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"
  ];
  
  const districts = {
    서울: ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
    부산: ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
    대구: ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
    인천: ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],
    광주: ["광산구", "남구", "동구", "북구", "서구"],
    대전: ["대덕구", "동구", "서구", "유성구", "중구"],
    울산: ["남구", "동구", "북구", "울주군", "중구"],
    세종: ["조치원읍", "금남면", "부강면", "연기면", "연동면", "연서면", "장군면", "전의면", "전동면", "소정면", "한솔동", "도담동", "아름동", "종촌동", "고운동", "보람동", "새롬동", "다정동", "대평동", "소담동", "반곡동"],
    경기: ["수원시", "성남시", "고양시", "용인시", "부천시", "안산시", "안양시", "남양주시", "화성시", "평택시", "의정부시", "시흥시", "파주시", "김포시", "광주시", "광명시", "군포시", "오산시", "이천시", "안성시", "의왕시", "하남시", "여주시", "양평군", "동두천시", "과천시", "가평군", "연천군"],
    강원: ["춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
    충북: ["청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "진천군", "괴산군", "음성군", "단양군", "증평군"],
    충남: ["천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
    전북: ["전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
    전남: ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
    경북: ["포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
    경남: ["창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
    제주: ["제주시", "서귀포시"]
  };
  

  const allDiseases = ["치매", "당뇨", "고혈압", "관절염", "암", "기타"];

  useEffect(() => {
    onFilterChange({
      region, district, priceRange, amenities,
      name, birth, gender, location,
      mobility, careLevel, diseases, medication, meal
    });
  }, [region, district, priceRange, amenities, name, birth, gender, location, mobility, careLevel, diseases, medication, meal]);

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const toggleDisease = (item) => {
    setDiseases((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const resetFilters = () => {
    setRegion("");
    setDistrict("");
    setPriceRange("");
    setAmenities([]);
    setOpenFilter(null);
    setName("");
    setBirth("");
    setGender("");
    setLocation("");
    setMobility("");
    setCareLevel("");
    setDiseases([]);
    setMedication(false);
    setMeal(false);
  };

  return (
    <div className="facility-filters">
      <div className="filter-toolbar">
        <button className="filter-button" onClick={() => setOpenFilter(openFilter === "region" ? null : "region")}>지역 {openFilter === "region" ? "⏶" : "⏷"}</button>
        <button className="filter-button" onClick={() => setOpenFilter(openFilter === "district" ? null : "district")}>상세지역 {openFilter === "district" ? "⏶" : "⏷"}</button>
        <button className="filter-button" onClick={() => setOpenFilter(openFilter === "price" ? null : "price")}>가격대 {openFilter === "price" ? "⏶" : "⏷"}</button>
        <button className="filter-button" onClick={() => setOpenFilter(openFilter === "amenities" ? null : "amenities")}>시설 {openFilter === "amenities" ? "⏶" : "⏷"}</button>
        <button className="filter-button" onClick={() => setOpenFilter(openFilter === "userinfo" ? null : "userinfo")}>생활/건강 {openFilter === "userinfo" ? "⏶" : "⏷"}</button>
        <button className="reset-button-inline" onClick={resetFilters}>새로고침</button>
      </div>

      {openFilter === "region" && (
  <div className="filter-panel option-grid">
    {regions.map((r) => (
      <button
        key={r}
        className={`option-button ${region === r ? "selected" : ""}`}
        onClick={() => {
          setRegion(r);
          setDistrict("");
        }}
      >
        {r}
      </button>
    ))}
  </div>
)}

{openFilter === "district" && region && (
  <div className="filter-panel option-grid">
    {districts[region].map((d) => (
      <button
        key={d}
        className={`option-button ${district === d ? "selected" : ""}`}
        onClick={() => setDistrict(d)}
      >
        {d}
      </button>
    ))}
  </div>
)}


      {openFilter === "price" && (
        <div className="filter-panel">
          {["100만원 이하", "100-200만원", "200-300만원", "300만원 이상"].map((price) => (
            <button key={price} className={`option-button ${priceRange === price ? "selected" : ""}`} onClick={() => setPriceRange(price)}>
              {price}
            </button>
          ))}
        </div>
      )}

{openFilter === "amenities" && (
  <div className="filter-panel amenities-grid">
    {allAmenities.map((item, index) => {
      const id = `amenity-${index}`;
      return (
        <label key={item} className={`amenity-label ${amenities.includes(item) ? "selected" : ""}`} htmlFor={id}>
          <input
            id={id}
            type="checkbox"
            checked={amenities.includes(item)}
            onChange={() => toggleAmenity(item)}
          />
          <span>{item}</span>
        </label>
      );
    })}
  </div>
)}

{openFilter === "userinfo" && (
  <div className="filter-panel userinfo-form">
    

    <strong>생활 / 건강 상태</strong>

    <div className="form-grid">
      <label>
        거동 상태:
        <select value={mobility} onChange={(e) => setMobility(e.target.value)}>
          <option value="">선택</option>
          <option value="자립 가능">자립 가능</option>
          <option value="부분 보조 필요">부분 보조 필요</option>
          <option value="전적으로 도움 필요">전적으로 도움 필요</option>
        </select>
      </label>
      <label>
        간병 필요도:
        <select value={careLevel} onChange={(e) => setCareLevel(e.target.value)}>
          <option value="">선택</option>
          <option value="정기진료 필요">정기진료 필요</option>
          <option value="간병인 상주 필요">간병인 상주 필요</option>
          <option value="의료시설 상주 필요">의료시설 상주 필요</option>
        </select>
      </label>
    </div>

    <div className="subsection">
  <label>현재 질환:</label>
  <div className="amenities-grid">
    {allDiseases.map((item) => (
      <div
        key={item}
        className={`amenity-label ${diseases.includes(item) ? "selected" : ""}`}
        onClick={() => toggleDisease(item)}
      >
        <input
          type="checkbox"
          checked={diseases.includes(item)}
          onChange={() => toggleDisease(item)}
          onClick={(e) => e.stopPropagation()}
        />
        <span>{item}</span>
      </div>
    ))}
  </div>
</div>
<div className="subsection">
  <label>복약 관리 필요:</label>
  <div className="amenities-grid">
    <div
      className={`amenity-label ${medication === true ? "selected" : ""}`}
      onClick={() => setMedication(true)}
    >
      <input type="checkbox" checked={medication === true} readOnly />
      <span>예</span>
    </div>
    <div
      className={`amenity-label ${medication === false ? "selected" : ""}`}
      onClick={() => setMedication(false)}
    >
      <input type="checkbox" checked={medication === false} readOnly />
      <span>아니오</span>
    </div>
  </div>
</div>

<div className="subsection">
  <label>식사 관리 필요:</label>
  <div className="amenities-grid">
    <div
      className={`amenity-label ${meal === true ? "selected" : ""}`}
      onClick={() => setMeal(true)}
    >
      <input type="checkbox" checked={meal === true} readOnly />
      <span>예</span>
    </div>
    <div
      className={`amenity-label ${meal === false ? "selected" : ""}`}
      onClick={() => setMeal(false)}
    >
      <input type="checkbox" checked={meal === false} readOnly />
      <span>아니오</span>
    </div>
  </div>
</div>





    
  </div>
)}

    </div>
  );
};

export default FacilityFilters;
