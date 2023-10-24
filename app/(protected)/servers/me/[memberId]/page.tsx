const MemberChatPage = ({ params }: { params: { memberId: string } }) => {
  return (
    <div>
      MemberChatPage <br />
      MemberId {params.memberId}
    </div>
  );
};

export default MemberChatPage;
