import { Repo } from "../types";
import styles from "../styles/Iframe.module.css";

const Iframe = ({ repo }: Repo) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.thumbnail}
        title={`Pré visualização de ${repo.name}`}
      >
        <iframe src={`${repo.homepage}`} frameBorder="0"></iframe>
      </div>
      <div className={styles.link}>
        <a href={`${repo.homepage}`} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
        <div>
          {repo.topics.map((topic, i) => {
            return <span key={i}>{topic}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Iframe;
