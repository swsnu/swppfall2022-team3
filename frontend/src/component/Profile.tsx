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
      <img key={key} src={photo} alt={photo}/>
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800 opacity-70 flex text-white font-bold justify-center">
        {username}/{koreanAge}
      </div>
    </div>
  );
};
