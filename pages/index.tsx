import axios from "axios";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface Address {
  city: string;
  state: string;
}

interface Data {
  brand_name: string;
  date: string;
  description: string;
  image: string;
  price: number;
  product_name: string;
  time: string;
  address: Address;
}

export default function IndexPage({ data }) {
  const [result, setResult] = useState(data);

  return (
    <div>
      Hello World.{" "}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}

// when the page the get render the this will returned the data
// it will only runs on the server-side not on the client-side
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Fetch data from the external API
    const res = await fetch(`${process.env.SERVER_URI}`);

    // get the JSON data from the response
    // @ts-ignore
    const data: Data = await res.json();

    // return { props: { notFound: true } };

    // Pass the data to the page via props
    return { props: { data } };
  } catch (e) {
    // error handling
    console.error("Error Occured while getting the data from the page : ", e);
    // Pass the data to the page via props
    return { props: { error: "Something went wrong !" } };
  }
};
