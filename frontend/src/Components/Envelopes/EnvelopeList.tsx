import { EnvelopeListCard } from "./EnvelopeListCard";
import { useState, useEffect } from "react";
import useStore, { UserInfo } from "../../stores";

interface UserData {
  userId: number;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface Envelope {
  envelopeId: number;
  user_id: number;
  envelopeDescription: string;
  balance: number;
  maxLimit: number;
  user: UserData;
}

export const EnvelopeList = () => {
  const user: UserInfo = useStore((state: any) => state.user);
  const [envelopeList, setEnvelopeList] = useState<Envelope[]>([]);

  useEffect(() => {
    if (user?.token) {
      loadEnvelopeList();
    }
  }, [user?.token]);

  const loadEnvelopeList = async () => {
    try {
      const response = await fetch("http://localhost:8080/envelopes", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        console.log("Error fetching envelopes");
      }
      const data = await response.json();
      setEnvelopeList(data); // Update state
      console.log(data);
    } catch (error) {
      console.error("Error fetching envelopes:", error);
    }
  };

  // Horribly inefficient way to render different tiers of envelopes, but whatever
  return (
    <div className="envelope-container">
      <p className="envelope-title">My Envelopes</p>
      <p className="envelope-subtitle">Within Budget</p>
      <div className="envelope-row">
        {envelopeList.map((env) => {
          console.log(env.balance, env.maxLimit);
          // Within Budget - more than half balance remaining
          if (env.balance >= env.maxLimit / 2) {
            return (
              <EnvelopeListCard
                key={env.envelopeId}
                colorClass={"envelope-header-good"}
                envelope={env}
                onClick={() => console.log(env.envelopeId)}
              />
            );
          }
        })}
      </div>
      <p className="envelope-subtitle">Nearly Used</p>
      <div className="envelope-row">
        {envelopeList.map((env) => {
          // Nearly Used - less than half, but still non zero balance
          if (env.balance > 0 && env.balance < env.maxLimit / 2) {
            return (
              <EnvelopeListCard
                key={env.envelopeId}
                colorClass={"envelope-header-warning"}
                envelope={env}
                onClick={() => console.log(env.envelopeId)}
              />
            );
          }
        })}
      </div>
      <p className="envelope-subtitle">Over Budget</p>
      <div className="envelope-row">
        {envelopeList.map((env) => {
          // Over Budget - balance is zero or negative
          if (env.balance <= 0) {
            return (
              <EnvelopeListCard
                key={env.envelopeId}
                colorClass={"envelope-header-danger"}
                envelope={env}
                onClick={() => console.log(env.envelopeId)}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
