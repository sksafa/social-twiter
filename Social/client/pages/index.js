import { useContext } from "react";
import Layout from "../components/Layout"
import { UserContext } from "../context";
import styles from "../styles/Home.module.css"

export default function Home() {
  const [state, setState] = useContext(UserContext);
  return (
    <Layout title="Home- Social Media">
      <div className="container">
        <h2 className="text-success">My app</h2>
        <h1>{JSON.stringify(state)}</h1>
      </div>
    </Layout>

  )
}
