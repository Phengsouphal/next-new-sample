import router from "next/router";
import styles from "../../styles/Slug.module.css";
import { Toolbar } from '../../components/toolbar'

export const Slug = ({ pageNumber, articles }) => {
  console.log(pageNumber, articles);
  return (
    <div className='page-container'>
        <Toolbar />
      <div className={styles.main}>
        {articles.articles.map((article, index) => {
          return (
            <div key={index} className={styles.post}>
              <h1>{article.title}</h1>
              <p style={{ color: "red" }}>{article.description}</p>
              {!!article.urlToImage && <img src={article.urlToImage} />}
            </div>
          );
        })}
      </div>
      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`);
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}
        >
          Previous Page
        </div>
        <div>#{pageNumber}</div>
        <div
          onClick={() => {
            if (pageNumber < 5) {
              router
                .push(`/feed/${pageNumber + 1}`);
            }
          }}
          className={pageNumber === 5 ? styles.disabled : styles.active}
        >
          Next Page
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug;
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const apiRespones = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: "Bearer 016eca5e2a084187ab76b720b9c814d3",
      },
    }
  );

  const apiJson = await apiRespones.json();
  const articles = apiJson;
  //   console.log(apiJson);
  return {
    props: {
      articles: articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};
export default Slug;
