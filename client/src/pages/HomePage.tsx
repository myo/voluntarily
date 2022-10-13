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
  const [members, setMembers] = useState<Array<any>>(["LOAD_ONCE"]);

  useEffect(() => {
    if (appContext.state.token?.length) {
      // user is logged in, check if they took
      // all required steps to sign up
      if (!appContext.state.user?.username?.length) {
        navigator("/members/create-profile");
      } else if (!appContext.state.user?.portrait.length) {
        navigator("/members/upload-portrait");
      } else if (appContext.state.user?.isAdmin) {
        navigator("/admin/settings/interviews/edit-form");
      }
    }
    // to be 100% sure we don't request this more
    // than once, we add a bogus initial member
    if (members[0] === "LOAD_ONCE") {
      members.pop(); // that we now remove
      // and proceed to fetch members to display
      // as MemberCards
      axios
        .get(process.env.REACT_APP_API_URL + "/api/v1/public/members/get")
        .then((res: AxiosResponse) => {
          // if you're new to react, this method
          // we get from useState, won't work
          // immediately, that's why we're not
          // setting isLoading to false here.
          setMembers(res.data);
        });
    } else if (members.length !== 0) {
      // members array is populated and first
      // member isn't "LOAD_ONCE", let's show
      // the member cards
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

  // #TODO: make this parent div a component,
  // MemberCardsContainer
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
