import Head from 'next/head';
import { fromImageToUrl, API_URL } from '../../utils/urls';
import { twoDecimals } from '../../utils/format'
import BuyButton from '../../components/BuyButton'

// Obtenemos el product desde getStaticProps()
const Product = ({ product }) => {
  return (
    <div>
      <Head>
        {product.meta_title && // Solo si existe el meta_title
          <title>{product.meta_title}</title>
        }
        {product.meta_description &&
          <meta name="description" content={product.meta_description} />
        }
      </Head>
      <h3>{product.name}</h3>
      <img src={fromImageToUrl(product.image)} />
      <h3>{product.name}</h3>
      <p>
        ${twoDecimals(product.price)} <BuyButton product={product} />
      </p>
      <p>
        {product.content}
      </p>
    </div>
  )
}

// Deestructuramos el context que recibe getStaticProps y nos quedamos solo con el slug (context.params.slug)
export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`)
  const found = await product_res.json();

  return {
    props: {
      product: found[0] // API response for filters is an array
    }
  }
}

export async function getStaticPaths() {
  // Retrieve all the possible paths
  const product_res = await fetch(`${API_URL}/products/`)
  const products = await product_res.json()

  // Return them to nextJs context
  return {
    paths: products.map(product => ({
      params: { slug: String(product.slug) }
    })),
    // Call 404 if param does not match
    fallback: false,
  }
}

export default Product;
