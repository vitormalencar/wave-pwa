import {h} from 'preact';

const Layout = ({children}) => (
  <div>
    <main id="content">
      <div class="wrapper">
        {children}
      </div>
    </main>
  </div>
);

export default Layout;
