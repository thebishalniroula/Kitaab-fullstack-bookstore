import { useContext } from "react";
import Card from "../components/Card";
import Slider from "../components/Slider";
import { UserContext } from "../context/UserContext";

export default function Home({ popular }) {
  const { user } = useContext(UserContext);
  if (user)
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
