import { useNavigate } from "react-router";
import { PitapatStatus } from "../types";
import PitapatButton from "./PitapatButton";


interface IProps {
  myKey: number;
  userKey: number;
  username: string;
  koreanAge: number;
  photo: string;
  status: PitapatStatus;
}

export default function Profile({
  myKey,
  userKey,
  username,
  koreanAge,
  photo,
  status,
}: IProps) {
  const navigate = useNavigate();

  return (
    <div className="relative h-[100vw]">
      <button onClick={() => navigate("/profile/" + userKey)} className="w-full z-0">
        <img
          key={userKey}
          src={photo}
          alt={photo}
          className="object-cover w-full h-[100vw]"
        />
        <div
          className={"absolute bottom-0 left-0 right-0 px-4 py-2 flex text-white font-bold justify-center"}
          style={{
            background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #000000 100%)",
          }}
        >
          {username}/{koreanAge}
        </div>
      </button>
      <PitapatButton
        status={status}
        from={myKey}
        to={userKey}
      />
    </div>
  );
};
