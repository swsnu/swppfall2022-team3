import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { photos, tags, users } from '../DummyData';
import { getKoreanAge, Page, User } from '../types';
import AppBar from '../component/AppBar';
import PhotoSlider from '../component/PhotoSlider';

export default function ProfileDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(users.find((user) => user.key === Number(id)));
  }, [id]);

  return user ? (
    <div>
      <AppBar
        page={Page.PROFILE_DETAIL}
        title={`${user.username}/${getKoreanAge(user.birthday)}`}
        clickBack={() => navigate(-1)}
      />
      <PhotoSlider
        user={user}
        photos={photos}
      />
      <div id='tags' className='flex flex-wrap m-1.5 text-sm font-bold text-pink-500'>
        {user.tags.map((t, index) =>
          <div key={index} className='flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400'>
            {tags.find((tag) => tag.key === t)?.name}
          </div>
        )}
      </div>
      <div id='intro' className='mx-3 my-2 text-sm'>{user.introduction}</div>
    </div>
  ) : <div></div>;
}
