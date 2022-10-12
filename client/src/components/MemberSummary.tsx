import "./styles/TextBox.scss";
interface Props {
  username: string;
  name: string;
  familyName: string;
  portrait: string;
  isAlumni: boolean;
}

export const MemberSummary = ({
  username,
  name,
  familyName,
  portrait,
  isAlumni,
}: Props) => {
  const fullName = `${name} ${familyName}`;
  return (
    <div className="MemberSummary">
      <img
        src={
          process.env.REACT_APP_SITE_URL +
          (portrait?.length > 0 ? "/uploads/" + portrait : "/logo192.png")
        }
        alt={fullName}
      />
      {fullName}
    </div>
  );
};
