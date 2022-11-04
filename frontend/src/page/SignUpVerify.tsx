import { useNavigate } from "react-router";


export default function SignUpVerify() {

  return (
    <section className="h-screen w-full flex flex-col mt-12 mb-16">
      <p className="text-center text-pink-500/100 mt-6">인증 코드가 발송되었습니다!</p>
      <p className="text-center text-pink-500/100">이메일을 확인해주세요.</p>
      <div className="text-center mt-16">
        <label className="text-center">
          <input className="w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md" placeholder=" 인증코드"></input>
          {"3:00"}</label>
      </div>
      <div className="text-center mt-24">
        <div>
          <button className="bg-white-500 text-center text-pink border-solid border-b-4 border-l-2 border-r-2 w-36 h-8 rounded-md">재전송</button>
        </div>
        <div>
          <button className="bg-pink-500 text-center text-white mt-2 w-36 h-8 rounded-md">확인</button>
        </div>
      </div>
    </section >
  )
}