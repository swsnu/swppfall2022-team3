interface IProps {
  page: string;
  title: string;
  onBack: () => void;
};

export default function AppBar({
  page,
  title,
  onBack,
}: IProps) {
  if (page === 'ProfileDetail') {
    return (
      <div id='appbar' className='flex justify-center py-2'>
        <button onClick={onBack} className='flex-none px-4 text-lg'>B</button>
        <div className='flex-auto flex justify-center'>
          <div className='flex-none text-center text-lg font-bold'>{title}</div>
          <div className='flex-none px-2 text-lg'>M</div>
        </div>
        <button className='flex-none px-4 text-lg'>P</button>
      </div>
    );
  } else {
    return <div id='appbar'></div>;
  }

}
