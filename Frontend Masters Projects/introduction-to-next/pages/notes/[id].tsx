/** @jsxImportSource theme-ui */
import { jsx } from 'theme-ui';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default ({ note }) => {
  return (
    <div sx={{ variant: 'containers.page' }}>
      {note && (
        <>
          <h1>{note.title}</h1>
          <p>{note.id}</p>
        </>
      )}
    </div>
  );
};

export async function getServerSideProps({ params, req, res }) {
  const response = await fetch(`http://localhost:3000/api/notes/${params.id}`);

  if (!response.ok) {
    res.writeHead(302, {
      location: '/notes',
    });

    res.end();
    return {
      props: {},
    };
  }
  const { data } = await response.json();
  console.log(data);

  return {
    props: { note: data },
  };
}
