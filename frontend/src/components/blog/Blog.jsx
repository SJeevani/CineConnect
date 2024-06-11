import React from 'react'
import './Blog.css'

function Blog() {
  return (
    <div className="blog">
      <h2>Blog</h2>
      <p>Read our latest articles on movies, reviews, and more. Our blog features a variety of topics to keep you entertained and informed.</p>
      <article>
        <h3>The Impact of Independent Films</h3>
        <p>Discover how independent films are reshaping the movie industry. Explore their unique storytelling approaches and cultural significance.</p>
      </article>
      <article>
        <h3>Top 10 Movies of 2024</h3>
        <p>Check out our list of the top 10 movies of the year. From blockbuster hits to hidden gems, these films have captured the audience's hearts.</p>
      </article>
      <article>
        <h3>Interview with a Film Director</h3>
        <p>Get an insider's perspective on the filmmaking process through our exclusive interviews with acclaimed directors. Learn about their journey and creative vision.</p>
      </article>
      <article>
        <h3>Understanding Cinematography</h3>
        <p>Dive into the world of cinematography. Learn about the techniques and tools used to create visually stunning films.</p>
      </article>
    </div>
  )
}

export default Blog