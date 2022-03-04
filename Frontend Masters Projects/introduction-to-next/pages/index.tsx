/** @jsxImportSource theme-ui */
import { jsx } from 'theme-ui';
import Link from 'next/link';

import dynamic from 'next/dynamic';

const BrowserComponent = dynamic(() => import('../src/components/browser'), {
  ssr: false,
});

export default ({ content }) => (
  <div sx={{ height: `calc(100vh - 60px)` }}>
    <div
      sx={{
        variant: 'containers.page',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <h1 sx={{ fontSize: 8, my: 0 }}>{content.title}</h1>
      {/* look at the page source you will not find the browserComponent because it has no ssr */}
      <BrowserComponent />
    </div>
  </div>
);

export function getStaticProps() {
  return {
    props: { content: { title: 'This is Index Content' } },
  };
}
