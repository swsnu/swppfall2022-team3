interface IProps {
  key: number;
  username: string;
  koreanAge: number;
  photo: string;
  clickDetail: () => void;
}

export default function Profile({
  key,
  username,
  koreanAge,
  photo,
  clickDetail,
}: IProps) {
  return (
    <div className="relative">
      <button onClick={clickDetail}>
        <img key={key} src={photo} alt={photo}/>
        <div
          className={"absolute bottom-0 left-0 right-0 px-4 py-2 flex text-white font-bold justify-center"}
          style={{
            background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #000000 100%)",
          }}
        >
          {username}/{koreanAge}
        </div>
      </button>
    </div>
  );
};
