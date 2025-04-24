"use client"; 

function About() {
  return (
    <section className="bg-[url('/src/images/about/car.png')] py-40 bg-no-repeat bg-auto bg-[0_70%] flex items-center justify-center">
      <div className="container">
        <div className="w-full">
          <div className="flex w-full justify-center pb-5">
            <div className="pb-4 text-center">
              <h1 className="text-4xl font-bold">About Us</h1>
              <span>Home</span> / <span>About Us</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
            <div className="w-full flex justify-center text-center">
              <h2 className="line-clamp-3 text-ellipsis">Where every drive feels extraordinary</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white shadow-lg p-10">
                <h3 className="text-2xl font-medium pb-1">Variety Brands</h3>
                <p className="text-lg">
                  Please non sector fermentum sollicitudin. Eget aeplericipi
                  augue sit.
                </p>
              </div>

              <div className="bg-white shadow-lg p-10">
                <h3 className="text-2xl font-medium pb-1">Maximum Freedom</h3>
                <p className="text-lg">
                  Diam quam gravida ultricies velit oils consequat integer. Est
                  aliquam pousure.
                </p>
              </div>

              <div className="bg-white shadow-lg p-10">
                <h3 className="text-2xl font-medium pb-1">Awesome Support</h3>
                <p className="text-lg">
                  Eget aeplericipi augue sit quem natoque ornare cursus vivere
                  odio.
                </p>
              </div>

              <div className="bg-white shadow-lg p-10">
                <h3 className="text-2xl font-medium pb-1">Flexibility On The Go</h3>
                <p className="text-lg">
                  Vitas pretium nulla sed quam id nisi semper. Vel non in prim
                  egestas dic faucibus rhoncus.
                </p>
              </div>
            </div>
          </div>

          <div className="py-10">
            <div className="video-box">
              <video
                controls
                className="w-full object-cover h-[350px] rounded-2xl"
                poster="/cuate.png"
              >
                <source src="/about-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
