import { useState } from "react";
import { useEffect } from "react";
import sanityClient from "@sanity/client";
import Footer from "./components/Footer";

function App() {
  const [postData, setPost] = useState([]);

  const officialclient = sanityClient({
    projectId: "60sc6tf4",
    dataset: "production",
    apiVersion: "2022-01-11", // use current UTC date - see "specifying API version"!
  });

  useEffect(() => {
    officialclient
      .fetch(
        `*[_type == 'post']{
        title,
        slug,
        description,  
        mainImage{
          asset->{
            _id,
            url
          }
        }   
      }`
      )
      .then((data) => setPost(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Welcome to React Sanity Jamstack 2022!</h1>
      {postData &&
        postData.map((post) => (
          <div key={post.slug}>
            <div>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
            </div>
            <div>
              <img src={post.mainImage.asset.url} alt="" />
            </div>
          </div>
        ))}
      <Footer />
    </div>
  );
}

//take note to adjust the API settings of the Sanity Document or Project you are in.
//make sure to ADD A NEW CORS ORIGIN by adding http://localhost:3000
// so the stupid thing was, i spent 2 hours looking for solutions when actually I forgot to publish the images in the sanity studio. All fields must be filled with images.
// also do not forget to provide the key to the loop map method in javascript. you provide the key which is a JSX unique identifier to every element inside of an array that will be mapped.
// also I found that you have to import components as React does. DEFAULT COmponents as they say.
// so do not use like require (nodejs language or any other es6 syntax that is not react/jsx compatible)
// also set next.config.js strict mode to false thank yoU!
// also add /studio/node_modules to your gitignore file in the root project so git ignores all of the bulky stuff

export default App;
