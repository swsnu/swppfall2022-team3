import { Page } from "../types";

interface IProps {
  page: Page;
  title: string;
  clickBack?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function AppBar({
  page,
  title,
  clickBack,
}: IProps) {
  if (page === Page.PROFILE_DETAIL) {
    return (
      <div id='appbar' className='flex justify-center py-2'>
        <div className='flex-none w-8'>
          <button onClick={clickBack} className='px-2 text-lg'>B</button>
        </div>
        <div className='flex-auto flex justify-center'>
          <div className='flex-none text-center text-lg font-bold'>{title}</div>
          <div className='flex-none px-2 text-lg'>M</div>
        </div>
        <div className='flex-none w-8'>
          <button className='px-2 text-lg'>P</button>
        </div>
      </div>
    );
  } else if (page === Page.SEARCH || page === Page.PITAPAT_REQUEST || page === Page.CHAT_LIST) {
    return (
      <div id='appbar' className='flex justify-center py-2'>
        <div className='flex-none w-8'></div>
        {/* <button className='flex-none px-4 text-lg'>B</button> */}
        <div className='flex-auto text-center text-lg font-bold'>{title}</div>
        <div className='flex-none w-8'>
          <button className='px-2 text-lg'>P</button>
        </div>
      </div>
    );
  } else {
    return <div id='appbar'>not implemented</div>
  }
}
