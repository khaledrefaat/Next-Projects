import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import path from 'path';
import fs from 'fs';
import { Product } from '../product.model';
import Link from 'next/link';

const ProductDetailPage: NextPage<Product> = ({ title, description }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};

export default ProductDetailPage;

export const getStaticProps: GetStaticProps = async context => {
  const filePath = path.join(process.cwd(), 'data', 'DUMMY_BACKEND.json');
  const jsonData = await fs.readFileSync(filePath);
  const { DUMMY_DATA } = await JSON.parse(jsonData.toString());

  const product = DUMMY_DATA.find(
    (product: Product) => product.id === context.params!.pid
  );
  if (!product) return { notFound: true };
  return {
    props: {
      title: product.title,
      description: product.description,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'data', 'DUMMY_BACKEND.json');
  const jsonData = await fs.readFileSync(filePath);

  const { DUMMY_DATA } = await JSON.parse(jsonData.toString());

  const pathsWithParams: { params: { pid: string } }[] = DUMMY_DATA.map(
    (product: Product) => ({
      params: { pid: product.id },
    })
  );

  return {
    paths: pathsWithParams,
    // paths: [{ params: { pid: 'p1' } }],
    fallback: true,
  };
};
