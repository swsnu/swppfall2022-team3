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
    <div className="Profile">
      <button onClick={clickDetail}>
        <img key={key} className="snap-center" src={photo} alt={photo} />
      </button>
      <div>
        {username}/{koreanAge}
      </div>
    </div>
  );
};
