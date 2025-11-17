import { MouseEvent, useState, useEffect } from "react";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

import { Props } from "../types";
import Tech from "../components/tech";
import Iframe from "../components/iframe";
import styles from "../styles/Home.module.css";

const Home: NextPage<Props> = ({ user, repos }) => {
  const ptBR = {
    language: "Idioma",
    curriculum: "Currículo",
    theme: "Tema",
    degree: "Ciência de Dados",
    repository: "Repositórios",
    followers: "Seguidores",
    following: "Seguindo",
    projects: "Projetos",
    works: "Trabalhos",
  };
  const enUS = {
    language: "Language",
    curriculum: "Curriculum",
    theme: "Theme",
    degree: "Data Science",
    repository: "Repositories",
    followers: "Followers",
    following: "Following",
    projects: "Projects",
    works: "Works",
  };
  const router = useRouter();
  const { locale } = router;
  const traducao = locale == "pt-BR" ? ptBR : enUS;
  const changeLang = () => {
    switch (locale) {
      case "pt-BR":
        router.push("/", "/", { locale: "en-US" });
        break;
      case "en-US":
        router.push("/", "/", { locale: "pt-BR" });
        break;
    }
  };
  const [theme, setTheme] = useState("dark");
  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  const [active, setActive] = useState("Tech");
  const changeComponent = (e: MouseEvent) => {
    setActive((e.target as HTMLInputElement).id);
  };
  return (
    <div className={styles.background}>
    <Head>
      <title>Web Developer Portfolio | Arthur Peixoto Melo </title>
      <meta
          name="description"
          content="Portfolio de Web Developer"/>
    </Head>
      <header className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.photo}>
            <Image
              priority
              placeholder="blur"
              blurDataURL={
                "data:image/webp;base64,UklGRqYDAABXRUJQVlA4WAoAAAAgAAAAvgAAhAAASUNDUBgCAAAAAAIYAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFlaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANlZQOCBoAQAAcA8AnQEqvwCFAD7tbq1PM7+koiuXayPwHYlnbt/mQsiuDqzsokn6FYGEEkycS+AEhpgCxtNuaY4VcZcuXMVuaTnbJN3Kl0C6Vr9pDoZXdJwTJA7hJXqiBHGoTtkHtWqqfAeCOuN7pPswj668eL0S1QZVULILVjy4cb3ibhOV/Fd7pOuAAP7xMMBjIURRgBPcd4Wa4CAd1UTNrrwAFVYxyjOv0Tm/WvPJxeLc4j+moTyh6k5NUPMcYCFfmRwfs856TfaCOW9KRjOnSoVTPyqugRV52Tvh7QzaKA428PYjlKx8qWti7F3swHSsVAEav0uDnyqp5lQ1IfHk/J1G0EchO6vIa5DJDFrnIkJ7CUHp1YStksd8Mj6H0iMgD6cT0/ZdxpzJi2NPw+976uPZrjmt27bQfGmmqhBKz8H1ZhORFvwE4ghh95Jw71fd+KG6mIF1eVhJXYibB4nJMLqCIelD6FTPTVwAAAAA"
              }
              src={user.avatar_url}
              alt="profile photo"
              layout="fill"
              objectFit="fill"
            />
          </div>
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          <address>
            <Image
              src="/images/location.svg"
              alt="Map Pin"
              layout="intrinsic"
              width={24}
              height={24}
            />
            <span>{user.location}</span>
          </address>
          <div className={styles.contact}>
            <a
              href="https://github.com/arthurpeixotomelo"
              target="_blank"
              rel="external noreferrer"
            >
              <Image
                src="/images/github.svg"
                alt="GitHub"
                layout="intrinsic"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/arthurpeixotomelo/"
              target="_blank"
              rel="external noreferrer"
            >
              <Image
                src="/images/linkedin.svg"
                alt="Linkedin"
                layout="intrinsic"
                width={32}
                height={32}
              />
            </a>
            <a
              href="mailto:arthurpeixotomelo@gmail.com"
              target="_blank"
              rel="external noreferrer"
            >
              <Image
                src="/images/mail.svg"
                alt="Email"
                layout="intrinsic"
                width={32}
                height={32}
              />
            </a>
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <span>{traducao.language}</span>
              <div className={styles.toggle}>
                <input type="checkbox" id="language" onClick={changeLang} />
                <label htmlFor="language">
                  <Image
                    src="/images/language.svg"
                    alt="Language"
                    layout="fill"
                    objectFit="fill"
                  />
                </label>
              </div>
            </div>
            <div className={styles.button}>
              <a
                href="/curriculo.pdf"
                download="Curriculo - Arthur Peixoto Melo"
              >
                <p>
                {traducao.curriculum}
                  <Image
                    src="/images/download.svg"
                    alt="Download"
                    layout="fixed"
                    width={24}
                    height={24}
                  />
                </p>
              </a>
            </div>
            <div className={styles.button}>
              <span>{traducao.theme}</span>
              <div className={styles.toggle}>
                <input type="checkbox" id="Theme" onClick={changeTheme} />
                <label htmlFor="Theme">
                  <Image
                    src="/images/theme.svg"
                    alt="Theme"
                    layout="fill"
                    objectFit="fill"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className={styles.cards}>
            <div className={styles.education}>
              <p>
                <Image
                  src="/images/bachelor.svg"
                  alt="Bachelor"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                {traducao.degree}
              </p>
              <p>
                <Image
                  src="/images/university.svg"
                  alt="University"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                UNIVESP
              </p>
              <p>
                <Image
                  src="/images/certificate.svg"
                  alt="Certificate"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                2021 - 2025
              </p>
            </div>
            <div className={styles.stats}>
              <p>
                <Image
                  src="/images/repository.svg"
                  alt="Repository"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                {user.public_repos - 1} {traducao.repository}
              </p>
              <p>
                <Image
                  src="/images/follow.svg"
                  alt="Followers"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                {user.followers} {traducao.followers}
              </p>
              <p>
                <Image
                  src="/images/follow.svg"
                  alt="Following"
                  layout="intrinsic"
                  width={24}
                  height={24}
                />
                {user.following} {traducao.following}
              </p>
            </div>
          </div>
          <nav>
            <div className={styles.switch}>
              <input
                type="radio"
                name="section"
                id="Tech"
                defaultChecked
                onClick={changeComponent}
              />
              <label htmlFor="Tech">Tech</label>
              <input
                type="radio"
                name="section"
                id="Projects"
                onClick={changeComponent}
              />
              <label htmlFor="Projects">{traducao.projects}</label>
              <input
                type="radio"
                name="section"
                id="Works"
                onClick={changeComponent}
              />
              <label htmlFor="Works">{traducao.works}</label>
              <div className={styles.slider}></div>
            </div>
          </nav>
        </div>
      </header>
      <main className={styles.main}>{active == "Tech" && <Tech />}</main>
      <section className={styles.section}>
        {active == "Projects" &&
          repos
            .slice(1)
            .filter(repo => {
              return !repo.private;
            })
            .map((repo, i) => {
              return <Iframe key={i} repo={repo} />;
            })}
      </section>
      <section className={styles.section}>
        {active == "Works" &&
          repos
            .slice(1)
            .filter(repo => {
              return repo.private == true;
            })
            .map((repo, i) => {
              return <Iframe key={i} repo={repo} />;
            })}
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const [userRes, reposRes] = await Promise.all([
    fetch("https://api.github.com/users/arthurpeixotomelo"),
    fetch("https://api.github.com/user/repos", {
      method: "get",
      headers: {
        Authorization: process.env.GIT_TOKEN as string,
      },
    }),
  ]);
  const [userdata, reposdata] = await Promise.all([
    userRes.json(),
    reposRes.json(),
  ]);
  return {
    props: {
      context,
      user: (({
        avatar_url,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
      }) => ({
        avatar_url,
        name,
        bio,
        location,
        public_repos,
        followers,
        following,
      }))(userdata),
      repos: reposdata.map((item: any) => ({
        name: item.name,
        private: item.private,
        homepage: item.homepage,
        topics: item.topics,
      })),
    },
    revalidate: 60 * 60 * 24 * 7,
  };
};

export default Home;
