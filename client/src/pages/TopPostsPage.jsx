import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Navigation } from "../components/NavigationBar";

function TopPostsPage() {
  return (
    <div>
      <Header />
      <div className="content">
        <Navigation />

        <div className="posts-container">
          <h2>Fotos del día</h2>
          <div>
            {/*{posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
export { TopPostsPage };
