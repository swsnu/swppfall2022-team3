import { useState } from "react"
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom"


export default function SignUp() {
  const [isLoggin, setIsLoggin] = useState<boolean>(true);
  //const dispatch = useDispatch();

  if (isLoggin) {
    return (
      <div>
        <p className="text-center text-pink-500/100 mt-6">소속대학과</p>
        <p className="text-center text-pink-/100">학교 이메일과 입력을 입력해주세요</p>
        <div className="text-center mt-16">
          <select className="w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md">
            <option key="서울대학교" value="서울대학교" className="text-center">서울대학교</option>
          </select>
        </div>
        <div className="text-center mt-2">
          <label className="text-center">
            <input className="w-36 border-solid border-b-4 border-l-2 border-r-2 rounded-md"></input>
            snu.ac.kr</label>
        </div>
        <div className="text-center">
          <button className="bg-pink-500 text-center mt-8 w-24">확인</button>
        </div>
      </div>
    )
  }
  else {
    return <Navigate to='/signin' />
  }
}