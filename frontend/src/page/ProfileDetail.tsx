import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { photos, tags, users } from '../DummyData';
import { getKoreanAge, User } from '../types';
import AppBar from '../component/AppBar';
import PhotoSlider from '../component/PhotoSlider';

export default function ProfileDetail() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(users.find((user) => user.key === Number(id)));
  }, [id]);

  return user ? (
    <section className={"mt-12"}>
      <AppBar title={user.username}/>
      <PhotoSlider
        user={user}
        photos={photos}
      />
      <article id='tags' className='flex flex-wrap m-1.5 text-sm font-bold text-pink-500'>
        {user.tags.map((t, index) =>
          <div key={index} className='flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400'>
            {tags.find((tag) => tag.key === t)?.name}
          </div>
        )}
      </article>
      <article id='intro' className='mx-3 my-2 text-sm'>{user.introduction}</article>
    </section>
  ) : <section></section>;
}
