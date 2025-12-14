import { useState } from "react";

const App = () => {
  const post = {
    title: "100xDevs",
    subtitle: "23k Followers",
    time: "12 mins",
    imageUrl:
      "https://static.vecteezy.com/system/resources/previews/020/038/122/non_2x/url-letter-logo-design-on-white-background-url-creative-circle-letter-logo-concept-url-letter-design-vector.jpg",
    content: "Want to know how to win big? Join now to win a grant of $6k",
  };
  const [posts, setPosts] = useState([post]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 200,
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <button
        style={{ margin: "0 auto", marginBottom: 10 }}
        onClick={() => setPosts([...posts, post])}
      >
        Add Post
      </button>
      {posts.map((post) => (
        <PostComponent
          title={post.title}
          subtitle={post.subtitle}
          time={post.time}
          imageUrl={post.imageUrl}
          content={post.content}
        />
      ))}
    </div>
  );
};

const PostComponent = ({ title, subtitle, time, imageUrl, content }) => {
  return (
    <div
      style={{
        backgroundColor: "#efefef",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        width: 400,
        margin: "10 auto",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        <img
          src={imageUrl}
          alt={"brand-logo"}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
        <div>
          <p>
            <b>{title}</b>
          </p>
          <p>{subtitle}</p>
          {time && <p>{time} 🕦</p>}
        </div>
      </div>
      <div>
        <h4>{content}</h4>
      </div>
    </div>
  );
};

export default App;
