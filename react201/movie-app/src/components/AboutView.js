import Hero from "./Hero";

const AboutView = () => {
  return (
    <>
      <Hero text="Welcome to React 201" />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 my-5">
            <p className="paragraph">Lorem ipsum</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutView;
