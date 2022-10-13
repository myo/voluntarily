import "./styles/MemberCard.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  username: string;
  name: string;
  familyName: string;
  rank: string;
  portrait: string;
  isAlumni: boolean;
}

export const MemberCard = ({
  username,
  name,
  familyName,
  rank,
  portrait,
  isAlumni,
}: Props) => {
  const navigator = useNavigate();
  const fullName = `${name} ${familyName}`;
  return (
    <div
      className="MemberCard"
      onClick={() => {
        navigator(`/profile/${username}`);
      }}
    >
      <img
        src={
          process.env.REACT_APP_SITE_URL +
          (portrait?.length > 0 ? "/uploads/" + portrait : "/logo192.png")
        }
        alt={fullName}
      />
      <div className="MemberCard-Details">
        <div className="MemberCard-Details-Name">{fullName}</div>
        <div className="MemberCard-Details-Rank">{rank}</div>
      </div>
    </div>
  );
};
