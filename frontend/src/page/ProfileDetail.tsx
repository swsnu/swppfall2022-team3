import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { users } from '../DummyData';
import { getKoreanAge, User } from '../types';

export default function ProfileDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(users.find((user) => user.key === Number(id)));
  }, [id]);

  return user ? (
    <div>
      <div id='topbar' className='flex justify-center py-2'>
        <button className='flex-none px-4 text-lg'>B</button>
        <div className='flex-auto flex justify-center'>
          <div className='flex-none text-center text-lg font-bold'>
            {user.username}/{getKoreanAge(user.birthday)}
          </div>
          <div className='flex-none px-2 text-lg'>M</div>
        </div>
        <button className='flex-none px-4 text-lg'>P</button>
      </div>
      <img id='repr-photo' src={user.photos[0]} alt='repr' />
      <div id='tags' className='flex flex-wrap m-1.5 text-sm font-bold text-pink-500'>
        {user.tags.map((tag) => {
          return (
            <div className='flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400'>
              {tag}
            </div>
          );
        })}
      </div>
      <div id='intro' className='mx-3 my-2 text-sm'>{user.introduction}</div>
    </div>
  ) : <div></div>;
}
