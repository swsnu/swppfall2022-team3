import React from 'react';

interface IProps {
  key: number;
  username: string;
  koreanAge: number;
  photo: string;
  clickDetail?: React.MouseEventHandler<HTMLButtonElement>;
}

const Profile = (props: IProps) => {
  return (
    <div className="Profile">
      <button onClick={props.clickDetail}>
        <img key={props.key} className='snap-center' src={props.photo} alt={props.photo} />
      </button>
      <div>
        {props.username}/{props.koreanAge}
      </div>
    </div>
  );
};
export default Profile;
