import type { GetStaticProps, NextPage } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { Products } from '../product.model';
import Link from 'next/link';

const Home: NextPage<Products> = ({ products }) => {
  return (
    <main>
      <ul>
        {products.map(({ title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
      <ul>
        {products.map(({ id }) => (
          <Link key={id} href={`/${id}`}>
            <a>{id}</a>
          </Link>
        ))}
      </ul>
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data', 'DUMMY_BACKEND.json');
  const jsonData = await fs.readFile(filePath);
  const { DUMMY_DATA } = JSON.parse(jsonData.toString());
  return {
    props: {
      products: DUMMY_DATA,
    },
    revalidate: 5,
  };
};
