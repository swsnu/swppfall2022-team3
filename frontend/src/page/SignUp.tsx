import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { selectUniversity } from "../store/slices/university";


export default function SignUp() {
  const navigate = useNavigate();
  const universities = useSelector(selectUniversity).universities;
  const [emailDomain, setEmailDomain] = useState<string>(universities[0].domain);

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const thisUniv = universities.find((univ) => (univ.name == event.target.value))
    if (thisUniv) {
      setEmailDomain(thisUniv.domain)
    }
  }

  const clickHandler = () => {
    navigate("/signup/verify");
  }
  return (
    <section className="h-screen w-full flex flex-col mt-12 mb-16">
      <p className="text-center text-pink-500/100 mt-6">소속대학과</p>
      <p className="text-center text-pink-500/100">학교 이메일과 입력을 입력해주세요</p>
      <div className="text-center mt-16">
        <select className="w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md" onChange={(event) => changeHandler(event)}>{
          universities.map((univ) => (
            <option key={univ.key} value={univ.name} className="text-center">{univ.name}</option>
          ))
        }</select>
      </div>
      <div className="text-center mt-2">
        <label className="text-center">
          <input className="w-36 border-solid border-b-4 border-l-2 border-r-2 rounded-md"></input>
          {emailDomain}</label>
      </div>
      <div className="text-center">
        <button className="bg-pink-500 text-center text-white mt-24 w-36 h-8 rounded-md" onClick={() => clickHandler()}>확인</button>
      </div>
    </section>
  )
}