import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { photos, tags, users } from '../DummyData';
import { useNavigate } from 'react-router-dom';
import { getKoreanAge, User } from '../types';
import AppBar from '../component/AppBar';

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
        page='ProfileDetail'
        title={`${user.username}/${getKoreanAge(user.birthday)}`}
        onBack={() => navigate(-1)}
      />
      <div id='scroll' className='flex overflow-x-auto snap-x snap-mandatory'>
        {user.photos.map((p, index) =>
          <img
            key={index}
            className='snap-center w-100%'
            src={photos.find((photo) => photo.key === p)?.path}
            alt={String(photos.find((photo) => photo.key === p)?.index)}
          />
        )}
      </div>
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
