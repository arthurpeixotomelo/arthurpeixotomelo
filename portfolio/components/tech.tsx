import Image from "next/image";
import styles from "../styles/Tech.module.css";

const Tech = () => {
  return (
    <>
      <details className={styles.details}>
        <summary className={styles.title}>Front End</summary>
        <div className={styles.cards}>
          <div className={styles.card}>
            <Image
              src="/images/html.svg"
              alt="HTML"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/css.svg"
              alt="CSS"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/sass.svg"
              alt="Sass"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/javascript.svg"
              alt="Javascript"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/react.svg"
              alt="React"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/next.svg"
              alt="Next"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
        </div>
      </details>
      <details className={styles.details}>
        <summary className={styles.title}>Back End</summary>
        <div className={styles.cards}>
          <div className={styles.card}>
            <Image
              src="/images/git.svg"
              alt="Git"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/node.svg"
              alt="Node"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/typescript.svg"
              alt="Typescript"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/python.svg"
              alt="Python"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/sql.svg"
              alt="SQL"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/sas.svg"
              alt="SAS"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
        </div>
      </details>
      <details className={styles.details}>
        <summary className={styles.title}>Extra</summary>
        <div className={styles.cards}>
          <div className={styles.card}>
            <Image
              src="/images/word.svg"
              alt="Word"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/excel.svg"
              alt="Excel"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/powerpoint.svg"
              alt="Powerpoint"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
          <div className={styles.card}>
            <Image
              src="/images/figma.svg"
              alt="Figma"
              layout="fixed"
              width={32}
              height={32}
            />
          </div>
        </div>
      </details>
    </>
  );
};

export default Tech;
