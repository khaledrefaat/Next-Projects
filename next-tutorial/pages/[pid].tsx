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
  const res = await fetch('http://localhost:3000/api/' + context.params!.pid);
  const product = await res.json();

  if (!product) return { notFound: true };
  return {
    props: {
      title: product.title,
      description: product.description,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3000/api');
  const data = await res.json();

  const pathsWithParams: { params: { pid: string } }[] = data.map(
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
