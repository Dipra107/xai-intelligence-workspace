export default function SiteFooter() {
  return (
    <footer className="siteFooter">

      <div className="footerMain">

        <div className="footerBrand">

          <div className="footerLogo">
            X
          </div>

          <div>
            <h3>Xai</h3>
            <span>
              Intelligence Workspace
            </span>
          </div>

        </div>


        <p>
          Turning fragmented data into
          explainable intelligence and
          coordinated business action.
        </p>



        <a 
          href="#hero"
          className="footerButton"
        >
          Back to top ↑
        </a>


      </div>



      <div className="footerBottom">

        <span>
          Xai Product Experience Prototype
        </span>


        <span>
          Built with Next.js · Framer Motion · Three.js
        </span>

      </div>


    </footer>
  );
}