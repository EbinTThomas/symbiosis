import React, { useEffect, useState } from 'react'
import SectionProductDetail from './components/SectionProductDetail'
import '../../static/styles/ProductDetail.css'
import '../../static/styles/Layout.css'
import SectionRelatedProducts from './components/SectionRelatedProducts'
import Header from '../Common/Header'
import axios from '../../api/axios'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  const { product_id } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(`/api/product/${product_id}/detail/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setProductDetail(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchProductDetail();
  }, [product_id]);

  return (
    <>
      <section className="section_content">
        <Header />
        {
          !isLoading &&
          <>
            <SectionProductDetail productDetail={productDetail} />
            <SectionRelatedProducts product={productDetail} />
          </>
        }
      </section>
    </>
  )
}

export default ProductDetail