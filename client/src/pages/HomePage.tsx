import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { appStrings } from "../i18n";
import axios, { AxiosResponse } from "axios";
import { MemberCard } from "../components/MemberCard";
import { findByLabelText } from "@testing-library/react";

export const HomePage = () => {
  const appContext = useAppContext();
  const navigator = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [members, setMembers] = useState<Array<any>>([]);

  useEffect(() => {
    if (appContext.state.token?.length) {
      if (!appContext.state.user?.username?.length) {
        navigator("/members/create-profile");
      } else if (!appContext.state.user?.portrait.length) {
        navigator("/members/upload-portrait");
      } else if (appContext.state.user?.isAdmin) {
        navigator("/admin/settings/interviews/edit-form");
      }
    }
    if (members.length === 0) {
      axios
        .get(process.env.REACT_APP_API_URL + "/api/v1/public/members/get")
        .then((res: AxiosResponse) => {
          setMembers(res.data);
        });
    } else {
      setLoading(false);
    }
  }, [members, isLoading, appContext.state.token]);
  if (isLoading) {
    return (
      <div>
        <Loading
          text={appStrings.loading}
          opacity={0}
          height="calc(100% - 3em)"
        />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {members.map((member, index) => {
        return (
          <MemberCard
            key={index}
            username={member.username}
            name={member.name}
            familyName={member.familyName}
            rank={member.rank}
            portrait={member.portrait}
            isAlumni={member.isAlumni}
          ></MemberCard>
        );
      })}
    </div>
  );
};
