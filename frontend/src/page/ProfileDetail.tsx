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
    // add bottom margin if navigation bar is added
    // <section className={"w-full flex-1 flex flex-col mt-12 mb-16"}>
    <section className={"flex-1 w-full mt-12 flex flex-col"}>
      <AppBar title={`${user.username}/${getKoreanAge(user.birthday)}`}/>
      <section className={"w-full flex-1 z-0 flex flex-col"}>
        <section className={"relative"}>
          <PhotoSlider
            user={user}
            photos={photos}
          />
          <button className={"absolute w-20 h-8 bottom-4 right-4 z-10 bg-white rounded-lg border border-pink-600 flex items-center justify-center"}>
            <div className={"flex-none mx-0.5 font-bold text-pink-600"}>♡</div>
            <div className={"flex-none mx-1.5 font-bold text-pink-600"}>두근</div>
          </button>
        </section>
        <article id='tags' className='flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500'>
          {user.tags.map((t, index) =>
            <div key={index} className='flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400'>
              {tags.find((tag) => tag.key === t)?.name}
            </div>
          )}
        </article>
        <article id='intro' className='mx-3 mb-6 text-base'>{user.introduction}</article>
      </section>
    </section>

  ) : <section></section>;
}
