import type { GetStaticProps, NextPage } from 'next';
import { Products } from '../product.model';
import Link from 'next/link';
import React, { useState } from 'react';

const Home: NextPage<Products> = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState(props.products);

  const handelFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let data;
    try {
      const res = await fetch('http://localhost:3000/api', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

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
      <form
        style={{ marginLeft: '25', marginTop: 15, textAlign: 'center' }}
        onSubmit={handelFormSubmit}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            style={{ width: 300 }}
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
          />
        </div>
        <div style={{ marginTop: 15 }}>
          <label htmlFor="description">
            <textarea
              name="description"
              id="description"
              cols={50}
              rows={10}
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api');
  const data = await res.json();
  return {
    props: {
      products: data,
    },
    revalidate: 5,
  };
};
