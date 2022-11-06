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
    <div className="relative h-[100vw]">
      <button onClick={clickDetail} className="w-full">
        <img
          key={key}
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
    </div>
  );
};
