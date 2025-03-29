import { backButtonPressed } from "@/atoms/backButton";
import { currSessionReadMsg, readMsgList } from "@/atoms/currSessionReadMsg";
import { IsMessageBodyOpen } from "@/atoms/isMessageBodyOpen";
import { bodyMetaData } from "@/atoms/messageBody";
import formatDate from "@/utils/formatDate";
import { IMSG_DATA } from "@/utils/getMockMessages";
import { markAsRead } from "@/utils/markAsRead";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const MessagePreviewCards = ({
  messageItem,
  isFavorite,
}: {
  messageItem: IMSG_DATA;
  isFavorite: boolean;
}) => {
  // const messageItem = {
  //   id: "1",
  //   from: {
  //     email: "bounced@flipkart.com",
  //     name: "bounced",
  //   },
  //   date: 1582729505000,
  //   subject: "Lorem Ipsum",
  //   short_description:
  //     "Vestibulum sit amet ipsum aliquet, lacinia nulla malesuada, ullamcorper massa",
  // };

  const [_ , setCurrSessionReadMsg] = useRecoilState(currSessionReadMsg);
  const notiStyle = { width : "10px" , height: "10px" , backgroundColor: "#f6ca17" , borderRadius : "100%" , display : "flex" , justifyContent: "center" , alignItems : "center"}
  console.log(isFavorite);
  const setBodyMetaData = useSetRecoilState(bodyMetaData);
  const back_Button_Pressed = useRecoilValue(backButtonPressed);
  const setOpenMsgBody = useSetRecoilState(IsMessageBodyOpen);
  const read_Msg_List = useRecoilValue(readMsgList);

  const openMessageBody = (_id: string , data : any) => {
    console.log("saving meta data" , data)

    setBodyMetaData(data)
    setOpenMsgBody({ open: true, _id: _id });
  };

  const setBackButtonPressed = useSetRecoilState(backButtonPressed);

console.log(messageItem , "message item");

  return (
    <section

      className="message-preview-card"

      style={back_Button_Pressed ? {display: "block!important" } : {}}

      onClick={() => {
        // @ts-expect-error 
        setCurrSessionReadMsg((state) => state + messageItem?._id + "+")
        // @ts-expect-error 
        markAsRead(messageItem?._id)
        setBackButtonPressed(false)
        openMessageBody(messageItem?.id , messageItem);
      }}

    >
      <div className="message-preview-section-first ">
        <span className="logo">
          {messageItem?.from?.name[0]?.toUpperCase()}
        </span>
      </div>
      <div className="message-preview-section-second">
        <section className="flex-row-justify-start-gap">
          <section className="flex-row pad-5">
            <span className="color-fade font-bold color-black-twist">From: &nbsp;</span>
            <span className="email color-black-twist">
              {messageItem?.from?.name.charAt(0).toUpperCase() +
                messageItem?.from?.name.slice(1)}
            </span>
            <span className="email color-black-twist">&lt;{messageItem?.from?.email}&gt;</span>
          </section>
        </section>
        <section className="pad-3">
          <span className="color-fade font-bold color-black-twist">Subject: &nbsp;</span>
          <span className="subject color-black-twist">{messageItem?.subject}</span>
        </section>
        <section className="color-fade pad-5" style={{paddingTop : '8px'}}>
          <p>{messageItem?.short_description.length > 30 ? messageItem?.short_description.substring(0 , 30)+"..." : messageItem.short_description}</p>
        </section>
        <section className="pad-5" style={{display : "flex" , flexDirection: "row" , alignItems : "center" }}>
          <span className="color-fade">
            {formatDate(messageItem?.date).toString()} &nbsp;
          </span>
          {/* @ts-expect-error */}
          <div        style={ !read_Msg_List.includes(messageItem?._id) ? notiStyle :   {display : "none"}}>
                <div style={{ width : "5px" , height: "5px" , backgroundColor: "#e1b038" , borderRadius : "100%"}}>

                </div>
          </div>
        </section>
      </div>
    </section>
  );
};

// const StarComponent = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={20}
//     height={20}
//     viewBox="0 0 20 20"
//   >
//     <path
//       fill="currentColor"
//       d="M9.104 2.9a1 1 0 0 1 1.794 0l1.93 3.91l4.317.628a1 1 0 0 1 .554 1.706l-3.124 3.044l.738 4.3a1 1 0 0 1-1.451 1.054l-3.86-2.03l-3.862 2.03a1 1 0 0 1-1.45-1.055l.737-4.299l-3.124-3.044a1 1 0 0 1 .554-1.706l4.317-.627z"
//     ></path>
//   </svg>
// );

export default MessagePreviewCards;
