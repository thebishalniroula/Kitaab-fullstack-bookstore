import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import { UserContext } from "../context/UserContext";

export default function Home({ popular }) {
  const { user } = useContext(UserContext);
  if (user?.isUser)
    return (
      <div>
        <Card />
        <Slider popularBooks={popular} />
      </div>
    );
}
export async function getServerSideProps() {
  return {
    props: {
      popular: [],
    },
  };
}
