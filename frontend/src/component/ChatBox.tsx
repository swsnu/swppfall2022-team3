interface IProps {
  content: string,
  isMine: boolean,
}
const basicChatClassName = "p-2 m-1 border w-auto max-w-2/3 rounded-xl";
const myChatClassname = "bg-pink-300 self-end border-white text-white";
const othersChatClassName = "bg-gray-400 self-start text-white border-gray-400";

export default function ChatBox({
  content,
  isMine,
}: IProps) {
  return (
    <article className={`${basicChatClassName} ${isMine ? myChatClassname : othersChatClassName}`}>{
      content
    }</article>
  )
}
